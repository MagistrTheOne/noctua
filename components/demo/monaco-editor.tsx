'use client'

import { Editor } from '@monaco-editor/react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Play, Download, Copy, Eye, EyeOff } from 'lucide-react'

interface MonacoCodeEditorProps {
  files: Array<{
    name: string
    content: string
  }>
  selectedFile: string | null
  onFileSelect: (fileName: string) => void
  onCodeChange?: (fileName: string, content: string) => void
  readOnly?: boolean
}

export function MonacoCodeEditor({ 
  files, 
  selectedFile, 
  onFileSelect, 
  onCodeChange,
  readOnly = false 
}: MonacoCodeEditorProps) {
  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'light'>('vs-dark')
  const [showPreview, setShowPreview] = useState(false)
  const [copiedFile, setCopiedFile] = useState<string | null>(null)

  const currentFile = files.find(f => f.name === selectedFile)
  const currentContent = currentFile?.content || ''

  // Определяем язык по расширению файла
  const getLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    
    switch (extension) {
      case 'tsx':
      case 'ts':
        return 'typescript'
      case 'jsx':
      case 'js':
        return 'javascript'
      case 'css':
        return 'css'
      case 'scss':
      case 'sass':
        return 'scss'
      case 'html':
        return 'html'
      case 'json':
        return 'json'
      case 'md':
        return 'markdown'
      case 'py':
        return 'python'
      case 'java':
        return 'java'
      case 'cpp':
      case 'c':
        return 'cpp'
      case 'go':
        return 'go'
      case 'rs':
        return 'rust'
      case 'php':
        return 'php'
      case 'rb':
        return 'ruby'
      case 'sql':
        return 'sql'
      case 'yaml':
      case 'yml':
        return 'yaml'
      case 'xml':
        return 'xml'
      case 'sh':
        return 'shell'
      case 'dockerfile':
        return 'dockerfile'
      default:
        return 'plaintext'
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && selectedFile && onCodeChange) {
      onCodeChange(selectedFile, value)
    }
  }

  const copyToClipboard = async (fileName: string) => {
    const file = files.find(f => f.name === fileName)
    if (file) {
      try {
        await navigator.clipboard.writeText(file.content)
        setCopiedFile(fileName)
        setTimeout(() => setCopiedFile(null), 2000)
      } catch (error) {
        console.error('Failed to copy:', error)
      }
    }
  }

  const downloadFile = (fileName: string) => {
    const file = files.find(f => f.name === fileName)
    if (file) {
      const blob = new Blob([file.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const downloadAllFiles = () => {
    files.forEach(file => {
      setTimeout(() => downloadFile(file.name), 100)
    })
  }

  return (
    <div className="space-y-4">
      {/* File Tabs */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-zinc-100 text-sm">Файлы проекта</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-700/50"
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPreview ? 'Скрыть' : 'Превью'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadAllFiles}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-700/50"
              >
                <Download className="h-4 w-4 mr-1" />
                Скачать все
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center space-x-1">
                <button
                  onClick={() => onFileSelect(file.name)}
                  className={`px-3 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center space-x-2 ${
                    selectedFile === file.name
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50'
                      : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'
                  }`}
                >
                  <FileText className="h-3 w-3" />
                  <span>{file.name}</span>
                  <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-500">
                    {getLanguage(file.name)}
                  </Badge>
                </button>
                
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(file.name)}
                    className="h-6 w-6 p-0 hover:bg-zinc-700/50"
                  >
                    <Copy className={`h-3 w-3 ${copiedFile === file.name ? 'text-green-400' : 'text-zinc-500'}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadFile(file.name)}
                    className="h-6 w-6 p-0 hover:bg-zinc-700/50"
                  >
                    <Download className="h-3 w-3 text-zinc-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monaco Editor */}
      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="h-[500px] border border-zinc-700/50 rounded-lg overflow-hidden">
            <Editor
              height="100%"
              language={selectedFile ? getLanguage(selectedFile) : 'typescript'}
              value={currentContent}
              onChange={handleEditorChange}
              theme={editorTheme}
              options={{
                readOnly: readOnly,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineHeight: 22,
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                automaticLayout: true,
                wordWrap: 'on',
                lineNumbers: 'on',
                folding: true,
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true
                },
                suggest: {
                  showKeywords: true,
                  showSnippets: true,
                  showFunctions: true,
                  showConstructors: true,
                  showFields: true,
                  showVariables: true,
                  showClasses: true,
                  showStructs: true,
                  showInterfaces: true,
                  showModules: true,
                  showProperties: true,
                  showEvents: true,
                  showOperators: true,
                  showUnits: true,
                  showValues: true,
                  showConstants: true,
                  showEnums: true,
                  showEnumMembers: true,
                  showColors: true,
                  showFiles: true,
                  showReferences: true,
                  showFolders: true,
                  showTypeParameters: true,
                  showIssues: true,
                  showUsers: true,
                  showWords: true
                },
                quickSuggestions: {
                  other: true,
                  comments: true,
                  strings: true
                },
                parameterHints: { enabled: true },
                hover: { enabled: true },
                contextmenu: true,
                mouseWheelZoom: true,
                smoothScrolling: true,
                cursorBlinking: 'blink',
                cursorSmoothCaretAnimation: true,
                renderWhitespace: 'selection',
                renderControlCharacters: true,
                renderIndentGuides: true,
                highlightActiveIndentGuide: true,
                rulers: [80, 120],
                colorDecorators: true,
                lightbulb: { enabled: true },
                codeLens: true,
                foldingStrategy: 'indentation'
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      {showPreview && currentFile && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-zinc-100 text-sm flex items-center space-x-2">
              <Play className="h-4 w-4 text-green-400" />
              <span>Live Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-900 rounded-lg border border-zinc-700/50 p-4 min-h-[200px]">
              <div className="text-zinc-500 text-sm mb-2">
                Превью для файла: {currentFile.name}
              </div>
              <div className="text-zinc-300 text-sm">
                <pre className="whitespace-pre-wrap overflow-auto max-h-[150px]">
                  {currentContent}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
