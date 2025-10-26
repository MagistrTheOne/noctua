'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileTree } from './file-tree'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Files, 
  FolderOpen, 
  Search, 
  Plus,
  FolderPlus,
  FilePlus
} from 'lucide-react'

interface LeftSidebarProps {
  files: Array<{
    id: string
    name: string
    path: string
    content: string | null
    isDirectory: boolean | null
    projectId: string
    parentId: string | null
    size: number | null
    mimeType: string | null
    createdAt: Date
    updatedAt: Date
  }>
  activeFileId: string | null
  onFileSelect: (fileId: string) => void
  projectId: string
}

export function LeftSidebar({ files, activeFileId, onFileSelect, projectId }: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreatingFile, setIsCreatingFile] = useState(false)
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [newFileName, setNewFileName] = useState('')

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.path.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateFile = async () => {
    if (!newFileName.trim()) return

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newFileName,
          path: `/${newFileName}`,
          content: '',
          projectId,
          isDirectory: false,
        }),
      })

      if (response.ok) {
        const newFile = await response.json()
        onFileSelect(newFile.id)
        setIsCreatingFile(false)
        setNewFileName('')
      }
    } catch (error) {
      console.error('Error creating file:', error)
    }
  }

  const handleCreateFolder = async () => {
    if (!newFileName.trim()) return

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newFileName,
          path: `/${newFileName}`,
          content: '',
          projectId,
          isDirectory: true,
        }),
      })

      if (response.ok) {
        setIsCreatingFolder(false)
        setNewFileName('')
      }
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  return (
    <div className="glass-sidebar h-full flex flex-col">
      <Tabs defaultValue="files" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="files" className="text-xs">
            <Files className="h-3 w-3 mr-1" />
            Files
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-xs">
            <FolderOpen className="h-3 w-3 mr-1" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="search" className="text-xs">
            <Search className="h-3 w-3 mr-1" />
            Search
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="flex-1 flex flex-col m-2 mt-0">
          <div className="flex items-center space-x-1 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCreatingFile(true)}
              className="h-6 px-2 text-xs"
            >
              <FilePlus className="h-3 w-3 mr-1" />
              File
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCreatingFolder(true)}
              className="h-6 px-2 text-xs"
            >
              <FolderPlus className="h-3 w-3 mr-1" />
              Folder
            </Button>
          </div>

          {isCreatingFile && (
            <div className="flex items-center space-x-1 mb-2">
              <Input
                placeholder="filename.js"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateFile()
                  } else if (e.key === 'Escape') {
                    setIsCreatingFile(false)
                    setNewFileName('')
                  }
                }}
                className="h-6 text-xs"
                autoFocus
              />
            </div>
          )}

          {isCreatingFolder && (
            <div className="flex items-center space-x-1 mb-2">
              <Input
                placeholder="folder-name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateFolder()
                  } else if (e.key === 'Escape') {
                    setIsCreatingFolder(false)
                    setNewFileName('')
                  }
                }}
                className="h-6 text-xs"
                autoFocus
              />
            </div>
          )}

          <ScrollArea className="flex-1">
            <FileTree
              files={filteredFiles}
              activeFileId={activeFileId}
              onFileSelect={onFileSelect}
            />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="projects" className="flex-1 m-2 mt-0">
          <div className="text-center text-zinc-500 text-sm py-8">
            Projects list coming soon...
          </div>
        </TabsContent>

        <TabsContent value="search" className="flex-1 m-2 mt-0">
          <div className="space-y-2">
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-xs"
            />
            <ScrollArea className="flex-1">
              <FileTree
                files={filteredFiles}
                activeFileId={activeFileId}
                onFileSelect={onFileSelect}
              />
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
