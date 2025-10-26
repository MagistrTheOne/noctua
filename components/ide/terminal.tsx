'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Terminal as TerminalIcon, Play, Square } from 'lucide-react'

interface TerminalProps {
  onClose: () => void
}

export function Terminal({ onClose }: TerminalProps) {
  const mockLogs = [
    { id: 1, type: 'info', message: 'Nocturide IDE Terminal v1.0.0', timestamp: '14:32:15' },
    { id: 2, type: 'info', message: 'Ready for commands...', timestamp: '14:32:15' },
    { id: 3, type: 'command', message: 'npm install express', timestamp: '14:32:18' },
    { id: 4, type: 'success', message: 'added 1 package, and audited 2 packages in 1s', timestamp: '14:32:19' },
    { id: 5, type: 'info', message: 'found 0 vulnerabilities', timestamp: '14:32:19' },
    { id: 6, type: 'command', message: 'node index.js', timestamp: '14:32:22' },
    { id: 7, type: 'output', message: 'Hello, World!', timestamp: '14:32:22' },
    { id: 8, type: 'output', message: 'Server running on port 3000', timestamp: '14:32:22' },
  ]

  const getLogColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-blue-400'
      case 'success': return 'text-green-400'
      case 'error': return 'text-red-400'
      case 'warning': return 'text-yellow-400'
      case 'output': return 'text-zinc-300'
      default: return 'text-zinc-400'
    }
  }

  return (
    <div className="glass-sidebar h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-medium text-white">Terminal</span>
          <span className="text-xs text-zinc-500">Phase 3 - WebContainers</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Play className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Square className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-1 font-mono text-sm">
          {mockLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-2">
              <span className="text-zinc-600 text-xs mt-0.5 min-w-[60px]">
                {log.timestamp}
              </span>
              <span className={`${getLogColor(log.type)} flex-1`}>
                {log.type === 'command' && '$ '}
                {log.message}
              </span>
            </div>
          ))}
          
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-zinc-600 text-xs">14:32:25</span>
            <span className="text-blue-400">$</span>
            <span className="text-zinc-300 animate-pulse">|</span>
          </div>
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-zinc-800">
        <div className="text-xs text-zinc-500 text-center">
          Real terminal with WebContainers API coming in Phase 3
        </div>
      </div>
    </div>
  )
}
