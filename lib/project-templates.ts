/**
 * Система заготовленных проектов для демо
 * Обеспечивает стабильную работу демо независимо от GigaChat
 */

export interface ProjectTemplate {
  id: string
  name: string
  description: string
  keywords: string[]
  files: ProjectFile[]
  techStack: string[]
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'fullstack'
}

export interface ProjectFile {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: ProjectFile[]
}

// Заготовленные проекты
export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'todo-app',
    name: 'Todo App',
    description: 'Современное приложение для управления задачами с React и TypeScript',
    keywords: ['todo', 'задачи', 'tasks', 'управление', 'список', 'дело'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'web',
    files: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'App.tsx',
            type: 'file',
            content: `import React, { useState } from 'react'
import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Todo App
        </h1>
        <AddTodo onAdd={addTodo} />
        <TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  )
}

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}`
          },
          {
            name: 'components',
            type: 'folder',
            children: [
              {
                name: 'TodoList.tsx',
                type: 'file',
                content: `import React from 'react'
import { Todo } from '../App'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Нет задач. Добавьте первую!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}`
              },
              {
                name: 'TodoItem.tsx',
                type: 'file',
                content: `import React from 'react'
import { Todo } from '../App'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      />
      <span className="flex-1 text-gray-800">
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        Удалить
      </button>
    </div>
  )
}`
              },
              {
                name: 'AddTodo.tsx',
                type: 'file',
                content: `import React, { useState } from 'react'

interface AddTodoProps {
  onAdd: (text: string) => void
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить новую задачу..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Добавить
        </button>
      </div>
    </form>
  )
}`
              }
            ]
          },
          {
            name: 'App.css',
            type: 'file',
            content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`
          }
        ]
      },
      {
        name: 'package.json',
        type: 'file',
        content: `{
  "name": "todo-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}`
      },
      {
        name: 'vite.config.ts',
        type: 'file',
        content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`
      },
      {
        name: 'tailwind.config.js',
        type: 'file',
        content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
      },
      {
        name: 'index.html',
        type: 'file',
        content: `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
      }
    ]
  },
  {
    id: 'ecommerce-shop',
    name: 'E-commerce Shop',
    description: 'Интернет-магазин с корзиной покупок и системой оплаты',
    keywords: ['магазин', 'shop', 'ecommerce', 'корзина', 'товары', 'продажи'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    category: 'web',
    files: [
      {
        name: 'app',
        type: 'folder',
        children: [
          {
            name: 'page.tsx',
            type: 'file',
            content: `import { ProductGrid } from '@/components/ProductGrid'
import { CartProvider } from '@/contexts/CartContext'

export default function Home() {
  return (
    <CartProvider>
      <main className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                MyShop
              </h1>
              <CartButton />
            </div>
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductGrid />
        </div>
      </main>
    </CartProvider>
  )
}

function CartButton() {
  return (
    <button className="relative p-2 text-gray-600 hover:text-gray-900">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        0
      </span>
    </button>
  )
}`
          }
        ]
      },
      {
        name: 'components',
        type: 'folder',
        children: [
          {
            name: 'ProductGrid.tsx',
            type: 'file',
            content: `'use client'

import { ProductCard } from './ProductCard'
import { useCart } from '@/contexts/CartContext'

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999,
    image: '/images/iphone.jpg',
    description: 'Новейший iPhone с титановым корпусом'
  },
  {
    id: 2,
    name: 'MacBook Pro',
    price: 1999,
    image: '/images/macbook.jpg',
    description: 'Мощный ноутбук для профессионалов'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 249,
    image: '/images/airpods.jpg',
    description: 'Беспроводные наушники с шумоподавлением'
  }
]

export function ProductGrid() {
  const { addToCart } = useCart()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => addToCart(product)}
        />
      ))}
    </div>
  )
}`
          }
        ]
      }
    ]
  },
  {
    id: 'dashboard-analytics',
    name: 'Analytics Dashboard',
    description: 'Дашборд с графиками и аналитикой для бизнеса',
    keywords: ['дашборд', 'dashboard', 'аналитика', 'графики', 'статистика', 'charts'],
    techStack: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
    category: 'web',
    files: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'App.tsx',
            type: 'file',
            content: `import React from 'react'
import { Dashboard } from './components/Dashboard'
import { Sidebar } from './components/Sidebar'
import './App.css'

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  )
}`
          }
        ]
      }
    ]
  },
  {
    id: 'blog-cms',
    name: 'Blog CMS',
    description: 'Система управления контентом для блога с комментариями',
    keywords: ['блог', 'blog', 'cms', 'статьи', 'комментарии', 'контент'],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    category: 'web',
    files: [
      {
        name: 'app',
        type: 'folder',
        children: [
          {
            name: 'page.tsx',
            type: 'file',
            content: `import { PostList } from '@/components/PostList'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            My Blog
          </h1>
          <p className="text-gray-600 mt-2">
            Добро пожаловать в мой блог о технологиях
          </p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <PostList />
      </main>
    </div>
  )
}`
          }
        ]
      }
    ]
  },
  {
    id: 'crm-system',
    name: 'CRM System',
    description: 'Система управления клиентами для малого бизнеса',
    keywords: ['crm', 'клиенты', 'customers', 'управление', 'бизнес', 'продажи'],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    category: 'fullstack',
    files: [
      {
        name: 'client',
        type: 'folder',
        children: [
          {
            name: 'src',
            type: 'folder',
            children: [
              {
                name: 'App.tsx',
                type: 'file',
                content: `import React from 'react'
import { CustomerList } from './components/CustomerList'
import { AddCustomer } from './components/AddCustomer'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            CRM System
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CustomerList />
          </div>
          <div>
            <AddCustomer />
          </div>
        </div>
      </main>
    </div>
  )
}`
              }
            ]
          }
        ]
      }
    ]
  }
]

/**
 * Находит подходящий шаблон по ключевым словам в промпте
 */
export function findMatchingTemplate(prompt: string): ProjectTemplate | null {
  const lowerPrompt = prompt.toLowerCase()
  
  // Ищем точные совпадения по ключевым словам
  for (const template of PROJECT_TEMPLATES) {
    const matchScore = template.keywords.reduce((score, keyword) => {
      if (lowerPrompt.includes(keyword.toLowerCase())) {
        return score + 1
      }
      return score
    }, 0)
    
    // Если найдено 2+ совпадения, используем этот шаблон
    if (matchScore >= 2) {
      return template
    }
  }
  
  // Если точных совпадений нет, ищем по категориям
  if (lowerPrompt.includes('магазин') || lowerPrompt.includes('shop') || lowerPrompt.includes('ecommerce')) {
    return PROJECT_TEMPLATES.find(t => t.id === 'ecommerce-shop') || null
  }
  
  if (lowerPrompt.includes('todo') || lowerPrompt.includes('задачи') || lowerPrompt.includes('список')) {
    return PROJECT_TEMPLATES.find(t => t.id === 'todo-app') || null
  }
  
  if (lowerPrompt.includes('дашборд') || lowerPrompt.includes('dashboard') || lowerPrompt.includes('аналитика')) {
    return PROJECT_TEMPLATES.find(t => t.id === 'dashboard-analytics') || null
  }
  
  if (lowerPrompt.includes('блог') || lowerPrompt.includes('blog') || lowerPrompt.includes('cms')) {
    return PROJECT_TEMPLATES.find(t => t.id === 'blog-cms') || null
  }
  
  if (lowerPrompt.includes('crm') || lowerPrompt.includes('клиенты') || lowerPrompt.includes('customers')) {
    return PROJECT_TEMPLATES.find(t => t.id === 'crm-system') || null
  }
  
  return null
}

/**
 * Преобразует шаблон в формат для API
 */
export function templateToProject(template: ProjectTemplate, userPrompt: string) {
  return {
    name: template.name,
    description: template.description,
    files: template.files,
    demo: true,
    message: 'Зарегистрируйтесь для полного доступа ко всем файлам и функциям',
    template: template.id,
    techStack: template.techStack,
    userPrompt: userPrompt
  }
}
