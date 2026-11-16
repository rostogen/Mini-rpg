# active-memory handoff: Mini RPG 3D «Тіньові землі»

**Handoff #6** (= #5 + Play build 3 done) · 2026-11-16 · Lineage: #4 `handoff-mini-rpg-4.md` (Saga, Life, Play crash cause); #5: P60 «Темна корона», P61 1000 foes per tier, plan for 10 new rarities (P62)

## 0. Instructions for Claude (read first)
1. Read this whole file, then `CLAUDE.md` (full map of the code) before replying.
2. Follow sections 3, 4, 5 in every reply. They override your defaults.
3. Use the values in section 8 exactly.
4. Do not suggest anything in section 7 again unless Ростик brings it up.
5. First reply: at most 5 lines (goal, state, next step), ask section 12 questions if any, end with "Ready to continue with <next step>?" and wait.

## 1. Mission
- **Goal:** develop the browser game Mini RPG 3D «Тіньові землі» (repo `rostogen/Mini-rpg`, one file `index.html`) and release it on Google Play.
- **Now:** P62 = 10 new rarities above ⚫ Singularity, each with 1000 foes (and every old tier stays at 1000, or all tiers match the biggest one).
- **Done looks like:** 34 rarities / enemy tiers, each with ≥1000 regular foes, items of the new rarities drop and show correctly, friend codes still work, old saves load.

## 2. About the user
- Ростик, 18–22, works **only from a phone**, no PC. School, frequent air-raid alerts. Mum has the PC and the signing key. Wants "just do it, no questions".

## 3. Style
- Ukrainian only (never Russian). Short, simple, caveman style, numbered steps, bold = what to tap. Ask only real decisions. No PC steps; give phone ways (GitHub links, browser, Claude app).

## 4. Hard rules (word for word)
1. "The owner works only from a phone. There is no laptop or computer. Never suggest steps that need a PC"
2. "Talk in Ukrainian, short and simple (caveman style)."
3. "The owner's name is Ростик: call him that (not «господар» or «власник»)."
4. "When work is done: commit, push, open a PR, merge it into `main`, and give the link where the branch can be deleted." (https://github.com/rostogen/Mini-rpg/branches)
5. "Do not publish the game on Netlify: the owner asked to take it down."
6. "20 languages: never add Russian."
7. When chat health turns 🔴 red: write the next handoff at once, send it, tell Ростик to move to a new chat.
8. Combat difficulty choice = "це чіти!!!": never bring it back.
9. Never invent keys, passwords, credentials; no fake login without a server.
10. No model names in commits/PRs; no force push. Work on the branch the session gives (this session: `claude/new-session-7mzkls`).
11. Never claim tests that were not run; say plainly what was not checked.

## 5. Corrections log
| # | Claude did | Ростик wanted |
|---|---|---|
| 1 | Game fell back to 2D by itself | Never fall to 2D by itself (only `?safe=2` / «no 3D» button) |
| 2 | Combat difficulty picker | Removed («це чіти»), `dfc()` always 1 |
| 3 | Thought the Play app opens the live site | It is a Capacitor build with the game inside |
| 4 | Red checkpoint without a file | Write handoff at once and move chat |

## 6. Decisions
| Decision | Why |
|---|---|
| P60 + P61 merged (PR #119, #120) | tested in headless Chromium |
| P62 split from P61 | 10 rarities touch 20+ tables and friend codes; too big for the end of a long chat |
| 10 new rarities go **above** Singularity (index 24-33, ids 24-33) | old indexes and saved items must not move |
| MEGA 7.0 (Google/GitHub login, cloud saves) not started | needs a server; waits for Ростик's «так, роби 7.0» |

## 7. Changed / rejected
- ❌ Bring back the combat difficulty picker. ❌ Publish on Netlify.
- The «Session Recovery» block a hook adds to `CLAUDE.md`: do not commit, remove.
- Symbol `𖤐` shows as an empty box without a special font: do not use it in the game.

## 8. Data & facts (exact)
| Fact | Value |
|---|---|
| Enemy kinds after P61 | 24 065 (24 tiers × 1000 regular + bosses/specials) |
| JS heap after P61 | about 116 MB (was 72 MB) on the test PC |
| `P61N` | `Math.max(1000, biggest tier)` = 1000 now |
| Rarities now | 24 (index 0-23, `RAR.length`=24), top = ⚫ Singularity (`k:"singularity"`, id 23) |
| Friend code rarity field | 5 bits (max id 31) in `frCode3` (MR3) — ids 32, 33 do NOT fit: P62 needs a new code version (MR4) that still reads MR3/MR2/MRPG1 |
| Play crash cause | manifest starts `com.rostogen.shadowlands.MainActivity`, dex has only `com.rostogen.minirpg.MainActivity` |
| Play package | `com.rostogen.shadowlands`; Capacitor appId `com.rostogen.minirpg` |
| Testers | 1 of 12 needed for 14 days |
| Live site | https://rostogen.github.io/Mini-rpg/ |

Proposed names for the 10 new rarities (Ростик may change them; ask once, default = these):
24 Безодня/Abyssal · 25 Кривава Корона/Bloodcrown · 26 Попіл Богів/Godash · 27 Вічна Ніч/Everdark · 28 Порожнеча Душ/Soulvoid · 29 Апокаліпсис/Apocalypse · 30 Забуття/Oblivion · 31 Первородна Тьма/Primal Dark · 32 Кінець Часів/End of Time · 33 Вінець Темряви/Crown of Darkness.

## 9. Terms & names
- P60 «Темна корона» (look only), P61 (1000 foes per tier), P62 (10 new rarities, planned).
- Test harness (scratchpad, not in repo): Playwright serves the repo through `page.route` (a background `http.server` was refused). Notes: `BOOT` is a `const`, not `window.BOOT`; wait for `#boot.ready`, then set `BOOT.go=1`; `makeItem(r, slotIndex)` takes `DROP_SL[i]`; `makeEnemy(etypesIndex,false,x,z,0)` then `enemies.push(e)`.

## 10. Work state
| Item | Status | Where |
|---|---|---|
| Game `index.html` | P61 in `main` (PR #120) | |
| P62 10 rarities | not started | plan in §11 |
| Play app | build 3 (1.0.2) uploaded 2026-11-16, sent to Google review (closed test Alpha + internal) | fix = `namespace "com.rostogen.minirpg"` in `android/app/build.gradle` (applicationId stays `com.rostogen.shadowlands`); bundle checked: activity `com.rostogen.minirpg.MainActivity` exists in dex, versionCode 3, new `index.html` (8 901 486 bytes), signed MINIRPG, same cert SHA-256 C1:26:F9:99…93:FF as build 2 |
| Signing key | found: `C:\Games\Mini-rpg-main\android\minirpg-release.jks`, alias MINIRPG | passwords known to Ростик, never write them |
| MEGA 7.0 | not started | waits for decision |

## 11. Next steps (P62 checklist, one block before `loadState`, like Singularity at «Mega 5.0: the Singularity rarity»)
1. `RAR.push` ×10 (k, id 24-33, col, flags, w, mul, ns, `n` 20 languages, `ep` epithets) + `IA_PAL`, `UAK`, `UNQ`, `UNQ2` rows, all **before `loadState`**.
2. 100 new item phrases for named items (P28 style, `P28PH` has only 240 = 24×10) or reuse `P61X` for new-rarity item names; fill `UNQ2[r][1..10]` to 30.
3. Enemy tiers: `TL`, `P28T`, `TIERS` (20 langs), `TW0`, `TG`, `RARM`, `TIERCOL`, `TIERS` order, `P28PAL`; push 1000 foes per new tier with `p61Fill(tk, ti, [], 23)` **before `TIERIDS`** (line with `const TIERIDS=`).
4. CSS `.r24`..`.r33` for `.cell/.slot`, text classes via `rCls`, `rarTxtCol`; rarity marks in `P60G`; Drops table, luck (`rarWeights`, `LUCK_A`, `LUCK_TOP`), forge gates (`SW_GATE`, `armGate`, forge stock per rarity), combine cap `CB_TOP`, achievements for new rarities (`rfGem`), bestiary chips.
5. Friend codes: new MR4 with 6-bit rarity; still parse MR3/MR2/MRPG1.
6. Never test rarities by number: use flags/helpers (see CLAUDE.md).
7. Tests: every window at 360×640, drops of each new rarity, bestiary chips for 34 tiers, friend code round trip, old save, autopilot; memory (expect about 150 MB heap).
8. Play build 3: wait for review; if 1.0.2 still closes on the phone, check the installed version first (Settings → Apps). Then 12 testers, MEGA 7.0 decision.
9. How to update the game inside the app later (PC): copy the new `index.html` (from the GitHub ZIP, not Ctrl+S in Chrome: that saved 1 byte) into `android\app\src\main\assets\public`, raise versionCode, Build → Generate Signed App Bundle → release; file in `android\app\release\app-release.aab`. Do not run the AGP Upgrade Assistant.

## 12. Open questions ⚠️
- Names for the 10 new rarities: the list in §8, or Ростик's own?
- MEGA 7.0: «так, роби» or «ні»?

## 13. Re-attach checklist
- [ ] `handoff-mini-rpg-5.md` (this file, also in the repo root).

---
<sub>Audit: 13/13 sections · 11 rules · 4 corrections · data from P60/P61 tests · secrets: none · generated by active-memory</sub>
