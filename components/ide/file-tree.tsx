'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  File, 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface FileTreeProps {
  files: Array<{
    id: string
    name: string
    path: string
    content: string
    isDirectory: boolean
    projectId: string
    parentId: string | null
    size: number
    mimeType: string | null
    createdAt: Date
    updatedAt: Date
  }>
  activeFileId: string | null
  onFileSelect: (fileId: string) => void
}

export function FileTree({ files, activeFileId, onFileSelect }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  // Build tree structure
  const buildTree = (parentId: string | null = null): Array<any> => {
    return files
      .filter(file => file.parentId === parentId)
      .map(file => ({
        ...file,
        children: file.isDirectory ? buildTree(file.id) : [],
      }))
      .sort((a, b) => {
        // Directories first, then files
        if (a.isDirectory && !b.isDirectory) return -1
        if (!a.isDirectory && b.isDirectory) return 1
        return a.name.localeCompare(b.name)
      })
  }

  const tree = buildTree()

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const getFileIcon = (file: any) => {
    if (file.isDirectory) {
      return expandedFolders.has(file.id) ? 
        <FolderOpen className="h-4 w-4 text-blue-400" /> : 
        <Folder className="h-4 w-4 text-blue-400" />
    }

    const extension = file.name.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'js':
      case 'jsx':
        return <File className="h-4 w-4 text-yellow-400" />
      case 'ts':
      case 'tsx':
        return <File className="h-4 w-4 text-blue-500" />
      case 'html':
        return <File className="h-4 w-4 text-orange-400" />
      case 'css':
      case 'scss':
        return <File className="h-4 w-4 text-pink-400" />
      case 'json':
        return <File className="h-4 w-4 text-green-400" />
      case 'md':
        return <File className="h-4 w-4 text-gray-400" />
      case 'py':
        return <File className="h-4 w-4 text-green-500" />
      case 'java':
        return <File className="h-4 w-4 text-red-500" />
      default:
        return <File className="h-4 w-4 text-zinc-400" />
    }
  }

  const handleContextMenu = (e: React.MouseEvent, file: any) => {
    e.preventDefault()
    e.stopPropagation()
    // Context menu logic will be implemented
  }

  const handleRename = (fileId: string) => {
    // Rename logic will be implemented
    console.log('Rename file:', fileId)
  }

  const handleDelete = async (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        const response = await fetch(`/api/files/${fileId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          // File deleted successfully
          console.log('File deleted')
        }
      } catch (error) {
        console.error('Error deleting file:', error)
      }
    }
  }

  const renderTreeNode = (file: any, depth: number = 0) => {
    const isExpanded = expandedFolders.has(file.id)
    const isActive = activeFileId === file.id

    return (
      <div key={file.id}>
        <div
          className={`flex items-center space-x-1 py-1 px-2 rounded cursor-pointer group hover:bg-zinc-800 ${
            isActive ? 'bg-zinc-800 text-white' : 'text-zinc-300'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (file.isDirectory) {
              toggleFolder(file.id)
            } else {
              onFileSelect(file.id)
            }
          }}
          onContextMenu={(e) => handleContextMenu(e, file)}
        >
          {file.isDirectory && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                toggleFolder(file.id)
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-zinc-400" />
              ) : (
                <ChevronRight className="h-3 w-3 text-zinc-400" />
              )}
            </Button>
          )}
          
          {!file.isDirectory && <div className="w-4" />}
          
          {getFileIcon(file)}
          
          <span className="text-sm flex-1 truncate">{file.name}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-zinc-700"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleRename(file.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(file.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {file.isDirectory && isExpanded && (
          <div>
            {file.children.map((child: any) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  if (tree.length === 0) {
    return (
      <div className="text-center text-zinc-500 text-sm py-8">
        No files found
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {tree.map(file => renderTreeNode(file))}
    </div>
  )
}
