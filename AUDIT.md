# Audit of the game (2026-11-15)

Branch `ccr-467d8642-evwegm`, not merged into `main`. The live site and the Google Play build are unchanged.

## Size of the code

| File | Size | Non-empty lines |
|---|---|---|
| `index.html` (the whole game) | 8,443,882 bytes (8.4 MB) | 18,222 |
| `sw.js` | 4,347 bytes | 90 |
| `manifest.webmanifest` | 806 bytes | 20 |
| `privacy.html` | 8,414 bytes | 85 |

Not counted: `vendor/` (Three.js and the Cinzel font), icons, and the `.claude/` tools.
The lines in `index.html` are very long, which is why 8.4 MB is only 18,222 lines.

The game was already 8.3 MB before this work, more than the 4 MB the task asked for.
No filler was added: every new block has a real job in the game.

## What was added on this branch

| Block | What it does |
|---|---|
| P48 | Six travellers on the road give tasks: contracts on named elites, herbs, a lost kitten, fights, trips east, letters. Friendship hearts, gifts, title. Legend tab "Travellers". |
| P49 | Ten special foe roles: bomber, splitter, necromancer, shaman, shieldbearer, blinker, leaper, broodmother, sniper, phantom. Legend tab "Special foes". |
| P50 | Champion packs of 3-5 strong foes with a leader and a shared power (fire, frost, blood, unity, stone). Golden chest, title. |
| P51 | Fixes: a wave no longer gets stuck when one of its foes is lost far away; the fullscreen button no longer throws an uncaught error. |
| P53 | Five new lands (Crystal Spires, Fire Caldera, Storm Heights, Jellyfish Abyss, Sky Isles), each with its own lord and attack. They are placed just ahead of where each player is now. |
| P52 | Ranked duels: named rivals, 75 s per duel, 6 a day, seven ranks from Bronze to Legend, a reward per rank and a title. Legend tab "Ranked". |

Every new text is in all 20 main languages.

## Tests that were really run

All tests ran in a desktop Chromium browser (Playwright), not on a real phone.

1. **Every window and tab:** all 22 windows and all 40 Adventures/Legend tabs opened and closed at phone size (360×640) and at PC size (1280×800). No script errors. No text showing "undefined", "NaN" or "[object". No window wider than the screen.
2. **🎁 menu tabs** (6) and **all visible HUD buttons** (12) clicked. One bug found (fullscreen), fixed and tested again.
3. **Old saves:** a profile was played in the version that is now live (`main`, commit `8cd3e86`): gold, level, battle 23, 8 items, gems, herbs, forge level. The new version then loaded it twice. Nothing was lost; new parts start with safe defaults.
4. **Long play:** an autopilot played from battle 2 to battle 19 several times, about 10 minutes of game time per run. One softlock was found (a wave foe stuck far away) and fixed. After the fix there were no script errors. The lists of objects, particles, effects, foes and chests stayed small, with no slow growth.
5. **Each new system on its own:** all six task kinds paid out once; hearts and gifts are paid once per level; each of the ten foe roles fired; packs pay a chest once per pack; rank rewards are paid once per rank (`best`); every new save part survives a save and a reload.

## Not done or not checked

- Not tested on a real phone, on iPhone or in Safari.
- Not tested in the Google Play app (TWA).
- Battles against real players need a server, and the game has none on purpose. Ranked rivals are controlled by the computer.
- The 32 extra languages show the new texts in English until their dictionaries (`XEN`/`XPK`) are rebuilt.
- The tests cover menus, saves and the main game loop. They do not cover every single shop purchase or every old event.
