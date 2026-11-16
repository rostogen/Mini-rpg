# active-memory handoff: Mini RPG 3D «Тіньові землі»

**Handoff #7** (= #6 + P62 + P63 done) · 2026-11-16 · Lineage: #4 (Saga, Life, Play crash cause), #5 (P60, P61), #6 (Play build 3), this one: P62 10 rarities (PR #123), P63 full screen + new look (PR #124)

## 0. Instructions for Claude (read first)
1. Read this whole file, then `CLAUDE.md` (full map of the code) before replying.
2. Follow sections 3, 4, 5 in every reply. They override your defaults.
3. Use the values in section 8 exactly.
4. Do not suggest anything in section 7 again unless Ростик brings it up.
5. First reply: at most 5 lines (goal, state, next step), ask the section 12 questions if any, end with "Ready to continue with <next step>?" and wait.

## 1. Mission
- **Goal:** develop the browser game Mini RPG 3D «Тіньові землі» (repo `rostogen/Mini-rpg`, one file `index.html`) and release it on Google Play.
- **Now:** P62 and P63 are in `main`. Ростик is waiting for Google to review Play build 3 (1.0.2).
- **Next:** what Ростик asks; open items in §12.

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
10. No model names in commits/PRs; no force push. Work on the branch the session gives.
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
| P62 names = the default list (Ростик said «продовжуй») | he did not give his own |
| 10 new rarities sit above Singularity, index = id = 24-33 | old indexes and saves must not move |
| Friend code MR4 only when an item has rarity id 31+ | other codes stay MR3 so old app versions read them |
| Full-screen cover skipped on iPhone / Play app / standalone PWA / after 2 refusals | never lock the player out where full screen can not work |
| Full screen from the cover does not lock orientation | portrait play must still work (the ⛶ button still locks landscape, as before) |
| MEGA 7.0 (login, cloud saves) not started | needs a server; waits for «так, роби 7.0» |

## 7. Changed / rejected
- ❌ Bring back the combat difficulty picker. ❌ Publish on Netlify.
- The «Session Recovery» block a hook adds to `CLAUDE.md`: do not commit, remove.
- Symbols `𖤐` and the emoji 🌫️ show as empty boxes: do not use them.

## 8. Data & facts (exact)
| Fact | Value |
|---|---|
| Rarities | 34 (index 0-33), top = 👑 Вінець Темряви (`darkcrown`, id 33) |
| Enemy kinds | 34 065 (34 tiers × 1000 + bosses/specials) |
| JS heap after P62 | about 131-139 MB on the test PC (was 116) |
| Found-rarity masks | `gem.rf`/`rfc` for 0-23, `gem.rfH`/`rfcH` for 24+; use `rfHas`/`rfSet`/`rfAny` |
| Play package | `com.rostogen.shadowlands`; Capacitor appId `com.rostogen.minirpg` |
| Play build 3 | 1.0.2, versionCode 3, sent to review 2026-11-16 (closed test Alpha + internal); has the OLD game inside (before P62/P63) |
| Testers | 1 of 12 needed for 14 days |
| Live site | https://rostogen.github.io/Mini-rpg/ |

## 9. Terms & names
- P62 = 10 new rarities + tiers. P63 = full screen only, iron HUD with own icons, sword-slash start, film grain, minimap fix.
- Test harness (scratchpad, not in repo): Playwright serves the repo through `page.route` (read `process.env.ROOT` at request time to switch to an old copy). Wait for `#boot.ready`, then `BOOT.go=1`. Click `#bsGo` with `{force:true}` (it pulses). Headless is slow: freeze CSS animations to screenshot them. The full-screen cover only shows in tests with `?fsgate=1`.

## 10. Work state
| Item | Status |
|---|---|
| P62 | in `main` (PR #123) |
| P63 | in `main` (PR #124) |
| Play build 3 | waiting for Google review |
| Avatar question | Ростик said «потім скажу»: in-game there is no avatar now; ask which one he meant (app icon, profile picture, hero look) |
| MEGA 7.0 | not started |

## 11. Next steps
1. When review passes: check the installed version on the phone (Settings → Apps). Then 12 testers.
2. A new Play build is needed for P62/P63 (mum's PC): copy the new `index.html` from the GitHub ZIP into `android\app\src\main\assets\public`, raise versionCode to 4, Build → Generate Signed App Bundle → release. In the app the full-screen cover is off (`window.Capacitor`).
3. Ideas left from the «вау» / bug hunt: skill buttons and the right-side round buttons still use the old glossy style; bestiary card grid is 18 px wider than its box in portrait; News filter chips run past the screen edge.

## 12. Open questions ⚠️
- Avatar: which one (app icon, profile picture, hero look)?
- MEGA 7.0: «так, роби» or «ні»?

## 13. Re-attach checklist
- [ ] `handoff-mini-rpg-7.md` (this file, also in the repo root).

---
<sub>Audit: 13/13 sections · 11 rules · 4 corrections · data from P62/P63 tests · secrets: none · generated by active-memory</sub>
