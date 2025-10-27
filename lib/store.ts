import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DemoState {
  // Rate limit info
  rateLimitInfo: {
    remaining: number
    resetAt: number
    limit: number
  } | null
  
  // Generated project
  generatedProject: any | null
  
  // Selected file in editor
  selectedFile: string | null
  
  // Project files
  projectFiles: Array<{name: string, content: string}>
  
  // Active tab
  activeTab: 'generate' | 'chat' | 'review' | 'debug'
  
  // Chat messages
  chatMessages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    type?: 'text' | 'code' | 'project'
  }>
  
  // Actions
  setRateLimitInfo: (info: any) => void
  setGeneratedProject: (project: any) => void
  setSelectedFile: (file: string | null) => void
  setProjectFiles: (files: Array<{name: string, content: string}>) => void
  updateProjectFile: (fileName: string, content: string) => void
  setActiveTab: (tab: 'generate' | 'chat' | 'review' | 'debug') => void
  addChatMessage: (message: any) => void
  clearChatMessages: () => void
  resetDemo: () => void
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      // Initial state
      rateLimitInfo: null,
      generatedProject: null,
      selectedFile: null,
      projectFiles: [],
      activeTab: 'generate',
      chatMessages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Привет! Я Noctu - ваш AI помощник для разработки. Я могу помочь с:\n\n• Генерацией кода и проектов\n• Объяснением технологий\n• Отладкой и решением проблем\n• Созданием технических заданий\n• Ревью кода\n\nЧто бы вы хотели создать или обсудить?',
          timestamp: new Date(),
          type: 'text'
        }
      ],

      // Actions
      setRateLimitInfo: (info) => set({ rateLimitInfo: info }),
      
      setGeneratedProject: (project) => set({ generatedProject: project }),
      
      setSelectedFile: (file) => set({ selectedFile: file }),
      
      setProjectFiles: (files) => set({ projectFiles: files }),
      
      updateProjectFile: (fileName, content) => set((state) => ({
        projectFiles: state.projectFiles.map(file => 
          file.name === fileName ? { ...file, content } : file
        )
      })),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      addChatMessage: (message) => set((state) => ({
        chatMessages: [...state.chatMessages, message]
      })),
      
      clearChatMessages: () => set({
        chatMessages: [
          {
            id: '1',
            role: 'assistant',
            content: 'Чат очищен! Чем могу помочь?',
            timestamp: new Date(),
            type: 'text'
          }
        ]
      }),
      
      resetDemo: () => set({
        rateLimitInfo: null,
        generatedProject: null,
        selectedFile: null,
        projectFiles: [],
        activeTab: 'generate',
        chatMessages: [
          {
            id: '1',
            role: 'assistant',
            content: 'Привет! Я Noctu - ваш AI помощник для разработки. Я могу помочь с:\n\n• Генерацией кода и проектов\n• Объяснением технологий\n• Отладкой и решением проблем\n• Созданием технических заданий\n• Ревью кода\n\nЧто бы вы хотели создать или обсудить?',
            timestamp: new Date(),
            type: 'text'
          }
        ]
      })
    }),
    {
      name: 'nocturide-demo-storage',
      partialize: (state) => ({
        rateLimitInfo: state.rateLimitInfo,
        generatedProject: state.generatedProject,
        selectedFile: state.selectedFile,
        projectFiles: state.projectFiles,
        activeTab: state.activeTab,
        chatMessages: state.chatMessages
      })
    }
  )
)
