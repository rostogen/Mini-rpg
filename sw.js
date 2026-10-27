/* Mini RPG 3D service worker.
   - The game page (index.html) is network-first: a new version reaches players at once when they are online,
     the cached copy is used only when the network fails or is too slow.
   - Local files (Three.js, bloom passes, fonts, icons, manifest) are cache-first: they only change together with VERSION.
   - Only GET requests inside this scope (/Mini-rpg/) are handled; other sites pass through untouched.
   - It never touches localStorage or the saves (a service worker cannot read them anyway).
   Bump VERSION whenever a file in ASSETS changes: the new worker caches them again and deletes the old cache. */
const VERSION = "2026.12.12-1";
const PREFIX = "mrpg-";
const CACHE = PREFIX + VERSION;
const PAGE = "./";
const ASSETS = [
  "manifest.webmanifest",
  "favicon.ico",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-512-maskable.png",
  "icons/apple-touch-icon.png",
  "vendor/fonts/cinzel/cinzel-latin.woff2",
  "vendor/fonts/cinzel/cinzel-latin-ext.woff2",
  "vendor/three/build/three.module.min.js",
  "vendor/three/examples/jsm/postprocessing/EffectComposer.js",
  "vendor/three/examples/jsm/postprocessing/MaskPass.js",
  "vendor/three/examples/jsm/postprocessing/OutputPass.js",
  "vendor/three/examples/jsm/postprocessing/Pass.js",
  "vendor/three/examples/jsm/postprocessing/RenderPass.js",
  "vendor/three/examples/jsm/postprocessing/ShaderPass.js",
  "vendor/three/examples/jsm/postprocessing/UnrealBloomPass.js",
  "vendor/three/examples/jsm/shaders/CopyShader.js",
  "vendor/three/examples/jsm/shaders/LuminosityHighPassShader.js",
  "vendor/three/examples/jsm/shaders/OutputShader.js"
];
const NET_WAIT = 6000; /* ms to wait for the page from the network before using the cached copy */

const SCOPE = new URL("./", self.location).href;
const PAGE_URL = new URL(PAGE, SCOPE).href;
const ASSET_URLS = new Set(ASSETS.map(a => new URL(a, SCOPE).href));

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const c = await caches.open(CACHE);
    /* cache: "reload" skips the browser's HTTP cache, so a fresh copy of every file is stored */
    await c.addAll([PAGE, ...ASSETS].map(u => new Request(new URL(u, SCOPE).href, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

const isPage = url => url.href === PAGE_URL || url.href === PAGE_URL + "index.html";

async function pageFirst(request) {
  const c = await caches.open(CACHE);
  /* a navigation Request cannot be cloned with new options, so fetch by URL; "no-cache" asks the server whether the page changed */
  const net = fetch(request.url, { cache: "no-cache", credentials: "same-origin" }).then(r => {
    if (r && r.ok && r.type === "basic") c.put(PAGE_URL, r.clone()).catch(() => {});
    return r;
  });
  const timer = new Promise(res => setTimeout(res, NET_WAIT, null));
  try {
    const r = await Promise.race([net, timer]);
    if (r) return r;
  } catch (e) { /* offline: fall through to the cache */ }
  const cached = await c.match(PAGE_URL);
  if (cached) { net.catch(() => {}); return cached; }
  return net; /* nothing cached yet: wait for the network after all */
}

async function assetFirst(request) {
  const c = await caches.open(CACHE);
  const cached = await c.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const r = await fetch(request);
  if (r && r.ok && r.type === "basic") c.put(request, r.clone()).catch(() => {});
  return r;
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (!url.href.startsWith(SCOPE)) return; /* other sites and other folders: not ours */
  const clean = new URL(url.pathname, url.origin);
  if (req.mode === "navigate" || isPage(clean)) {
    if (!isPage(clean)) return; /* other pages in the folder (diag.html): plain network */
    event.respondWith(pageFirst(req).catch(() => fetch(req)));
    return;
  }
  if (ASSET_URLS.has(clean.href)) event.respondWith(assetFirst(req).catch(() => fetch(req)));
});
