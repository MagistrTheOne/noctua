'use client'

import { useState, useEffect } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { NavigationBar } from './navigation-bar'
import { LeftSidebar } from './left-sidebar'
import { MonacoEditor } from './monaco-editor'
import { RightSidebar } from './right-sidebar'
import { Terminal } from './terminal'
import { webContainerManager } from '@/lib/webcontainer'

interface IDEProps {
  project: {
    id: string
    name: string
    description: string | null
    userId: string
    isPublic: boolean
    settings: any
    createdAt: Date
    updatedAt: Date
  }
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
  user: {
    id: string
    email: string
    name: string | null
    image: string | null
  }
}

export function IDE({ project, files, user }: IDEProps) {
  const [activeFileId, setActiveFileId] = useState<string | null>(
    files.find(f => f.name === 'index.js')?.id || files[0]?.id || null
  )
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isWebContainerReady, setIsWebContainerReady] = useState(false)

  const activeFile = files.find(f => f.id === activeFileId)

  // Initialize WebContainer when component mounts
  useEffect(() => {
    const initializeWebContainer = async () => {
      try {
        await webContainerManager.initialize()
        setIsWebContainerReady(true)
        console.log('WebContainer ready for terminal')
      } catch (error) {
        console.error('Failed to initialize WebContainer:', error)
      }
    }

    initializeWebContainer()
  }, [])

  const handleFileSave = async (fileId: string, content: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        console.log('File saved successfully')
        
        // Sync to WebContainer if terminal is open
        if (isTerminalOpen && isWebContainerReady) {
          const file = files.find(f => f.id === fileId)
          if (file) {
            await webContainerManager.writeFile(file.path, content)
            console.log('File synced to WebContainer')
          }
        }
      } else {
        console.error('Failed to save file')
      }
    } catch (error) {
      console.error('Error saving file:', error)
    }
  }

  const handleFileSelect = (fileId: string) => {
    setActiveFileId(fileId)
  }

  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen)
  }

  return (
    <div className="h-screen bg-zinc-950 flex flex-col">
      <NavigationBar 
        project={project} 
        user={user}
        activeFile={activeFile}
        onToggleTerminal={toggleTerminal}
        isTerminalOpen={isTerminalOpen}
        isWebContainerReady={isWebContainerReady}
      />
      
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={15} maxSize={30}>
            <LeftSidebar 
              files={files}
              activeFileId={activeFileId}
              onFileSelect={handleFileSelect}
              projectId={project.id}
            />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-zinc-700 transition-colors" />
          
          <Panel defaultSize={60} minSize={40}>
            <MonacoEditor 
              file={activeFile}
              onSave={handleFileSave}
            />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-zinc-700 transition-colors" />
          
          <Panel defaultSize={20} minSize={15} maxSize={30}>
            <RightSidebar />
          </Panel>
        </PanelGroup>
      </div>

      {isTerminalOpen && (
        <PanelGroup direction="vertical">
          <PanelResizeHandle className="h-1 bg-zinc-800 hover:bg-zinc-700 transition-colors" />
          <Panel defaultSize={25} minSize={15} maxSize={50}>
            <Terminal 
              onClose={() => setIsTerminalOpen(false)}
              projectId={project.id}
              files={files}
            />
          </Panel>
        </PanelGroup>
      )}
    </div>
  )
}
