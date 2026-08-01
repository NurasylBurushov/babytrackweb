# SabiTrack Web (Telegram Mini App)

Каркас веб-версии приложения для запуска внутри Telegram. Ходит на тот же
бэкенд (`sabitrack-production.up.railway.app`), что и iOS-приложение.

## Запуск локально

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`. В обычном браузере `window.Telegram`
не существует — экран авторизации это учитывает и просто не даёт войти
(это ожидаемо, для полноценной проверки нужен реальный Telegram).

## Проверка внутри Telegram (до деплоя)

1. Запустите `npm run dev`.
2. Прокиньте локальный сервер наружу через туннель, например `ngrok http 5173`.
3. В @BotFather: `/mybots` → ваш бот → `Bot Settings` → `Menu Button` →
   вставьте ngrok-ссылку (https).
4. Откройте бота в Telegram — кнопка меню откроет ваш локальный сервер.

## Что уже готово

- Экран входа через Telegram (initData)
- Главная (список нянь)
- Маркет (товары) — пока на моковых данных
- Чаты (список + переписка) — пока на моковых данных, WebSocket не подключён
- Профиль

## Что нужно доделать под ваш бэкенд

1. **`/auth/telegram`** — на бэкенде такого роута ещё нет, нужно добавить
   (проверка подписи `init_data` секретным ключом бота, выдача JWT —
   по аналогии с тем, как уже сделаны `/auth/google` и `/auth/apple`
   в `router_auth.py`). Могу написать этот роут, как только скажете.
2. **Реальные данные** вместо моков в `MarketScreen.jsx` и `ChatListScreen.jsx` /
   `ChatDetailScreen.jsx` — как только пришлёте структуру моделей
   `Nanny`, `Product`, `Message`, `ChatRoom`, подключим настоящие эндпоинты.
3. **WebSocket для чата** — нужен аналог `WebSocketManager.swift`,
   в `ChatDetailScreen.jsx` сейчас сообщения только локальные (не отправляются).
4. **Иконки** — сейчас эмодзи-заглушки в `BottomNav.jsx` и карточках,
   замените на свой набор иконок при желании (например `lucide-react`).

## Деплой

Соберите статику и залейте на любой HTTPS-хостинг (Vercel, Netlify,
Railway static site, Cloudflare Pages):

```bash
npm run build
# результат в папке dist/
```

Затем в @BotFather укажите публичный URL как Menu Button вашего бота.
