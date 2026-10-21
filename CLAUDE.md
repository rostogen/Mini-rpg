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
- Rarities: 23 steps (0-22). 0-5 common … mythic, then the new ones sit between the old ones: 6 celestial, 7 ancient, 8 voidborn, 9 divine, 10 astral, 11 eclipse, 12 chaos, 13 ancient one, 14 primordial, 15 eternal, 16 omniversal (rainbow), 17 shadow (`dark:true`, text `shd`), 18 infinity, 19 heavenly (`rainbow:true`, text `rbt`), 20 godslayer (`gsl:true`, black-red), 21 absolute, 22 ??? beyond reality (`cosmic:true`, `csCol()`, text `csm`).
  `RO` maps an old index (0-12) to the new one, `reR()` puts new rows into rarity arrays, each RAR entry has a stable `id` (old ones 0-12, new 13-22) used by friend codes; old saves are moved once by `rvMigrate` (flag `<prefix>rv`=2). Never test rarities by number: use the flags (`rainbow`, `cosmic`, `dark`, `gsl`, `red`) or helpers `rarTxtCol`, `rLive`, `rbOrCs`.
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
- Friend codes: `Nick#XXXX-XXXX-XXXX-XXXX` (MR3, `frCode3`/`frShort3`: 80 bits in Crockford base32 with a check nibble, rarity stored by stable id `rId`/`rById`) so they can be typed by hand; old `MR2.` and `MRPG1.` codes still parse.
- Tutorial: `TUT` steps with a spotlight (`tutStart`, `tutShow`), reward once per profile (`r2_tutR`), replay button in the settings.
- Bestiary shows one tier at a time (`bFil`, chips in `#bFilt`), never every card at once.
- Boss lines: `bossTalk` (intro), `bossMid` (half health), `bossFall` (defeat); keys bt*, hr*, bm*, bd*, hv* in `DLGsrc`.
- 🎁 menu tabs: Daily, Quests (4 daily + 4 weekly, 22 kinds in `QT`), Achievements (`ACH`, tiers paid by `achPay`; new rarities found pay `rfGem`), Wheel (`WHEEL`, one free spin a day, then `SPIN_COST`), Shop (chests by tier, `BOOSTS` for 15 min, shown in the buff bar).
- Maps: 60 biomes (`BIOMES`, `BIOME_ORDER`, names in `BIOME_N`, relief `REL_A`, road `ROAD_K`); each map plays its own nature sounds (`AMB_K`, `ambTick`); new maps borrow wildlife through the `KIN` blocks. Skill tree has 42 rings (608 nodes).
- Languages: 20 main ones (`LANGS`, 20-field `S8` strings) + 32 extra (`LANGX`). Extra ones translate menus, quests, the tutorial and dialogues through packed dictionaries keyed by the English text (`XEN`, `XPK`, unpacked by `xlLoad` into `XD`); enemy and item names stay English there. The picker can be searched by native or English name (`LEN`, `lgRender`). New UI text shows in English for the extra languages until `XEN`/`XPK` are rebuilt with its translations.
- Named items: `UNQ2[rarity][slot]` (slot 10 = the Spirit) holds about 13 named items per rarity per slot; the drawing kind is picked from the words in the English name.
- Emoji inside SVG drawings are left as text (`emoText` skips SVG); use `svgEmo()` to draw our own icon as an SVG <image>.
- Wheel of Fortune shows every prize with its chance (`wPrizeHTML`) and the spin stats in `gem.ws` (`wStatsHTML`). Achievements tab starts with a Statistics card.
- Side roads: `sRoad(chunk)` makes dirt paths left/right off the main road (`srX`/`srZ`, built in `buildChunk`, drawn on the minimap); a chest waits at the end, opened ones are kept in `gem.srd`.
- Tutorial pays `TUT_STEP` gold per new step (`r2_tutS`) and the big prize once (`tutPay`, shown in the card).
- Every enemy kind has its own gait (`C.mvA/mvS/mvL/mvH` from `vHash`) and voice (`enemyVoice(e,"atk"|"hurt"|"die")`).
- Shadow Lands (P10): own state `SL` (`SL0()`, saved per profile as `r2_sl` by `saveSL`, read and cleaned by `loadSL`; reset in `switchTo`/`doReset`/`resetWorld`).
  Zones: `ZONES` (home + shade/frost/vulcan/void on biomes 60-63, opened by battle number and the previous zone's boss, `zoneOpen`), travel through 🌀 portals after a win or the zone menu `#mZone` (`renderZone`, `travelZone`). Each zone has its own hazards (`zoneTick`, `zfx`), mobs `z_*` and materials.
  Shadow bosses: `SBK` (`sl_lord`, `sl_colossus`, `sl_flame`, `sl_soul`, `sl_void`), every 5th zone battle or a challenge (`SL.chal`); specials and phase 2 in `sbTick`/`sbPhase`, lines `sbI*/shI*/sbM*/sbF*/shF*/sbW*` in `DLGsrc`, reward `sbReward` (gold, materials, a named sword once), rematches scale by `SL.bk`.
  Elements: fire, ice, lightning, nature, shadow (`ELK`, `ELBEAT` = who beats whom, `elMul`), effects in `elemApply` (burn, slow, stun, heal, weaken). Materials `MATS` (`SL.mat`, `matAdd`, `matDrop`).
  Forge: `UP_MAX`=30 (ore from +10, crystals from +20, `UP_MAT`), sword evolution `EVO` (5 stages, `evolve()`, +10% stats per stage, glow/sparks/aura/halo in first person via `vmEvo`), element `infuse(el)`.
  Pets: `PETS` (8, own models `pet_*`, follow and bite: `petTick`/`petBite`), one active `SL.pa`. Secrets: `SECR` (12) with hidden items `HIDI` (`sl_h1..12`), found through `secFound`. Index chips: zone, pet, sec, finds.
  Achievements `ACH2` (30, groups `ACH2G`) with titles `TITLES` (shown by the name, `SL.ttl`). Classes: `CLS` (Warrior/Mage/Hunter, 7 skills each, points `clsPts`, needs via `clsReqOk`, reset for gold with two taps) in the «Класи» tab of the skill menu.
  Very rare drops show the big `rareShow` banner. New quest kinds: mat, zone, elem, sboss. Test runner and patch for this update lived in the scratchpad (`p10/`).
