# mecenate-test

Тестовое React Native приложение на Expo. Лента постов с поддержкой платного контента, оптимистичными лайками, пагинацией, системой комментариев и real-time обновлениями через WebSocket.

## Возможности

- **Лента постов** с фильтрацией по типу (все / бесплатные / платные) и курсорной пагинацией
- **Оптимистичные лайки** — мгновенный отклик с автоматическим откатом при ошибке
- **Страница поста** — полный контент, комментарии, сортировка, pull-to-refresh
- **Комментарии** — бесконечная прокрутка, оптимистичное добавление, локальные лайки
- **Real-time** — live-обновление счётчиков лайков и новых комментариев через WebSocket с exponential backoff при реконнекте

## Стек

- **Expo** (SDK 54, New Architecture)
- **expo-router** — файловая маршрутизация
- **TanStack Query v5** — серверное состояние, кэш, пагинация, оптимистичные обновления
- **MobX** — локальное UI-состояние для лайков постов и комментариев
- **Reanimated 4** — анимации кнопок и таб-бара
- **FlashList** — производительный список ленты и комментариев
- **WebSocket** — real-time обновления (через singleton `wsService` с exponential backoff)
- **Manrope** — шрифтовая гарнитура

## Требования

- Node.js >= 18
- npm >= 10
- Expo CLI: `npm install -g expo-cli` (или использовать `npx expo`)
- Для iOS: Xcode + симулятор / устройство
- Для Android: Android Studio + эмулятор / устройство

## Установка

```bash
npm install
```

## Переменные окружения

Скопируй `.env.example` в `.env` и заполни значения:

```bash
cp .env.example .env
```

| Переменная | Обязательная | Описание |
|---|---|---|
| `EXPO_PUBLIC_API_BASE_URL` | Да | Базовый URL API (`https://k8s.mectest.ru/test-app`) |
| `EXPO_PUBLIC_API_TOKEN` | Да | Bearer-токен для авторизации запросов |

> Переменные с префиксом `EXPO_PUBLIC_` встраиваются в бандл на этапе сборки и доступны через `process.env`. Не помещай в них секреты, которые нельзя раскрывать клиенту.

## Запуск

```bash
# Запустить dev-сервер (выбор платформы в терминале)
npm start

# iOS симулятор
npm run ios

# Android эмулятор
npm run android

# Веб
npm run web
```

После запуска dev-сервера отсканируй QR-код в приложении **Expo Go** (iOS / Android) или нажми `i` / `a` в терминале для открытия симулятора.

## Линтинг

```bash
npm run lint
```

## Архитектура

Проект следует **Feature-Sliced Design**:

```
src/
  shared/
    api/          # Axios-клиент
    assets/       # SVG-иконки
    constants/    # Токены дизайн-системы (цвета, отступы, шрифты, радиусы)
    lib/          # Утилиты: wsService, formatCount, useButtonColor
    ui/           # UI-кит: Avatar, ErrorState, ...
  entities/
    post/         # Типы, postApi, queryKeys, FeedStore (MobX)
  features/
    like-post/    # Лайк поста: LikeButton + useLikePost
    comment-post/ # Комментарии: UI-компоненты, хуки, CommentLikeStore (MobX)
  widgets/
    post-card/    # Составной блок карточки поста
  pages/
    feed/         # Лента: FeedPage, FeedTabBar, useFeedQuery
    post/         # Страница поста: PostPage, usePostQuery, usePostRealtime
app/              # Маршруты expo-router
```

### Ключевые решения

| Область | Решение |
|---|---|
| Серверное состояние | TanStack Query (infinite queries, optimistic updates, cache invalidation) |
| UI-состояние лайков | MobX `FeedStore` / `CommentLikeStore` — изолированный оптимистичный toggle с откатом |
| Real-time | Singleton `WsService` с reference-counting, exponential backoff (1s → 30s) |
| Дизайн-система | Единый объект `tokens` — все цвета, отступы, шрифты только через токены |
| Навигация | expo-router (file-based) |
