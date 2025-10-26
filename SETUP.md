# 🚀 Nocturide IDE - Quick Setup Guide

## Phase 3: WebContainers Terminal - COMPLETED! ✅

### 🎯 Что реализовано:

1. **✅ WebContainers API Integration** - Полная интеграция с WebContainers для выполнения Node.js в браузере
2. **✅ xterm.js Terminal** - Интерактивный терминал с поддержкой всех команд
3. **✅ File System Sync** - Автоматическая синхронизация файлов между IDE и WebContainer
4. **✅ npm Support** - Полная поддержка npm install/run команд
5. **✅ Process Management** - Управление процессами и портами
6. **✅ Real-time Execution** - Выполнение кода в реальном времени в браузере

### 🔧 Настройка для запуска:

#### 1. Установка зависимостей
```bash
npm install
```

#### 2. Настройка базы данных

**Вариант A: Локальная PostgreSQL (рекомендуется для разработки)**
```bash
# Установите PostgreSQL локально
# Создайте базу данных
createdb nocturide_dev

# Или используйте Docker
docker run --name nocturide-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=nocturide_dev -p 5432:5432 -d postgres:15
```

**Вариант B: Neon PostgreSQL (production)**
1. Зарегистрируйтесь на [neon.tech](https://neon.tech)
2. Создайте новый проект
3. Скопируйте connection string в `.env`:
```env
DATABASE_URL="postgresql://username:password@hostname:port/database?sslmode=require"
```

#### 3. Миграции базы данных
```bash
# Генерация миграций
npx drizzle-kit generate

# Применение миграций
npx drizzle-kit push
```

#### 4. Запуск проекта
```bash
npm run dev
```

### 🎮 Использование терминала:

1. **Открыть терминал**: Нажмите кнопку "Terminal" в навигационной панели
2. **Синхронизация файлов**: Файлы автоматически синхронизируются с WebContainer
3. **npm команды**:
   - `npm install` - установка зависимостей
   - `npm run start` - запуск приложения
   - `npm run dev` - запуск dev сервера
4. **Другие команды**:
   - `ls` - список файлов
   - `pwd` - текущая директория
   - `clear` - очистка терминала
   - `help` - справка

### 🌟 Особенности WebContainers:

- **Real Node.js**: Полная поддержка Node.js в браузере
- **npm ecosystem**: Доступ ко всем npm пакетам
- **Live URLs**: Автоматическое получение URL для запущенных приложений
- **Process control**: Управление процессами (запуск/остановка)
- **File sync**: Двусторонняя синхронизация файлов

### 📊 Статус проекта:

- ✅ **Phase 1**: Database, Auth, Landing, IDE Layout, Monaco Editor
- ✅ **Phase 2**: GigaChat API Integration, AI Assistant  
- ✅ **Phase 3**: WebContainers Terminal, Real-time Execution

### 🚀 Готово к использованию!

Проект полностью функционален с:
- Современным IDE интерфейсом
- AI Assistant с GigaChat API
- Реальным терминалом с WebContainers
- Полной поддержкой Node.js экосистемы

**Backend подключение**: Готов к подключению внешнего бэкенда в конце разработки.
