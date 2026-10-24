# active-memory handoff: Mini RPG 3D «Тіньові землі»

**Handoff #2** · 2026-10-24 · Lineage: #1 (2026-10-23): Mega 4.0 (P11–P14), Dark Fantasy (P15), полірування (PR #56), аудит MEGA FIX і група 1 (PR #57); #2 (2026-10-24): звуки, унікальні вороги й текстури, крива дорога, день/ніч з червоним місяцем, панель героя, 50 ідей ChatGPT у 5 пакетах (PR #59–#72), ключ OpenAI в середовищі

## 0. Instructions for Claude (read first)

You are continuing work from a previous chat. That chat is gone; this file is the complete context and the source of truth.

1. Read this whole file before replying.
2. Follow sections 3 (Style), 4 (Hard rules) and 5 (Corrections) in every reply, for the rest of this chat. They override your defaults.
3. Use the values in section 8 exactly. Never round, re-estimate, or "correct" them.
4. Do not suggest anything listed in section 7 (Changed / rejected) again unless the user brings it up.
5. Code word: None active. If the user types /amcodeword, start every reply with the phrase they choose (default "Yes Boss!").
6. Your first reply: at most 5 lines covering the goal, the current state, and the next step (section 11). Mention any files from section 13 that were not attached. Ask the questions in section 12 if there are any. End with "Ready to continue with <next step>?" Then wait for the user's go.

## 1. Mission
- **Goal:** далі розвивати браузерну гру Mini RPG 3D «Тіньові землі» за побажаннями Ростика: він каже річ, я відповідаю, чи вона вже є; якщо нема, додаю.
- **Done looks like:** кожна зміна реально працює в грі, перевірена (Playwright, без помилок консолі), злита в `main`; старі збереження цілі; звіт чесний.
- **Why it matters / context:** гра вже величезна (1318 видів ворогів, 103 біоми, 20 мов); Ростик хоче якість, атмосферу, «щоб нічого не повторювалось».

## 2. About the user (as relevant to this work)
- Звати **Ростик**. Звертатись саме так, не «господарю» і не «власнику».
- Працює **тільки з телефона** (Android, браузер Chrome або застосунок Claude). Нема ПК.
- Пише українською, коротко, з помилками й без розділових знаків. «Дороби» означає продовжуй до кінця без пауз.
- Іноді приносить ідеї від ChatGPT (копіює текст сюди).

## 3. Style & communication
- **Language:** відповіді українською.
- **Tone:** коротко й просто («caveman style»), без води, дружньо.
- **Reply length:** коротко; звіт по пунктах.
- **Formatting:** заголовки, списки, ✅/❌/⏸ ок; емодзі помірно.
- **Working style:** спершу перевір код (аудит), потім працюй пакетами: зміна → тест → коміт → PR → злиття → скинути гілку на `main`. Не питай зайвого: Ростик просив «у мене не питай» і «Дороби». Повідомляй лише реально зроблене й перевірене.
- **Звіт:** Проблема / Причина / Виправлення / Перевірка / Залишилось (для фіч: що зроблено, що вже було, що відкладено й чому, як повернути).
- **Avoid:** кроки для ПК (термінал, adb, USB, Claude Desktop); перебільшення («у 1000 разів краще», «все ідеально»); нагадування про старий API-ключ (Ростик просив більше не згадувати); звертання «господар».

## 4. Hard rules (word for word)
1. "The owner works **only from a phone**. There is no laptop or computer. Never suggest steps that need a PC: terminal, Claude Desktop, `claude remote-control`, adb, USB cable. Give phone-friendly ways instead (GitHub links, the browser, the Claude app)."
2. "Talk in Ukrainian, short and simple (caveman style)."
3. "The game is one file: `index.html` (Three.js, first person only, open world, 20 languages: never add Russian)."
4. "When work is done: commit, push, open a PR, merge it into `main`, and give the link where the branch can be deleted." (посилання: https://github.com/rostogen/Mini-rpg/branches)
5. "Do not publish the game on Netlify: the owner asked to take it down."
6. "What's new: add a line to `NEWS` (newest first, strings `n…` in `T8src`) with every update" (для фіч; текст 20 мовами, ключі `n16a*`, категорія в `NWC`).
7. Gems 💎 "come only from the 🎁 menu": нові системи не дають гемів.
8. "Every wearable item must have its own custom look … New items get it through `itemLook()`".
9. "Never test rarities by number: use the flags (`rainbow`, `cosmic`, `dark`, `gsl`, `red`) or helpers `rarTxtCol`, `rLive`, `rbOrCs`."
10. Не видаляй наявні функції та контент, не скидай збереження, не змінюй баланс і шанси без потреби, не дублюй наявні системи.
11. "Не стверджуй, що перевірив гру, якщо не запускав її." Якщо щось не перевірено (наприклад на телефоні або на слух), прямо скажи.
12. Звуки: лише процедурні або наявні семпли гри (`sndData`), без сторонніх аудіофайлів.
13. Ніколи не писати назви/ID моделі в коміти, PR чи код.
14. Ключі/паролі ніколи не вставляти в чат і не зберігати в репо.
15. Повний набір правил проєкту в `CLAUDE.md` у корені репо (читати першим; там же нотатки про всі системи P10–P16).

## 5. Corrections log
| # | Claude did | The user wanted |
|---|---|---|
| 1 | Зупинявся посеред роботи / чекав | «Дороби»: продовжувати до кінця без зайвих пауз |
| 2 | Після злиття не пушив скинуту гілку | Після merge: `git fetch origin main && git checkout -B <гілка> origin/main && git push -u origin <гілка>` |
| 3 | Перший фікс панелі HP/XP (лише скорочення чисел) | Смуги й літери все одно вилазили: причина в темній рамці `body.dkf .plate` без відступів (виправлено в PR #62) |
| 4 | Дорога петляла слабо (±25) | «Ще більш крива дорога»: зроблено ±~67 (PR #67) |
| 5 | Казав «потрібен ключ API», не пояснивши куди | Ростик вставив ключ у чат; треба одразу пояснювати: ключі лише в налаштуваннях середовища |
| 6 | Нагадував відкликати старий ключ | «Не згадуй плз»: більше не згадувати |
| 7 | Звертався «господар/власник» | Звати **Ростик** |

## 6. Decisions
| Decision | Why |
|---|---|
| Працюємо пакетами з окремим PR на кожен | вимога; легко повернути через Revert |
| 50 ідей ChatGPT зроблено за планом `PLAN50.md` | ChatGPT вимагав аудит і план |
| Головна дорога тільки візуально петляє (`roadOff`), зона бою не змінена | безпечно для руху/ворогів |
| Ключ OpenAI зберігається як мережевий секрет середовища | безпечно, Claude не бачить ключ |

## 7. Changed / rejected
- Публікація на Netlify → ❌ знято на прохання Ростика.
- Пряма дорога → завжди крива (PR #63), потім ще кривіша (PR #67).
- Плагіни codex-review / Codex Dispatch / Better Call GPT → не працюють у цій сесії (потрібні Codex CLI і ключ); замість них прямий запит до OpenAI API через мережевий секрет.
- ❌ Відкладені ідеї (з причинами в `PLAN50.md`): 1 міст, 7 коріння (нема річок/проваль, ризик рельєфу), 8 озеро-відображення (важко для телефона), 35 колесо дій і 39 перетягування кнопок (ризик сітки HUD), 43 голем (дублює міні-мапу), 44 тінь, що запізнюється (від 1-ї особи не видно).

## 8. Data & facts (exact)
- Репо `rostogen/Mini-rpg`; гра: https://rostogen.github.io/Mini-rpg/
- Робоча гілка в цій сесії: `claude/new-session-y54neo` (у новій сесії може бути інша; дивись system prompt).
- Злиті PR цього чату: #59 звуки речей, #60 унікальні вороги/звуки ударів/дропу/стежки, #61 і #62 панель HP/XP, #63 крива дорога, #64 день/ніч, #65 кажани/текстури, #66 CLAUDE.md, #67 ще кривіша дорога, #68–#72 п'ять пакетів 50 ідей. `main` після #72 = `bfc962d`.
- 50 ідей: ✔️ 36 зроблено, ✅ 6 уже були (24, 30, 37, 38, 40, 48), ⏸ 7 відкладено (1, 7, 8, 35, 39, 43, 44), 🟡 1 частково (32).
- Вороги: 1318 видів, 1318 різних форм (`kindDecor`, `kdIx`, 1728 комбінацій на тіло) і 1318 різних текстур (`skinTex`).
- Звуки дропу: 253 з 253 різні (23 рідкості × 11 слотів, `DROP_MOT`).
- День/ніч: `CLK` у хвилинах, 1 с = 1 хв гри, доба 24 хв, зберігається `r2_clk`; світанок 5–7, захід 18–20.
- `roadOff(x)=sin(x*.0036+.6)*38+sin(x*.0083+2.3)*22+sin(x*.019+.4)*7`.
- OpenAI: мережевий секрет у середовищі «За замовчуванням», хост `api.openai.com`, заголовок `Authorization: Bearer [secret removed: re-enter it]`. Перевірено: `/v1/models` = 200; чат-запит повертає `insufficient_quota` («You have no credits remaining»). Моделі є, наприклад `gpt-5.5`.
- Тексти: `S8("uk|en|fr|de|zh|es|it|pl|pt|ja|ko|tr|id|hi|vi|th|nl|ar|bn|fil")`: 20 полів, 19 `|`; нові тексти в `P16Tsrc` (ключі `p16_*`). Лапки `"` усередині перекладів ламають рядок: використовувати «».
- Номер картки підтримки в `#donCard` не змінювати.

## 9. People, terms & names
- **People:** Ростик (rostogen): власник гри, лише телефон.
- **Terms:** «Дороби» = продовжуй до кінця; «пакет N» = етап з 50 ідей; P10–P16 = великі оновлення (опис у `CLAUDE.md`).
- **Names in use:** `index.html`, `CLAUDE.md`, `PLAN50.md`, `handoff-mini-rpg.md`, `NEWS`/`NWC`, `T8`, `S8`, `t()`, `L()`, `LG`, `MG`, `SL`, `mgObjs`, `encObj`, `syncMg3`, `atmTick`, `mystSpawn`/`mystObj`/`mystTick`, `pfDodge`, `bagS`/`bagF`, `tryIt`/`dollTry`, `it.hx`, `hero.chn`/`vmChain`, `LG.dye`/`LG.dyeG`, `LG.cph`, `petMood`, `crateBreak`, `arenaHz`, `e.brk`, `dayNight3`/`dnBase`/`nightK`, `kindDecor`/`skinTex`/`wingBones`, `sndOf`/`hitPal`/`SFX.dotTick` (не `SFX.tick`: той для пазлів і колеса).

## 10. Work state
| Item | Status | Version / location | Notes |
|---|---|---|---|
| MEGA FIX (звуки, вороги, дорога, день/ніч, HUD) | final, merged | PR #59–#67 | — |
| 50 ідей ChatGPT | final, merged | PR #68–#72, `PLAN50.md` | відкладені 7 з причинами |
| Анімація удару ворогів | не зроблено | — | замах однаковий у всіх з одним типом тіла |
| Ключ OpenAI | налаштовано | мережевий секрет | нема коштів на рахунку API |
| Тести Playwright | є в scratchpad | `.../scratchpad/` (`fight.js`, `p1.js`–`p5.js`, `kd_t.js`, `studio.js`, `hud.js`) | scratchpad зникає з сесією; писати заново за зразком нижче |

Зразок тесту: сервер `cd /home/user/Mini-rpg && (curl -s -o /dev/null localhost:8765/index.html || (nohup python3 -m http.server 8765 >/dev/null 2>&1 &))`; Playwright `NODE_PATH=$(npm root -g)`, Chromium `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, args `--use-gl=swiftshader --enable-webgl --ignore-gpu-blocklist`; localStorage `r2_tut`=1, `r2_tutV`=2; бій: `paused=false;if(!enemies.length)startWave();` цикл `tNow+=.05;update(.05)` + `tryAction('attack')`. Синтаксис: витягнути найбільший `<script>` у файл і `node --check`.

## 11. Next steps
1. **Next action:** запитати Ростика, що додати чи виправити далі (або взяти ідеї, які він вставить з ChatGPT), і перевірити, чи це вже є в грі.
2. Якщо Ростик поповнить баланс OpenAI і скаже «попроси в ChatGPT ідеї»: зробити запит до `https://api.openai.com/v1/chat/completions` (модель `gpt-5.5`), дати опис гри з `CLAUDE.md`, отримати ідеї, зробити аудит і пакети.
3. Можливо: власні анімації замаху для кожного виду ворога (зараз однакові в межах типу тіла).

## 12. Open questions ⚠️
None.

## 13. Re-attach checklist
- Nothing to attach. Новий чат працює в тому ж репо `rostogen/Mini-rpg`; `CLAUDE.md` і `PLAN50.md` уже там.

---
<sub>Audit: 13/13 sections · 15 rules · 7 corrections · 30 data points · secrets removed: yes · generated by active-memory</sub>
