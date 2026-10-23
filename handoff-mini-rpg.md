# active-memory handoff: Mini RPG 3D: Тіньові землі

**Handoff #1** · 2026-10-23 · Lineage: #1 (2026-10-23): Mega 4.0 (P11–P14), Dark Fantasy (P15), полірування (PR #56), аудит MEGA FIX і група 1 (PR #57)

## 0. Instructions for Claude (read first)

You are continuing work from a previous chat. That chat is gone; this file is the complete context and the source of truth.

1. Read this whole file before replying.
2. Follow sections 3 (Style), 4 (Hard rules) and 5 (Corrections) in every reply, for the rest of this chat. They override your defaults.
3. Use the values in section 8 exactly. Never round, re-estimate, or "correct" them.
4. Do not suggest anything listed in section 7 (Changed / rejected) again unless the user brings it up.
5. Code word: None active. If the user types /amcodeword, start every reply with the phrase they choose (default "Yes Boss!").
6. Your first reply: at most 5 lines covering the goal, the current state, and the next step (section 11). Mention any files from section 13 that were not attached. Ask the questions in section 12 if there are any. End with "Ready to continue with <next step>?" Then wait for the user's go.

## 1. Mission
- **Goal:** виконати «MEGA FIX UPDATE» для гри Mini RPG 3D: Тіньові землі: велике полірування наявного (унікальні моби, звуки предметів, день/ніч, червоний місяць з очима, кінематографічні діалоги з босами, дороги, дерево навичок, іконки), не роздуваючи гру новим контентом.
- **Done looks like:** кожна група змін реально працює в грі, перевірена (Playwright, без помилок консолі), злита в `main`; старі збереження цілі; звіт чесний.
- **Context:** гра вже велика (1318 видів ворогів, 103 біоми, 20 мов); власник хоче якість, атмосферу, кінематографічність, а не кількість.

## 2. About the user
- Власник гри, працює **тільки з телефона** (нема ПК/ноутбука).
- Пише українською, коротко; часто шле «Дороби те що робив» = продовжуй і доводь до кінця.
- Репозиторій: `rostogen/Mini-rpg`; гра: https://rostogen.github.io/Mini-rpg/

## 3. Style & communication
- **Language:** відповіді українською.
- **Tone:** коротко й просто («caveman style»), без води.
- **Reply length:** коротко; звіт по пунктах.
- **Formatting:** заголовки й списки ок, емодзі помірно.
- **Working style:** спочатку перевір код; працюй групами; після кожної групи — тест, коміт, PR, злиття; повідомляй лише реально зроблене й перевірене.
- **Звіт після кожного завдання:** Проблема / Причина / Виправлення / Перевірка / Залишилося (+ для MEGA FIX: змінені файли, ризики продуктивності, сумісність збережень).
- **Avoid:** кроки, що потребують ПК (термінал, Claude Desktop, `claude remote-control`, adb, USB); перебільшення; «все ідеально».

## 4. Hard rules (word for word)
1. "The owner works **only from a phone**. There is no laptop or computer. Never suggest steps that need a PC: terminal, Claude Desktop, `claude remote-control`, adb, USB cable. Give phone-friendly ways instead (GitHub links, the browser, the Claude app)."
2. "Talk in Ukrainian, short and simple (caveman style)."
3. "The game is one file: `index.html` (Three.js, first person only, open world, 20 languages: never add Russian)."
4. "When work is done: commit, push, open a PR, merge it into `main`, and give the link where the branch can be deleted." (посилання: https://github.com/rostogen/Mini-rpg/branches)
5. "Do not publish the game on Netlify: the owner asked to take it down."
6. "What's new: add a line to `NEWS` (newest first …) with every update" (для фіч; для дрібних фіксів не обов'язково).
7. Gems 💎 "come only from the 🎁 menu" — нові системи не дають гемів.
8. "Every wearable item must have its own custom look … New items get it through `itemLook()`".
9. "Never test rarities by number: use the flags (`rainbow`, `cosmic`, `dark`, `gsl`, `red`) or helpers `rarTxtCol`, `rLive`, `rbOrCs`."
10. З MEGA FIX: "Не видаляй наявні функції та контент. Не скидай збереження. Не змінюй шанси випадіння, баланс і характеристики без прямої необхідності. Не створюй дублікати наявних систем."
11. "Не стверджуй, що перевірив гру, якщо не запускав її. … Якщо не можеш перевірити певну поведінку, прямо зазнач це."
12. "Не вигадуй номер картки, платіжні реквізити чи неіснуючий спосіб оплати. Не створюй фальшивої платіжної форми."
13. "Не створюй фальшивих анімацій, які не відтворюються в грі." / "Не створюй фальшивих бонусів або прихованих механік, які існують лише в описі."
14. Сцени з босами: "Можливість пропустити сцену … Захист від повторного запуску … Коректне керування камерою та її відновлення навіть у разі помилки … Відсутність блокування керування".
15. Звуки: "Не використовуй випадкові або ліцензійно сумнівні аудіофайли" → процедурні звуки.
16. Ніколи не писати назви/ID моделі в коміти, PR чи код.
17. Повний набір правил проєкту — у `CLAUDE.md` в корені репо (читати першим).

## 5. Corrections log
| # | Claude did | The user wanted |
|---|---|---|
| 1 | Зупинявся посеред великої роботи / чекав | «Дороби те що робив» — продовжувати й доводити до кінця без зайвих пауз |
| 2 | Після злиття PR скинув гілку на `main`, але не запушив її (stop-hook: «1 unpushed commit») | Після скидання гілки завжди пушити її (`git push -u origin ccr-566b17d2-vkrqap`, без `-f`; force push блокує хук — тільки `--force-with-lease` за потреби) |
| 3 | (ризик) масові зміни до аудиту | MEGA FIX: «Почни з аудиту. Не роби масових змін до перевірки коду та складання плану робіт.» |

## 6. Decisions
| Decision | Why |
|---|---|
| Працюємо групами: група → тест → коміт → PR → merge | вимога користувача |
| Група 1 зроблена першою (пети, підтримка, колір шолома) | безпечно, без зміни балансу |
| Звуки — тільки процедурні (Web Audio) | ліцензії, вимога |
| Кольори статів: червоний = шкода, зелений = здоров'я/лікування, синій = магія/перезарядка, золотий = здобич, сталевий = захист/рух | вимога п.12 MEGA FIX |
| Номер картки підтримки не змінювати, лише оформлення | правило про реквізити |

## 7. Changed / rejected
- Публікація на Netlify → ❌ знято на прохання власника.
- Великі контентні оновлення (Mega 4.0, Dark Fantasy) → режим полірування / MEGA FIX (покращувати наявне, не додавати великі системи).
- Справжні криві головні дороги → Claude радить безпечний варіант (візуальне петляння в коридорі + більше поворотів бічних стежок); рішення користувача ще нема.

## 8. Data & facts (exact)
- Репо `rostogen/Mini-rpg`, робоча гілка `ccr-566b17d2-vkrqap`, база `main`.
- Злиті PR цього чату: #51 (Phase A), #52 (Legend), #53 (P13), #54 (P14), #55 (Dark Fantasy P15), #56 (полірування назв/вкладок), #57 (група 1). `main` = `15f2d03`.
- Після merge: `git checkout -q main && git pull -q origin main && git checkout -q -B ccr-566b17d2-vkrqap origin/main && git push -q -u origin ccr-566b17d2-vkrqap`.
- Підпис коміту (останні рядки):
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
  `Claude-Session: https://claude.ai/code/session_015WNMJK27eWwNdDKr3QSLGe`
- Кінець опису PR: `🤖 Generated with [Claude Code](https://claude.com/claude-code)` + порожній рядок + `https://claude.ai/code/session_015WNMJK27eWwNdDKr3QSLGe`
- Номер картки підтримки (монобанк) у `index.html` `#donCard`: [secret removed: re-enter it] — вже в коді, не змінювати.
- Тексти: `S8("uk|en|fr|de|zh|es|it|pl|pt|ja|ko|tr|id|hi|vi|th|nl|ar|bn|fil")` — 20 полів, 19 `|`.
- Тест-сервер: `(curl -s -o /dev/null localhost:8765/index.html || (nohup python3 -m http.server 8765 >/dev/null 2>&1 &))` з `/home/user/Mini-rpg`.
- Playwright: `NODE_PATH=$(npm root -g)`, Chromium `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, args `--use-gl=swiftshader --enable-webgl --ignore-gpu-blocklist`; прискорення `for(...){if(!paused){tNow+=.05;update(.05)}}`; мова через `lang=l;applyLang()`; localStorage `r2_tut`=1, `r2_tutV`=2.
- Синтаксис: витягнути найбільший `<script>` у файл і `node --check`.

**Результати аудиту MEGA FIX (підтверджено кодом/браузером):**

| Тема | Факт |
|---|---|
| Моби | 1318 видів, лише 7 форм тіла `body`: human 522 (89 наборів деталей), wolf 208 (тільки `fur/fur2/eye`), bat 158 (5), dragon 134 (3, майже лише кольори), ghost 116 (1, тільки `robe/robe2/eye`), spider 102 (3), slime 70 (3). Хода/голос уже з `vHash`, `fx` 147 видів. Будівник: `buildModel(C,L)` → `buildHuman/Wolf/Dragon/Bat/Slime/Spider/Ghost` (~рядок 12658) |
| Звуки предметів | `SFX.equip()` без аргументів (однаковий для всіх), `SFX.swing()` однаковий для всіх мечів, `SFX.pickup(r)` лише за рідкістю |
| Темний стиль | є (P15 `dkApply`, кнопка `#darkB`) |
| День/ніч | немає циклу; у біомі прапорець `day` (44 з 103 денні); небо в `setBiome3` (`G3.skyU`, `mCol` місяць, `G3.stars`) |
| Червоний місяць | немає; «Кривавий місяць» лише назва аномалії `vamp` |
| Сцени з босами | `cine()` = смуги + `SFX.cine()` на 2.3 с; `bossTalk(e)` через `say()`; камера не рухається, пропуску нема |
| Дороги | головна дорога — прямий коридор (`DEPTH=110`, `zLo/zHi`); бічні `sRoad(i)` мають вигин `cv` |
| Дерево навичок | радіальне SVG, гілки, іконки, ціни — потрібне лише шліфування |
| Дрібниця | «Шанси дропів»: останні 2 смужки коротші (ширше число `<0.001%`) |

## 9. People, terms & names
- **People:** власник = rostogen (тільки телефон).
- **Terms:** «Дороби» = продовжуй до кінця; «група N» = етап виправлень MEGA FIX; P11–P15 = попередні великі оновлення (опис у `CLAUDE.md`).
- **Names in use:** `index.html`, `CLAUDE.md`, `NEWS`/`NWC`, `T8`, `S8`, `L()`, `t()`, `LG`, `MG`, `SL`, `statCol` (новий, біля `statTxt`), `.pst`, `.petOn`, `.donD`, `.donBank`, ключ тексту `donateD`.

## 10. Work state
| Item | Status | Version / location | Notes |
|---|---|---|---|
| Аудит MEGA FIX | done | розділ 8 цього файлу | — |
| Група 1 (пети, підтримка, колір шолома) | final, merged | PR #57 | — |
| Група 2 звуки предметів | not started | — | наступна |
| Група 3 день/ніч + червоний місяць | not started | — | інтегрувати з `WX`/`wxNow`, без дубліката погоди |
| Група 4 сцени з босами | not started | — | пропуск, захист, відновлення камери |
| Група 5 унікальні моби | not started | — | деталі для wolf/ghost/dragon/bat/spider/slime за хешем |
| Група 6 дерево навичок, іконки, +темніше | not started | — | — |
| Дороги | waiting | — | чекає рішення користувача |
| Тести | є | `/tmp/claude-0/-home-user-Mini-rpg/cf14855d-de39-5b1a-9235-2497c438b392/scratchpad/p12/` (`tG*.js`, `tF.js`, `tE.js`, `tD.js`), `.../scratchpad/pol/` (`scan.js`, `langs.js`, `g1.js`) | scratchpad може зникнути в новому сеансі — тоді писати тести заново за зразком з розділу 8 |
| Відомий флейк | — | `tG.js` | падає, коли тестовий герой 1-го рівня гине від боса за один удар (умова тесту, не баг) |

## 11. Next steps
1. **Next action:** Група 2 — звукові профілі предметів: `SFX.equip(slot/kind)` за типом речі, `SFX.swing` залежно від типу/рідкості меча, `pickup` за природою предмета (матеріал/артефакт/золото); процедурно, з контролем гучності; тест + PR + merge.
2. Група 3: день/ніч + рідкісна ніч з червоним місяцем з очима.
3. Група 4: кінематографічні сцени босів.
4. Група 5: силуети мобів.
5. Група 6: дерево навичок, іконки, опційно +10% темніше.
6. Дороги — після відповіді користувача.

## 12. Open questions ⚠️
- Дороги: (а) безпечний варіант — візуальне петляння в коридорі + різні повороти бічних стежок (рекомендовано); (б) справжні криві дороги (великий ризик для руху, ворогів, меж карти); (в) пропустити.

## 13. Re-attach checklist
- Nothing to attach. Новий чат має працювати в тому ж репо `rostogen/Mini-rpg`; `CLAUDE.md` там уже є.

---
<sub>Audit: 13/13 sections · 17 rules · 3 corrections · 30 data points · secrets removed: yes · generated by active-memory</sub>
