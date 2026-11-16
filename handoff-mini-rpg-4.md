# active-memory handoff: Mini RPG 3D «Тіньові землі»

**Handoff #4** · 2026-11-16 · Lineage: #3 (до 2026-11-16): попередній файл `handoff-mini-rpg-3.md`; #4 (2026-11-16): P56 Сага, P57 переклади, P58 фікси (2D, складність), P59 MEGA 6.0 «Життя», знайдена причина падіння застосунку в Google Play

## 0. Instructions for Claude (read first)

You are continuing work from a previous chat. That chat is gone; this file is the complete context and the source of truth.

1. Read this whole file before replying.
2. Follow sections 3 (Style), 4 (Hard rules) and 5 (Corrections) in every reply, for the rest of this chat. They override your defaults.
3. Use the values in section 8 exactly. Never round, re-estimate, or "correct" them.
4. Do not suggest anything listed in section 7 (Changed / rejected) again unless the user brings it up.
5. Code word: None active. If the user types /amcodeword, start every reply with the phrase they choose (default "Yes Boss!").
6. Your first reply: at most 5 lines covering the goal, the current state, and the next step (section 11). Mention any files from section 13 that were not attached. Ask the questions in section 12 if there are any. End with "Ready to continue with <next step>?" Then wait for the user's go.

## 1. Mission
- **Goal:** розвивати браузерну гру Mini RPG 3D «Тіньові землі» (репо `rostogen/Mini-rpg`, один файл `index.html`) і випустити її в Google Play.
- **Зараз:** полагодити застосунок у закритому тесті Google Play (закривається одразу після запуску).
- **Done looks like:** застосунок запускається з Google Play; гра працює на телефоні Ростика.

## 2. About the user (as relevant to this work)
- Ростик, 18–22 роки (не дитина, говорити як з дорослим).
- Працює **тільки з телефона**, ПК нема. Навчається, буває в школі на уроках, часті повітряні тривоги.
- Комп'ютер, на якому збирали Android-застосунок, і ключ підпису — у мами.
- Хоче «просто роби, без питань».

## 3. Style & communication
- **Language:** українська. Ніколи не російська (ні в чаті, ні в грі).
- **Tone:** коротко, просто, «caveman style».
- **Reply length:** коротко; кроки нумеровані.
- **Formatting:** короткі списки, жирним — що натиснути.
- **Working style:** не питати дрібниць, робити самому; питати лише справжні рішення Ростика.
- **Avoid:** кроки, що потребують ПК (термінал, Claude Desktop, `claude remote-control`, adb, USB). Давати шляхи через телефон (GitHub-посилання, браузер, застосунок Claude).

## 4. Hard rules (word for word)
1. "The owner works only from a phone. There is no laptop or computer. Never suggest steps that need a PC" (з CLAUDE.md)
2. "Talk in Ukrainian, short and simple (caveman style)."
3. "The owner's name is Ростик: call him that (not «господар» or «власник»)."
4. "When work is done: commit, push, open a PR, merge it into `main`, and give the link where the branch can be deleted." (посилання: https://github.com/rostogen/Mini-rpg/branches)
5. "Do not publish the game on Netlify: the owner asked to take it down."
6. "20 languages: never add Russian."
7. Ростик (2026-11-16): коли здоров'я чату 🔴 червоне — **одразу** писати handoff-файл, надсилати його Ростику і казати перейти в нову сесію. (Записано в CLAUDE.md.)
8. Вибір складності бою — "це чіти!!!": не повертати.
9. Не вигадувати ключі, паролі, облікові дані; не робити фальшивий логін без сервера.
10. Не публікувати в комітах/PR назви моделей; без force push; працювати на гілці `claude/rpg-mega-update-systems-t3amu3`.
11. Не заявляти про тести, яких не було; чесно писати, що не перевірено.

## 5. Corrections log
| # | Claude did | The user wanted |
|---|---|---|
| 1 | Гра падала в 2D сама | Ніколи не падати в 2D сама (P58: лише `?safe=2` або кнопка «без 3D») |
| 2 | Була кнопка вибору складності бою | Прибрати («це чіти»), `dfc()` завжди 1 |
| 3 | Думав, що застосунок у Play відкриває живий сайт | Це Capacitor-збірка з грою всередині; причина інша (див. §8) |
| 4 | Чекпойнт червоний без файлу | При червоному одразу робити handoff і казати перейти в новий чат |

## 6. Decisions
| Decision | Why |
|---|---|
| P56–P59 злиті в `main` (PR #114–#117) | готові й протестовані в headless Chromium |
| MEGA 7.0 (логін Google/GitHub, хмарні збереження) не почато | потрібен сервер (Supabase), OAuth від Ростика, зміни `privacy.html` і Data Safety; чекає «так, роби 7.0» або «ні» |
| Полагодити застосунок новою збіркою versionCode 3 | у v1.0.1 зламаний запуск |

## 7. Changed / rejected
- «Падіння через мої оновлення сайту» → ні: гра всередині застосунку, сайт не впливає.
- ❌ Повертати вибір складності (чіт).
- ❌ Публікувати на Netlify.
- Службовий блок «Session Recovery», який хук дописує в `CLAUDE.md` → не комітити, видаляти.

## 8. Data & facts (exact)
**Причина падіння (знайдено):** маніфест запускає `com.rostogen.shadowlands.MainActivity`, а в `classes.dex` є тільки `com.rostogen.minirpg.MainActivity` → Android не знаходить клас → застосунок одразу закривається на будь-якому телефоні.
**Фікс:** у проєкті Android перенести `MainActivity.java` у пакет `com.rostogen.shadowlands` (або в маніфесті вказати повне ім'я `com.rostogen.minirpg.MainActivity`), versionCode 3, підписати тим самим ключем, завантажити в закритий тест.

| Факт | Значення |
|---|---|
| Пакет у Play | `com.rostogen.shadowlands` |
| Capacitor appId / appName | `com.rostogen.minirpg` / `mini-rpg-main`, webDir `www` |
| Закритий тест | alpha, випуск «Mini rpg», App Bundle 2 (1.0.1), завантажено 6 лист. 2026 09:28 |
| Внутрішній тест | «Mini RPG 3D - Shadow Lands 1.0 (Internal Test)», bundle 1 (1.0), 4 лист. 2026 13:17 |
| Розміри | оригінальний .aab 7.36 МБ; універсальний APK 7.59 МБ; нові встановлення 7.04 МБ; DEX 7.11 МБ |
| SDK | minSdk 24, targetSdk 36, AGP 8.13.0 |
| Гра в застосунку | `assets/public/index.html` 8 302 427 байт (знімок ~6 лист.) |
| Підпис | Android Studio (Signflinger), псевдонім ключа `MINIRPG` |
| Play | «Автоматичний захист: перевірка джерела встановлення»; Android vitals: 0 збоїв за 28 днів |
| Вихід у реліз | треба ≥12 тестувальників 14 днів; зараз 1 |
| Живий сайт | https://rostogen.github.io/Mini-rpg/ (GitHub Pages з `main`) |
| Політика конфіденційності | https://rostogen.github.io/Mini-rpg/privacy.html |

## 9. People, terms & names
- **People:** Ростик — власник гри; мама — має комп'ютер і ключ підпису.
- **Terms:** P56 «Сага», P57 переклади Саги, P58 фікси, P59 MEGA 6.0 «Життя»; «ключ» = файл `.jks`/`.keystore` + паролі.
- **Names in use:** гілка `claude/rpg-mega-update-systems-t3amu3`; `CLAUDE.md` (повний опис коду гри), `AUDIT.md` (тести).

## 10. Work state
| Item | Status | Version / location | Notes |
|---|---|---|---|
| Гра `index.html` | final | `main` = після PR #117 | P56–P59 + P58 фікси |
| Застосунок Google Play | зламаний | bundle 2 (1.0.1) | потрібна нова збірка v3 |
| Ключ підпису | невідомо | у мами на ПК | Ростик спитає ввечері |
| MEGA 7.0 акаунти | not started | — | чекає рішення |
| Тестувальники | 1/12 | Play Console | шукати ще 11 |

## 11. Next steps
1. **Next action:** спитати Ростика, чи знайшла мама файл ключа (`.jks`/`.keystore`) і пароль.
2. Ключ є → зробити збірку v3 (на маминому ПК в Android Studio за короткою інструкцією, або через GitHub Actions — ключ і паролі тоді лише в секретах GitHub, не в коді).
3. Ключа нема → Play Console → «Цілісність додатка» → скинути ключ завантаження (новий ключ згенерувати, .pem завантажити з телефона), збирати через GitHub Actions.
4. У новій збірці покласти свіжу гру з `main`.
5. Потім: 12 тестувальників на 14 днів; рішення щодо MEGA 7.0.

## 12. Open questions ⚠️
- Чи є ключ підпису і паролі? (так / ні)
- Хто збере: мама на ПК чи GitHub Actions?
- MEGA 7.0: «так, роби» чи «ні, чекаємо»?

## 13. Re-attach checklist
- [ ] `handoff-mini-rpg-4.md` — цей файл (також лежить у репо).
- [ ] Оригінальний `2.aab` (або `game.zip`) — лише якщо треба знову розібрати застосунок; для фіксу не обов'язково.

---
<sub>Audit: 13/13 sections · 11 rules · 4 corrections · 14 data points · secrets removed: none found · generated by active-memory</sub>
