# active-memory handoff: Mini RPG 3D «Тіньові землі»

**Handoff #1** · 2026-10-26 · Lineage: #1 (2026-10-26): аудит і реалізація ідей ChatGPT 1–300 (P29–P35), MEGA 6.0 (Колоси, скакун, небо, заставка), Кузня Майстра, анімації, нагороди й Шлях Героя; далі фікси.

## 0. Instructions for Claude (read first)

You are continuing work from a previous chat. That chat is gone; this file is the complete context and the source of truth.

1. Read this whole file before replying.
2. Follow sections 3 (Style), 4 (Hard rules) and 5 (Corrections) in every reply, for the rest of this chat. They override your defaults.
3. Use the values in section 8 exactly. Never round, re-estimate, or "correct" them.
4. Do not suggest anything listed in section 7 (Changed / rejected) again unless the user brings it up.
5. Code word: None active. If the user types /amcodeword, start every reply with the phrase they choose (default "Yes Boss!").
6. Your first reply: at most 5 lines covering the goal, the current state, and the next step (section 11). Mention any files from section 13 that were not attached. Ask the questions in section 12 if there are any. End with "Ready to continue with <next step>?" Then wait for the user's go.

## 1. Mission
- **Goal:** розвивати браузерну гру Mini RPG 3D «Тіньові землі» (репозиторій `rostogen/Mini-rpg`, один файл `index.html`); зараз — виправляти вади після нічних оновлень.
- **Done looks like:** Ростик пише, що зламано → виправлено, перевірено тестами, злито в `main`, дано посилання на гілки.
- **Why it matters / context:** Ростик хоче гру, яка «затягує» і робить «вау»; грає й перевіряє з телефона.

## 2. About the user (as relevant to this work)
- Ім'я: Ростик. Працює **тільки з телефона** (нема ПК).
- Не програміст; дає ідеї (часто від ChatGPT списками), оцінює результат у грі.
- Любить великі автономні «нічні» оновлення: «не питай», «роби все круто», «Дороби те що робив».

## 3. Style & communication
- **Language:** українська у відповідях; гра має 20 мов.
- **Tone:** коротко, просто («caveman style»), дружньо.
- **Reply length:** коротко; звіт — списком що зроблено, що змінено, що протестовано.
- **Formatting:** короткі пункти, емодзі можна.
- **Working style:** діяти автономно, не питати дрібниць; працювати пакетами; після кожного пакета тести + PR + merge. Коли довго мовчиш — коротко писати, що робиш.
- **Avoid:** поради для ПК (термінал, Claude Desktop, adb, USB); слова «господар»/«власник»; заяви про тести, яких не запускав.

## 4. Hard rules (word for word)
1. "The owner works **only from a phone**. There is no laptop or computer. Never suggest steps that need a PC: terminal, Claude Desktop, `claude remote-control`, adb, USB cable."
2. "Talk in Ukrainian, short and simple (caveman style)."
3. "The owner's name is Ростик: call him that (not «господар» or «власник»)."
4. "The game is one file: `index.html` (Three.js, first person only, open world, 20 languages: never add Russian)."
5. "When work is done: commit, push, open a PR, merge it into `main`, and give the link where the branch can be deleted." (посилання: https://github.com/rostogen/Mini-rpg/branches)
6. "Do not publish the game on Netlify: the owner asked to take it down."
7. Алмази 💎 — тільки з меню 🎁 (щоденна нагорода й квести); нові системи алмазів не дають.
8. "Never test rarities by number: use the flags (`rainbow`, `cosmic`, `dark`, `gsl`, `red`) or helpers `rarTxtCol`, `rLive`, `rbOrCs`."
9. "What's new: add a line to `NEWS` … with every update" (рядок у 20 мовах).
10. Без донатів, реклами, серверів, онлайн-мультиплеєра; картку донату в налаштуваннях не чіпати.
11. "не стверджуй, що тести пройдено, якщо їх фактично не запускав"; на телефоні й на слух не перевірено — так і казати.
12. "Не переписуй гру з нуля"; "Не видаляй наявний функціонал і не скидай старі збереження"; нагороди — без повторного отримання, витрати — без подвійного списання; без накопичення таймерів, дублювання ворогів/об'єктів і витоків пам'яті.
13. Ніколи не писати назви/ID моделей у комітах, PR чи коді.
14. Довідник по всіх системах гри — у `CLAUDE.md` в репозиторії; доповнювати його з кожним пакетом.

## 5. Corrections log
| # | Claude did | The user wanted |
|---|---|---|
| 1 | — (прямих виправлень від Ростика в цьому чаті не було) | — |

Технічні пастки, знайдені тестами (не повторювати):
| # | Помилка | Правильно |
|---|---|---|
| 1 | Збереження скакуна в `LG.mt` | `LG.mt` — таймер метеоритів; скакун у `LG.std` |
| 2 | Оверлей заставки з id `cine` | `#cine` — смуги боса; заставка `#m6c` |
| 3 | Кнопка з класом `sk` | `hud()` читає `.sk` як кнопки умінь; брати інший клас (`m6sk`) |
| 4 | Блиск заголовка через text-fill transparent | ховає емодзі; блиск через `h2::after` |
| 5 | `isFP()` на старті | false, поки 3D не готове |
| 6 | Титули, додані після `loadState()` | губились; в кінці блоку перечитувати `LG.ttl`/`SL.ttl` |
| 7 | Повні молоти блокували кінець прокачки кузні | перевірка `upE` до раннього виходу в `smRegen` |

## 6. Decisions
| Decision | Why |
|---|---|
| Блок ідей 274–300 зроблено пакетами E/F/G (P33–P35) | запит «ФІНАЛЬНИЙ БЛОК ІДЕЙ №274–300» |
| MEGA 6.0 «Пробудження Колосів» = Колоси + Дух-скакун + Живе небо + Заставка | запит на «вау» зранку |
| Кузня Майстра як Smithing Master (P40) | прохання Ростика |
| Анімації діалогів і вікон (P41) | «на кожний діалог анімації» |
| «Нагороди готові!» + скриня кожні 4 год + Шлях Героя (P42) | «your daily rewards ready», «щоб затягувало» |
| Перша хвиля бою чекає заставку на першому вході | щоб заставка йшла одразу |

## 7. Changed / rejected
- Ідея 297 «подвійна тінь» → кімната двох вогнів (від першої особи тіні героя не видно).
- ❌ Платний сезонний пропуск / донати (правило: без донатів) → Шлях Героя повністю безкоштовний.

## 8. Data & facts (exact)
- Репозиторій: `rostogen/Mini-rpg`; робоча гілка `ccr-69cfb0ba-98akjb`; після злиття: `git fetch -q origin main && git checkout -q -B ccr-69cfb0ba-98akjb origin/main && git push -q -u origin ccr-69cfb0ba-98akjb`.
- Підпис комітів: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` і `Claude-Session: https://claude.ai/code/session_01ERQmh76h9m8VrAoH75GUSn`; PR закінчується «🤖 Generated with [Claude Code](https://claude.com/claude-code)» + посилання сесії.

| PR | Що |
|---|---|
| #95 | P33 інтерфейс (ідеї 274–279) |
| #96 | P34 живий світ (280–294) |
| #97 | P35 таємниці (295–300) |
| #98 | P37 Колоси |
| #99 | P38 Дух-скакун |
| #100 | P36 Живе небо |
| #101, #102 | P39 Заставка + утримання першої хвилі |
| #103 | P40 Кузня Майстра + P41 анімації |
| #104 | P42 Нагороди готові, скриня, Шлях Героя |

- Кузня: рівні 1–40, молоти: запас 40 (+5 за рівень складу), відновлення 24 с (−2 с за рівень гарту, мін. 8 с), автокування з рівня 5, завдання дня 10/30/60, 8% вбивств дають молот.
- Шлях Героя: сезон = календарний місяць, 40 рівнів, потрібно `60+рівень*4` слави; титули на 20 і 40; скриня кожні 4 год.
- Колоси: 5 видів; Ріг — раз на 15 хв.
- Скакун: клавіша J, +75 швидкості.

## 9. People, terms & names
- **People:** Ростик — власник гри, гравець, дає ідеї.
- **Terms & nicknames:** «Колоси» = велетні на обрії; «Кузня Майстра» = кування молотами; «Шлях Героя» = безкоштовний сезон; «скакун» = кінь.
- **Names in use:** блоки `P29`–`P42` в `index.html`; `CLAUDE.md`, `PLAN300.md`; тексти `PxxTsrc`; тики через `p17Tick`.

## 10. Work state
| Item | Status | Version / location | Notes |
|---|---|---|---|
| Ідеї 1–300 | final | PLAN300.md | 297 замінено |
| MEGA 6.0 | final | `main` (#98–#102) | на телефоні не перевірено |
| Кузня, анімації, нагороди | final | `main` (#103–#104) | на телефоні не перевірено |
| Виправлення після тесту Ростика | not started | — | чекаємо список вад |

Тести: Chromium без екрана (скрипти в scratchpad, регресія ~33–87 боїв), 0 помилок консолі.

## 11. Next steps
1. **Next action:** попросити Ростика надіслати список вад (скріни або опис «що робив → що сталося») і полагодити їх.
2. Перевірити кожне виправлення в браузері, регресія боїв.
3. Commit, PR, merge, дати https://github.com/rostogen/Mini-rpg/branches.

## 12. Open questions ⚠️
- Які саме вади знайшов Ростик зранку? (ще не надіслав)

## 13. Re-attach checklist
- Nothing to attach. (Код у репозиторії `rostogen/Mini-rpg`; довідник — `CLAUDE.md`.)

---
<sub>Audit: 13/13 sections · 14 rules · 7 corrections · 30 data points · secrets removed: none found · generated by active-memory</sub>
