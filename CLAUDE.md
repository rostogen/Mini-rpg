# Notes for Claude

- The owner works **only from a phone**. There is no laptop or computer.
  Never suggest steps that need a PC: terminal, Claude Desktop, `claude remote-control`, adb, USB cable.
  Give phone-friendly ways instead (GitHub links, the browser, the Claude app).
- Talk in Ukrainian, short and simple (caveman style).
- The game is one file: `index.html` (Three.js, first person only, open world, 20 languages: never add Russian).
- When work is done: commit, push, open a PR, merge it into `main`, and give the link where the branch can be deleted.
- Do not publish the game on Netlify: the owner asked to take it down.
- Every wearable item must have its own custom look (icon, hero doll and first-person arms). New items get it through `itemLook()`: colours from the words in the name, an emblem, a pattern and a shape twist.
  Each armour piece also gets its own build from `lkV()` (second hash of the look): chest plate, collar, belt, hem, shoulder studs, helmet crest, knuckles, knee guards, cloak collar, and parts on the first-person forearm.
- Rarities (0-12): common … ancient one, eternal (10, red), shadow (11, black with a violet edge, `dark:true`, text class `shd`), heavenly (12, rainbow, `rainbow:true`).
  Enemy tiers use the same names (`TL`, `RARM`). New enemies get their own motion with `fx`/`fxc` (see `fx3()`): halo, orbs, wings, rays, prism, shards, void, smoke, embers, dust, flicker.
- Swords live only in the forge: `eq.weapon` is the sword in hand, `forge.owned` keeps the other bought swords; buying equips at once. Swords never drop (`DROP_SL` skips the weapon slot).
- The inventory's weapon place is the Spirit (slot 10, `SLOTI.spirit`): drawings in `IA[10]`, shown on the doll (`dlSpirit`), in first person (`vmSpirit`) and in 2D; it shoots nearby enemies by itself (`spiritTick`, projectile `sbolt`, stat `spPow`).
