'use client'

import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeViewerProps {
  content: string
  language?: string
  filename?: string
}

export function CodeViewer({ content, language = 'typescript', filename }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Простая подсветка синтаксиса для основных языков
  const highlightCode = (code: string, lang: string) => {
    if (lang === 'typescript' || lang === 'javascript') {
      return code
        .replace(/(\bconst\b|\blet\b|\bvar\b|\bfunction\b|\breturn\b|\bif\b|\belse\b|\bfor\b|\bwhile\b)/g, '<span class="text-blue-400">$1</span>')
        .replace(/(["'].*?["'])/g, '<span class="text-green-400">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-zinc-500">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-zinc-500">$1</span>')
    }
    
    if (lang === 'css') {
      return code
        .replace(/([.#]?[a-zA-Z][\w-]*)\s*{/g, '<span class="text-blue-400">$1</span> {')
        .replace(/([a-zA-Z-]+)\s*:/g, '<span class="text-green-400">$1</span>:')
        .replace(/(["'].*?["'])/g, '<span class="text-yellow-400">$1</span>')
    }

    if (lang === 'html') {
      return code
        .replace(/(&lt;\/?[^&gt;]+&gt;)/g, '<span class="text-blue-400">$1</span>')
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-zinc-500">$1</span>')
    }

    return code
  }

  return (
    <div className="h-full bg-zinc-900/50 border border-zinc-700/50 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-zinc-700/50">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-zinc-200">Просмотр кода</h3>
          {filename && (
            <span className="text-xs text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded">
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>Скопировано</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Копировать</span>
            </>
          )}
        </button>
      </div>
      
      <div className="h-full overflow-auto">
        {content ? (
          <pre className="p-4 text-sm text-zinc-300 leading-relaxed">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightCode(content, language)
              }}
            />
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
            Выберите файл для просмотра кода
          </div>
        )}
      </div>
    </div>
  )
}
