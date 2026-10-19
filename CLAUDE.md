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
- Gems 💎 (`gem`, saved as `r2_gems` per profile) come only from the 🎁 menu (`mDaily`, `renderDaily()`): a daily reward that grows with the streak (`dayGem`, a chest every 7th day) and daily/weekly quests (`QT`, `qMake`, progress through `qHit(kind,n)`).
  At most `GEM_CAP` (200) gems a day from all sources; quests leave room for the day's reward (`qRoom`). The gem shop sells a chest (epic or better) and finishing luck/foe upgrades at once.
  Nickname: setting it and the first change are free, every later change costs `NICK_COST` (250) and needs a second tap to pay.
- Dialogues: `say(who,text,colour,icon)` shows one typed line at a time (`#dlg`). Bosses taunt and the hero answers (`bossTalk`); the Spirit (or the treasure keeper when there is no Spirit) comments through `spSay(key)`. Lines live in `DLGsrc`.
- The hero's own look (`HERO_BASE`, `dlArmor0/dlHand0/dlLegSide0` with no item) is a plain tunic: armour, steel bracers and plates only appear when armour or gloves are worn.
- Forge shop: no refresh. `forge.stock[r]` holds one plain sword per rarity opened by battles (`SW_GATE`), replaced at once when bought; named blades come from `armStock`.
- Friends work without a server: a friend code (`MRPG1.` + base64 JSON from `frMe()`) carries the profile; `frParse` reads it from any pasted text. Players on the same phone are listed too (`frLocal`).
- What's new: add a line to `NEWS` (newest first, strings `n…` in `T8src`) with every update; it opens once by itself.
- Resetting progress goes through the warning window `#resetPop` (button wakes after 3 s), then `doReset()`.
- Portrait HUD: a grid (HP plate + gold on row 1, all buttons on row 2), so every button stays on screen; keep that in mind when adding HUD buttons.
- Friend codes are short now: `MR2.<id>.<nick b64>.<lvl>.<battle>.<kills>.<power>.<rarity per slot>` (`frShort`); old `MRPG1.` codes still parse.
- Tutorial: `TUT` steps with a spotlight (`tutStart`, `tutShow`), reward once per profile (`r2_tutR`), replay button in the settings.
- Bestiary shows one tier at a time (`bFil`, chips in `#bFilt`), never every card at once.
- Boss lines: `bossTalk` (intro), `bossMid` (half health), `bossFall` (defeat); keys bt*, hr*, bm*, bd*, hv* in `DLGsrc`.
