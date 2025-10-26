# Nocturide IDE

Modern web-based development environment with AI assistance powered by GigaChat API.

## 🚀 Features

- **Monaco Editor** - Full-featured code editor with syntax highlighting and IntelliSense
- **AI Assistant** - Powered by GigaChat API for code explanations, refactoring, and generation
- **File Management** - Drag & drop file tree with context menus
- **Real-time Execution** - Terminal with WebContainers API for Node.js execution in browser
- **Glassmorphism UI** - Beautiful modern design with blur effects
- **Authentication** - Better Auth with Email Magic Link + GitHub OAuth
- **Database** - Neon PostgreSQL with Drizzle ORM

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19.2, TypeScript
- **Styling**: Tailwind CSS 4, Glassmorphism effects
- **Database**: Neon PostgreSQL, Drizzle ORM
- **Authentication**: Better Auth
- **AI**: GigaChat API
- **Editor**: Monaco Editor
- **Terminal**: WebContainers API, xterm.js

## 📋 Prerequisites

- Node.js 20.9+ (LTS)
- PostgreSQL database (Neon recommended)
- GigaChat API credentials

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nocturide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@hostname:port/database?sslmode=require"
   
   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key-here"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   
   # GitHub OAuth (optional)
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   
   # GigaChat API (provided)
   GIGACHAT_CLIENT_ID="0199824b-4c1e-7ef1-b423-bb3156ddecee"
   GIGACHAT_CLIENT_SECRET="46991ceb-e831-4b1a-b63a-25d18a37d5c7"
   GIGACHAT_AUTHORIZATION_KEY="MDE5OTgyNGItNGMxZS03ZWYxLWI0MjMtYmIzMTU2ZGRlY2VlOjQ2OTkxY2ViLWU4MzEtNGIxYS1iNjNhLTI1ZDE4YTM3ZDVjNw=="
   GIGACHAT_OAUTH_URL="https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
   GIGACHAT_API_URL="https://gigachat.devices.sberbank.ru/api/v1"
   GIGACHAT_SCOPE="GIGACHAT_API_PERS"
   ```

4. **Database setup**
   ```bash
   # Generate migrations
   npx drizzle-kit generate
   
   # Apply migrations
   npx drizzle-kit push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

1. **Landing Page**: Visit `http://localhost:3000`
2. **Create Project**: Describe your project idea and click "Build with AI"
3. **IDE Workspace**: Edit code with Monaco Editor
4. **AI Assistant**: Use the right sidebar to chat with AI, explain code, or refactor
5. **File Management**: Use the left sidebar to manage files and folders

## 📁 Project Structure

```
nocturide/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles + Glassmorphism
│   ├── auth/              # Authentication pages
│   ├── workspace/         # IDE workspace
│   └── api/               # API routes
├── components/
│   ├── landing/           # Landing page components
│   ├── auth/              # Authentication components
│   ├── ide/               # IDE components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── auth.ts            # Better Auth configuration
│   ├── db.ts              # Drizzle database connection
│   ├── gigachat.ts        # GigaChat API integration
│   └── validations.ts     # Zod validation schemas
├── drizzle/
│   └── schema.ts          # Database schema
└── proxy.ts               # Next.js 16 proxy (replaces middleware)
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/sign-in/email` - Email magic link
- `GET /api/auth/sign-in/social?provider=github` - GitHub OAuth

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Files
- `GET /api/files?projectId=X` - List project files
- `POST /api/files` - Create file/folder
- `GET /api/files/[id]` - Get file content
- `PUT /api/files/[id]` - Update file content
- `DELETE /api/files/[id]` - Delete file

### AI Assistant
- `POST /api/ai` - Send message to GigaChat API

### WebContainer
- `POST /api/webcontainer` - WebContainer operations (sync files, run commands, etc.)

## 🎨 Features by Phase

### ✅ Phase 1 (Completed)
- Database setup with Drizzle ORM + Neon PostgreSQL
- Better Auth authentication system
- Landing page with glassmorphism design
- IDE workspace with resizable panels
- Monaco Editor integration
- File management system
- Projects and Files API

### ✅ Phase 2 (Completed)
- GigaChat API integration
- AI Assistant with chat interface
- Code explanation, refactoring, and generation
- Real-time AI responses

### ✅ Phase 3 (Completed)
- WebContainers API integration for real Node.js execution
- xterm.js terminal with full interactive support
- npm install/run commands with live output
- File system synchronization between IDE and WebContainer
- Process management and port handling
- Real-time code execution in browser

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (recommended)
   ```bash
   npx vercel
   ```

3. **Set environment variables** in your deployment platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**MagistrTheOne** - *Initial work*

---

Built with ❤️ using Next.js 16, React 19.2, and GigaChat API