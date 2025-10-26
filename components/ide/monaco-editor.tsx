'use client'

import { useEffect, useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import * as monaco from 'monaco-editor'

interface MonacoEditorProps {
  file?: {
    id: string
    name: string
    path: string
    content: string | null
    mimeType: string | null
  } | null
  onSave: (fileId: string, content: string) => void
}

export function MonacoEditor({ file, onSave }: MonacoEditorProps) {
  const editorRef = useRef<any>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getLanguageFromFileName = (fileName: string, mimeType: string | null) => {
    if (mimeType) {
      if (mimeType.includes('javascript')) return 'javascript'
      if (mimeType.includes('typescript')) return 'typescript'
      if (mimeType.includes('html')) return 'html'
      if (mimeType.includes('css')) return 'css'
      if (mimeType.includes('json')) return 'json'
      if (mimeType.includes('markdown')) return 'markdown'
    }

    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'js': return 'javascript'
      case 'ts': return 'typescript'
      case 'tsx': return 'typescript'
      case 'jsx': return 'javascript'
      case 'html': return 'html'
      case 'css': return 'css'
      case 'scss': return 'scss'
      case 'json': return 'json'
      case 'md': return 'markdown'
      case 'py': return 'python'
      case 'java': return 'java'
      case 'cpp': return 'cpp'
      case 'c': return 'c'
      case 'php': return 'php'
      case 'rb': return 'ruby'
      case 'go': return 'go'
      case 'rs': return 'rust'
      case 'xml': return 'xml'
      case 'yaml': return 'yaml'
      case 'yml': return 'yaml'
      default: return 'plaintext'
    }
  }

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (file) {
        onSave(file.id, editor.getValue())
      }
    })

    // Auto-save on content change
    editor.onDidChangeModelContent(() => {
      if (file) {
        // Clear existing timeout
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current)
        }

        // Set new timeout for auto-save (1 second delay)
        saveTimeoutRef.current = setTimeout(() => {
          onSave(file.id, editor.getValue())
        }, 1000)
      }
    })
  }

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  if (!file) {
    return (
      <div className="h-full bg-zinc-900 flex items-center justify-center">
        <div className="text-center text-zinc-500">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-lg">Select a file to start editing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-zinc-900">
      <ScrollArea className="h-full">
        <Editor
          height="100%"
          language={getLanguageFromFileName(file.name, file.mimeType)}
          value={file.content || ''}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineHeight: 22,
            fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'off',
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            cursorStyle: 'line',
            cursorBlinking: 'blink',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            contextmenu: true,
            mouseWheelZoom: true,
            smoothScrolling: true,
            cursorSmoothCaretAnimation: 'on',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
          }}
        />
      </ScrollArea>
    </div>
  )
}
