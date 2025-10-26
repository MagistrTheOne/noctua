'use client'

import { useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { NavigationBar } from './navigation-bar'
import { LeftSidebar } from './left-sidebar'
import { MonacoEditor } from './monaco-editor'
import { RightSidebar } from './right-sidebar'
import { Terminal } from './terminal'

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

  const activeFile = files.find(f => f.id === activeFileId)

  return (
    <div className="h-screen bg-zinc-950 flex flex-col">
      <NavigationBar 
        project={project} 
        user={user}
        activeFile={activeFile}
      />
      
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={15} maxSize={30}>
            <LeftSidebar 
              files={files}
              activeFileId={activeFileId}
              onFileSelect={setActiveFileId}
              projectId={project.id}
            />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-zinc-700 transition-colors" />
          
          <Panel defaultSize={60} minSize={40}>
            <MonacoEditor 
              file={activeFile}
              onSave={(fileId, content) => {
                // Auto-save logic will be implemented
                console.log('Saving file:', fileId, content)
              }}
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
            />
          </Panel>
        </PanelGroup>
      )}
    </div>
  )
}
