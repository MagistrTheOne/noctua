# Nocturide

**Современная веб-среда разработки с ИИ-помощником. Создавайте, программируйте и развертывайте проекты быстрее чем когда-либо.**

## 🚀 Описание проекта

Nocturide - это полнофункциональная IDE в браузере, которая использует искусственный интеллект для генерации кода. Просто опишите, что вы хотите создать, и ИИ сгенерирует полный проект с фронтендом, бэкендом и базой данных.

### ✨ Основные возможности

- **ИИ-генерация кода**: Создавайте проекты описанием на естественном языке
- **Полнофункциональная IDE**: Monaco Editor с подсветкой синтаксиса и автодополнением
- **Встроенный терминал**: Выполняйте команды прямо в браузере
- **Система файлов**: Полноценное управление файлами проекта
- **Готовые шаблоны**: Быстрый старт с популярными технологиями
- **Реальное время**: Все изменения сохраняются автоматически

## 🛠 Технологический стек

### Frontend
- **Next.js 16** - React фреймворк с новыми возможностями:
  - Cache Components для оптимизации производительности
  - Turbopack (стабильный) - быстрая сборка и разработка
  - Proxy.ts вместо middleware.ts для четких сетевых границ
  - React 19.2 с View Transitions и useEffectEvent
- **React 19.2** - Последняя версия с новыми хуками и оптимизациями
- **TypeScript** - Типизированный JavaScript
- **Tailwind CSS** - Utility-first CSS фреймворк
- **shadcn/ui** - Компоненты интерфейса

### Backend & Database
- **Better Auth** - Современная система аутентификации с поддержкой:
  - Email/Password аутентификация
  - OAuth провайдеры (GitHub)
  - Сессии с автоматическим обновлением
  - Защита маршрутов через proxy.ts
- **Drizzle ORM** - Типобезопасная работа с базой данных
- **PostgreSQL (Neon)** - Облачная база данных
- **Next.js API Routes** - Серверная логика

### AI & Development Tools
- **GigaChat API** - Российский ИИ для генерации кода
- **Monaco Editor** - Редактор кода от VS Code
- **WebContainer API** - Выполнение Node.js в браузере
- **Zod** - Валидация схем данных

### DevOps & Deployment
- **Vercel** - Развертывание и хостинг
- **Turbopack** - Быстрая сборка (2-5x быстрее)
- **ESLint** - Линтинг кода
- **TypeScript** - Проверка типов

## 🔐 Система авторизации (Next.js 16)

Проект использует современный подход к авторизации согласно [Next.js 16](https://nextjs.org/blog/next-16):

### Архитектура безопасности
- **proxy.ts** - Заменяет middleware.ts для четких сетевых границ
- **Better Auth** - Современная библиотека аутентификации
- **Защищенные маршруты** - Автоматическая проверка сессий
- **API защита** - Все API endpoints требуют аутентификации

### Конфигурация безопасности
```typescript
// proxy.ts - защита маршрутов
export const config = {
  matcher: ['/workspace/:path*', '/api/projects/:path*', '/api/files/:path*']
}

// lib/auth.ts - конфигурация Better Auth
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true },
  socialProviders: { github: { clientId, clientSecret } },
  session: { expiresIn: 60 * 60 * 24 * 7 }, // 7 дней
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL]
})
```

## 📁 Структура проекта

```
nocturide/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Главная страница
│   ├── layout.tsx          # Корневой layout
│   ├── globals.css         # Глобальные стили + Glassmorphism
│   ├── not-found.tsx       # Страница 404
│   ├── error.tsx           # Страница 500
│   ├── auth/               # Страницы аутентификации
│   ├── workspace/          # IDE рабочее пространство
│   └── api/                # API маршруты
├── components/
│   ├── landing/            # Компоненты главной страницы
│   ├── auth/               # Компоненты аутентификации
│   ├── ide/                # Компоненты IDE
│   └── ui/                 # shadcn/ui компоненты
├── lib/
│   ├── auth.ts             # Конфигурация Better Auth
│   ├── auth-client.ts      # Клиентская конфигурация
│   ├── db.ts               # Подключение к базе данных
│   ├── gigachat.ts         # Интеграция с GigaChat API
│   └── validations.ts      # Zod схемы валидации
├── drizzle/
│   └── schema.ts           # Схема базы данных
└── proxy.ts                # Next.js 16 proxy (заменяет middleware)
```

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ 
- PostgreSQL база данных (Neon рекомендуется)
- GigaChat API ключ

### Установка

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/MagistrTheOne/nocturide.git
cd nocturide
```

2. **Установите зависимости**
```bash
npm install
```

3. **Настройте переменные окружения**
```bash
cp .env.example .env.local
```

Заполните `.env.local`:
```env
# Database
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# GigaChat API
GIGACHAT_API_KEY="your-gigachat-api-key"
```

4. **Настройте базу данных**
```bash
npm run db:push
```

5. **Запустите проект**
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📚 Использование

1. **Регистрация/Вход** - Создайте аккаунт или войдите через GitHub
2. **Создание проекта** - Опишите желаемый проект на главной странице
3. **Разработка** - Используйте встроенную IDE для редактирования кода
4. **Терминал** - Выполняйте команды npm, git и другие
5. **Развертывание** - Деплойте проекты на Vercel одним кликом

## 🔧 Разработка

### Доступные команды
```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен сервера
npm run db:push      # Обновление схемы БД
npm run db:studio    # Открытие Drizzle Studio
npm run lint         # Проверка кода
```

### Особенности Next.js 16
- **Turbopack** включен по умолчанию для быстрой разработки
- **Cache Components** для оптимизации производительности
- **Proxy.ts** для защиты маршрутов
- **React 19.2** с новыми возможностями

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие Nocturide! 

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📞 Контакты

- **Автор**: MagistrTheOne
- **Email**: maxonyushko71@gmail.com
- **Telegram**: [@MagistrTheOne](https://t.me/MagistrTheOne)
- **GitHub**: [MagistrTheOne](https://github.com/MagistrTheOne)
- **Локация**: Краснодар, Россия

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

---

**Сделано с ❤️ MagistrTheOne | 2025 | Краснодар**
