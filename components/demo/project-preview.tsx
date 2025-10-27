'use client'

import { useState } from 'react'
import { FileTree } from './file-tree'
import { CodeViewer } from './code-viewer'
import { ExternalLink, RefreshCw } from 'lucide-react'

interface ProjectFile {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: ProjectFile[]
}

interface ProjectPreviewProps {
  project?: {
    name: string
    description: string
    files: ProjectFile[]
    demo?: boolean
    message?: string
    source?: 'template' | 'gigachat' | 'fallback'
    techStack?: string[]
  } | null
  isLoading?: boolean
}

export function ProjectPreview({ project, isLoading }: ProjectPreviewProps) {
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null)
  const [activeTab, setActiveTab] = useState<'files' | 'code'>('files')

  const getFileExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript'
      case 'js':
      case 'jsx':
        return 'javascript'
      case 'css':
        return 'css'
      case 'html':
        return 'html'
      case 'json':
        return 'json'
      default:
        return 'text'
    }
  }

  if (isLoading) {
    return (
      <div className="h-full bg-zinc-900/50 border border-zinc-700/50 rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
            <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
            <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="h-full bg-zinc-900/50 border border-zinc-700/50 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
          Сгенерируйте проект для просмотра
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-zinc-900/50 border border-zinc-700/50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">{project.name}</h3>
            <p className="text-sm text-zinc-400 mt-1">{project.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            {project.demo && (
              <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                Демо версия
              </span>
            )}
            {project.source === 'template' && (
              <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">
                Шаблон
              </span>
            )}
            {project.source === 'gigachat' && (
              <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                AI генерация
              </span>
            )}
            {project.source === 'fallback' && (
              <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">
                Fallback
              </span>
            )}
            <button className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {project.message && (
          <div className="mt-3 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <p className="text-sm text-blue-400">{project.message}</p>
          </div>
        )}
        
        {project.techStack && (
          <div className="mt-3">
            <p className="text-xs text-zinc-500 mb-2">Технологии:</p>
            <div className="flex flex-wrap gap-1">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs bg-zinc-800/50 text-zinc-300 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-700/50">
        <button
          onClick={() => setActiveTab('files')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'files'
              ? 'text-zinc-100 border-b-2 border-blue-500'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Файлы
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'code'
              ? 'text-zinc-100 border-b-2 border-blue-500'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Код
        </button>
      </div>

      {/* Content */}
      <div className="h-full overflow-hidden">
        {activeTab === 'files' ? (
          <FileTree
            files={project.files}
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
          />
        ) : (
          <CodeViewer
            content={selectedFile?.content || ''}
            language={selectedFile ? getFileExtension(selectedFile.name) : 'text'}
            filename={selectedFile?.name}
          />
        )}
      </div>
    </div>
  )
}
