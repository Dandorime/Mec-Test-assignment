# mecenate-test

Тестовое React Native приложение на Expo. Лента постов с поддержкой платного контента, оптимистичными лайками и пагинацией.

## Стек

- **Expo** (SDK 54, New Architecture)
- **expo-router** — файловая маршрутизация
- **TanStack Query v5** — серверное состояние, кэш, пагинация
- **MobX** — оптимистичные обновления UI (лайки)
- **Reanimated 4** — анимации кнопок
- **FlashList** — производительный список ленты
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
  shared/      # API-клиент, UI-кит, токены, утилиты
  entities/    # Бизнес-сущности (post)
  features/    # Действия пользователя (like-post, comment-post)
  widgets/     # Составные блоки UI (post-card)
  pages/       # Экраны (feed, post)
app/           # Маршруты expo-router
```
