'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
}

interface FileTreeProps {
  files: FileNode[]
  onFileSelect?: (file: FileNode) => void
  selectedFile?: FileNode | null
}

export function FileTree({ files, onFileSelect, selectedFile }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath)
    } else {
      newExpanded.add(folderPath)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileNode = (node: FileNode, path: string = '', depth: number = 0) => {
    const fullPath = path ? `${path}/${node.name}` : node.name
    const isExpanded = expandedFolders.has(fullPath)
    const isSelected = selectedFile?.name === node.name && selectedFile?.type === node.type

    if (node.type === 'folder') {
      return (
        <div key={fullPath}>
          <div
            className={`flex items-center space-x-1 py-1 px-2 cursor-pointer hover:bg-zinc-800/50 rounded text-sm ${
              isSelected ? 'bg-zinc-800/70' : ''
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            onClick={() => toggleFolder(fullPath)}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            )}
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-blue-400" />
            )}
            <span className="text-zinc-300">{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map((child) => renderFileNode(child, fullPath, depth + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        key={fullPath}
        className={`flex items-center space-x-1 py-1 px-2 cursor-pointer hover:bg-zinc-800/50 rounded text-sm ${
          isSelected ? 'bg-zinc-800/70' : ''
        }`}
        style={{ paddingLeft: `${depth * 16 + 24}px` }}
        onClick={() => onFileSelect?.(node)}
      >
        <File className="w-4 h-4 text-zinc-400" />
        <span className="text-zinc-300">{node.name}</span>
      </div>
    )
  }

  return (
    <div className="h-full bg-zinc-900/50 border border-zinc-700/50 rounded-lg overflow-hidden">
      <div className="p-3 border-b border-zinc-700/50">
        <h3 className="text-sm font-medium text-zinc-200">Структура файлов</h3>
      </div>
      <div className="overflow-y-auto h-full p-2">
        {files.length === 0 ? (
          <div className="text-center text-zinc-500 text-sm py-8">
            Сгенерируйте проект для просмотра файлов
          </div>
        ) : (
          files.map((file) => renderFileNode(file))
        )}
      </div>
    </div>
  )
}
