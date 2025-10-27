'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'
import { useDemoStore } from '@/lib/store'
import { compileProject, type ProjectFile } from '@/lib/preview-utils'

interface LivePreviewProps {
  className?: string
}

export function LivePreview({ className }: LivePreviewProps) {
  const { projectFiles, selectedFile } = useDemoStore()
  const [compiledHTML, setCompiledHTML] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [lastCompiled, setLastCompiled] = useState<Date | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Автоматическая компиляция при изменении файлов
  useEffect(() => {
    if (projectFiles.length > 0) {
      compileProjectFiles()
    }
  }, [projectFiles])

  const compileProjectFiles = async () => {
    setIsLoading(true)
    setHasErrors(false)
    setErrors([])

    try {
      const projectFilesTyped: ProjectFile[] = projectFiles.map(file => ({
        name: file.name,
        content: file.content
      }))

      const result = compileProject(projectFilesTyped)
      
      setCompiledHTML(result.html)
      setHasErrors(result.hasErrors)
      setErrors(result.errors)
      setLastCompiled(new Date())
      
      // Обновляем iframe
      if (iframeRef.current && iframeRef.current.contentDocument) {
        iframeRef.current.contentDocument.open()
        iframeRef.current.contentDocument.write(result.html)
        iframeRef.current.contentDocument.close()
      }
    } catch (error) {
      setHasErrors(true)
      setErrors([`Ошибка компиляции: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`])
    } finally {
      setIsLoading(false)
    }
  }

  const openInNewTab = () => {
    if (compiledHTML) {
      const newWindow = window.open('', '_blank')
      if (newWindow) {
        newWindow.document.write(compiledHTML)
        newWindow.document.close()
      }
    }
  }

  const getStatusIcon = () => {
    if (isLoading) {
      return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
    }
    if (hasErrors) {
      return <AlertCircle className="w-4 h-4 text-red-400" />
    }
    return <CheckCircle className="w-4 h-4 text-green-400" />
  }

  const getStatusText = () => {
    if (isLoading) return 'Компиляция...'
    if (hasErrors) return 'Ошибки компиляции'
    return 'Готово'
  }

  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg ${className}`}>
      {/* Заголовок с кнопками */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">Превью проекта</h3>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm text-gray-300">{getStatusText()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {lastCompiled && (
            <span className="text-xs text-gray-400">
              Обновлено: {lastCompiled.toLocaleTimeString()}
            </span>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={compileProjectFiles}
            disabled={isLoading || projectFiles.length === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
          <Button
            size="sm"
            onClick={openInNewTab}
            disabled={!compiledHTML || hasErrors}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Открыть
          </Button>
        </div>
      </div>

      {/* Ошибки компиляции */}
      {hasErrors && errors.length > 0 && (
        <div className="p-4 bg-red-900/20 border-b border-red-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <h4 className="font-medium text-red-400">Ошибки компиляции</h4>
          </div>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-300">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Превью */}
      <div className="relative h-full min-h-[400px]">
        {projectFiles.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-8 h-8 opacity-50" />
              </div>
              <h4 className="text-lg font-medium mb-2">Нет файлов для превью</h4>
              <p className="text-sm">Добавьте файлы в проект, чтобы увидеть превью</p>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            srcDoc={compiledHTML}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            title="Project Preview"
            onLoad={() => {
              // Дополнительная обработка загрузки iframe
            }}
          />
        )}
      </div>

      {/* Информация о проекте */}
      {projectFiles.length > 0 && (
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>Файлов: {projectFiles.length}</span>
              <span>Выбран: {selectedFile || 'Нет'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Статус:</span>
              <div className="flex items-center gap-1">
                {getStatusIcon()}
                <span className={hasErrors ? 'text-red-400' : 'text-green-400'}>
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
