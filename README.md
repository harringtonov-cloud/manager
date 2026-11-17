# Manager — Vercel Edition

Мобильное рабочее пространство для GitHub-проектов: просмотр файлов, редактирование с сохранением commit, AI-помощник с контекстом открытого файла и переход в настоящий облачный терминал GitHub Codespaces.

## Что работает в этом проекте

- GitHub OAuth: вход через GitHub.
- Список репозиториев, к которым у пользователя есть доступ.
- Просмотр папок и текстовых файлов репозитория.
- Редактирование файла и сохранение через GitHub Contents API отдельным commit.
- AI-чат через OpenAI-compatible Chat Completions API. При отправке запроса передаётся содержимое открытого файла (до 30 000 символов), имя репозитория и путь файла.
- Вкладка «Терминал» открывает GitHub Codespaces для выбранного репозитория. Сам терминал работает в Codespaces, а не в Vercel.
- Выход из GitHub-аккаунта.
- Адаптация интерфейса для телефона.

## Развёртывание на Vercel

1. Распакуй ZIP и загрузи **содержимое папки** в корень репозитория `harringtonov-cloud/manager`.
2. В Vercel выбери Add New → Project и импортируй `harringtonov-cloud/manager`.
3. В GitHub создай OAuth App: Settings → Developer settings → OAuth Apps → New OAuth App.
   - Homepage URL: `https://ТВОЙ-ДОМЕН-VERCEL`
   - Authorization callback URL: `https://ТВОЙ-ДОМЕН-VERCEL/api/auth/callback`
4. Добавь в Vercel → Project → Settings → Environment Variables:

| Переменная | Значение |
|---|---|
| `GITHUB_CLIENT_ID` | Client ID из GitHub OAuth App |
| `GITHUB_CLIENT_SECRET` | Client Secret из GitHub OAuth App |
| `SESSION_SECRET` | Случайная строка минимум 32 символа |
| `AI_BASE_URL` | `https://api.openai.com/v1` или base URL совместимого провайдера |
| `AI_API_KEY` | API-ключ выбранного AI-провайдера |
| `AI_MODEL` | Название модели, доступной у провайдера |

5. Нажми Redeploy.
6. Открой сайт и нажми «Подключить GitHub».

**Важно:** без OAuth-переменных GitHub-вход не заработает; без AI_API_KEY чат покажет сообщение о настройке. API-ключ AI вводится только в Vercel Environment Variables, не в браузере и не в GitHub-код.

## Облачный терминал

Вкладка «Терминал» открывает Codespaces для выбранного репозитория. После перехода создай Codespace, дождись загрузки VS Code в браузере и открой Terminal → New Terminal.

Codespaces — отдельный сервис GitHub, он не является частью Vercel. Для личных аккаунтов предусмотрена ограниченная бесплатная квота; после её исчерпания возможна тарификация. Проверяй актуальные лимиты и настройки расходов в GitHub Billing. Не включай платные ресурсы, если не хочешь расходов.

## Локальный запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Ограничения и безопасность

- AI анализирует переданный контекст, но не выполняет изменения в GitHub сам. Изменения файлов нужно проверить и сохранить кнопкой «Сохранить commit».
- AI-контекст открытого файла ограничен 30 000 символами.
- Vercel Functions не являются постоянной виртуальной машиной и не подходят для запуска произвольного долгоживущего терминала.
- GitHub OAuth использует scope `read:user repo`, поэтому при подключении пользователь разрешает приложению доступ к репозиториям в рамках выданных GitHub permissions.
- Не добавляй `.env.local` и секреты в репозиторий.
- Это готовый стартовый проект для развёртывания и дальнейшего развития, а не полностью готовая IDE уровня GitHub Codespaces/VS Code.
