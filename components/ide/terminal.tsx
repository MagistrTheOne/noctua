'use client'

import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  X, 
  Terminal as TerminalIcon, 
  Play, 
  Square, 
  Download,
  Upload,
  RefreshCw,
  Settings
} from 'lucide-react'
import { webContainerManager } from '@/lib/webcontainer'

interface TerminalProps {
  onClose: () => void
  projectId: string
  files: Array<{
    id: string
    name: string
    path: string
    content: string | null
    isDirectory: boolean | null
  }>
}

export function Terminal({ onClose, projectId, files }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [currentProcess, setCurrentProcess] = useState<any>(null)
  const [webContainerUrl, setWebContainerUrl] = useState<string>('')

  useEffect(() => {
    initializeTerminal()
    return () => {
      if (xtermRef.current) {
        xtermRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (isInitialized && files.length > 0) {
      syncFilesToWebContainer()
    }
  }, [isInitialized, files])

  const initializeTerminal = async () => {
    if (!terminalRef.current) return

    try {
      // Initialize WebContainer
      await webContainerManager.initialize()
      
      // Initialize xterm.js
      const terminal = new XTerm({
        theme: {
          background: '#18181b',
          foreground: '#f4f4f5',
          cursor: '#3b82f6',
          black: '#27272a',
          red: '#ef4444',
          green: '#22c55e',
          yellow: '#eab308',
          blue: '#3b82f6',
          magenta: '#a855f7',
          cyan: '#06b6d4',
          white: '#f4f4f5',
          brightBlack: '#52525b',
          brightRed: '#f87171',
          brightGreen: '#4ade80',
          brightYellow: '#facc15',
          brightBlue: '#60a5fa',
          brightMagenta: '#c084fc',
          brightCyan: '#22d3ee',
          brightWhite: '#ffffff',
        },
        fontSize: 14,
        fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
        cursorBlink: true,
        cursorStyle: 'block',
        scrollback: 1000,
      })

      const fitAddon = new FitAddon()
      const webLinksAddon = new WebLinksAddon()

      terminal.loadAddon(fitAddon)
      terminal.loadAddon(webLinksAddon)

      terminal.open(terminalRef.current)
      fitAddon.fit()

      xtermRef.current = terminal
      fitAddonRef.current = fitAddon

      // Handle terminal input
      terminal.onData(async (data) => {
        if (currentProcess) {
          currentProcess.input.write(data)
        } else {
          // Handle direct commands
          await handleCommand(data.trim())
        }
      })

      // Welcome message
      terminal.writeln('\x1b[36mNocturide IDE Terminal\x1b[0m')
      terminal.writeln('\x1b[32mWebContainer initialized successfully\x1b[0m')
      terminal.writeln('\x1b[33mType "help" for available commands\x1b[0m')
      terminal.writeln('')

      setIsInitialized(true)

      // Handle window resize
      const handleResize = () => {
        if (fitAddonRef.current) {
          fitAddonRef.current.fit()
        }
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    } catch (error) {
      console.error('Failed to initialize terminal:', error)
      if (terminalRef.current) {
        terminalRef.current.innerHTML = `
          <div class="p-4 text-red-400">
            <h3 class="font-semibold mb-2">Terminal Initialization Failed</h3>
            <p class="text-sm">${error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        `
      }
    }
  }

  const syncFilesToWebContainer = async () => {
    try {
      const fileTree = files.map(file => ({
        name: file.name,
        path: file.path,
        content: file.content || '',
        isDirectory: file.isDirectory || false,
      }))

      await webContainerManager.mountFiles(fileTree)
      
      if (xtermRef.current) {
        xtermRef.current.writeln('\x1b[32m✓ Files synchronized to WebContainer\x1b[0m')
      }
    } catch (error) {
      console.error('Failed to sync files:', error)
      if (xtermRef.current) {
        xtermRef.current.writeln(`\x1b[31m✗ Failed to sync files: ${error}\x1b[0m`)
      }
    }
  }

  const handleCommand = async (command: string) => {
    if (!xtermRef.current) return

    const terminal = xtermRef.current
    terminal.writeln(`\x1b[33m$ ${command}\x1b[0m`)

    try {
      switch (command.toLowerCase()) {
        case 'help':
          terminal.writeln('\x1b[36mAvailable commands:\x1b[0m')
          terminal.writeln('  npm install    - Install dependencies')
          terminal.writeln('  npm run start  - Start the application')
          terminal.writeln('  npm run dev    - Start development server')
          terminal.writeln('  ls             - List files')
          terminal.writeln('  pwd            - Show current directory')
          terminal.writeln('  clear          - Clear terminal')
          terminal.writeln('  help           - Show this help')
          break

        case 'clear':
          terminal.clear()
          break

        case 'npm install':
          await runNpmInstall()
          break

        case 'npm run start':
          await runNpmScript('start')
          break

        case 'npm run dev':
          await runNpmScript('dev')
          break

        case 'ls':
          await runCommand('ls', ['-la'])
          break

        case 'pwd':
          await runCommand('pwd')
          break

        default:
          if (command.startsWith('npm ')) {
            const args = command.split(' ').slice(1)
            await runCommand('npm', args)
          } else if (command.trim()) {
            terminal.writeln(`\x1b[31mCommand not found: ${command}\x1b[0m`)
            terminal.writeln('Type "help" for available commands')
          }
      }
    } catch (error) {
      terminal.writeln(`\x1b[31mError: ${error}\x1b[0m`)
    }
  }

  const runNpmInstall = async () => {
    if (!xtermRef.current) return

    const terminal = xtermRef.current
    terminal.writeln('\x1b[33mInstalling dependencies...\x1b[0m')

    try {
      await webContainerManager.installDependencies()
      terminal.writeln('\x1b[32m✓ Dependencies installed successfully\x1b[0m')
    } catch (error) {
      terminal.writeln(`\x1b[31m✗ Failed to install dependencies: ${error}\x1b[0m`)
    }
  }

  const runNpmScript = async (script: string) => {
    if (!xtermRef.current) return

    const terminal = xtermRef.current
    terminal.writeln(`\x1b[33mRunning npm run ${script}...\x1b[0m`)

    try {
      const process = await webContainerManager.runScript(script)
      setCurrentProcess(process)
      setIsRunning(true)

      // Stream output
      process.output.pipeTo(new WritableStream({
        write(data) {
          terminal.write(data)
        }
      }))

      // Handle process exit
      process.exit.then((code: number) => {
        setCurrentProcess(null)
        setIsRunning(false)
        terminal.writeln(`\x1b[33m\nProcess exited with code ${code}\x1b[0m`)
      })

      // Get WebContainer URL
      const url = await webContainerManager.getUrl()
      setWebContainerUrl(url)
      terminal.writeln(`\x1b[36m\nApplication running at: ${url}\x1b[0m`)

    } catch (error) {
      terminal.writeln(`\x1b[31m✗ Failed to run script: ${error}\x1b[0m`)
    }
  }

  const runCommand = async (command: string, args: string[] = []) => {
    if (!xtermRef.current) return

    try {
      const process = await webContainerManager.runCommand(command, args)
      
      // Stream output
      process.output.pipeTo(new WritableStream({
        write(data) {
          xtermRef.current?.write(data)
        }
      }))

      // Handle process exit
      process.exit.then((code: number) => {
        xtermRef.current?.writeln(`\x1b[33m\nProcess exited with code ${code}\x1b[0m`)
      })

    } catch (error) {
      xtermRef.current?.writeln(`\x1b[31mError: ${error}\x1b[0m`)
    }
  }

  const stopProcess = () => {
    if (currentProcess) {
      currentProcess.kill()
      setCurrentProcess(null)
      setIsRunning(false)
      if (xtermRef.current) {
        xtermRef.current.writeln('\x1b[33m\nProcess stopped\x1b[0m')
      }
    }
  }

  const openInBrowser = () => {
    if (webContainerUrl) {
      window.open(webContainerUrl, '_blank')
    }
  }

  return (
    <div className="glass-sidebar h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-medium text-white">Terminal</span>
          <span className="text-xs text-zinc-500">WebContainers</span>
          {isRunning && (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Running</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {webContainerUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={openInBrowser}
              className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300"
            >
              <Download className="h-3 w-3 mr-1" />
              Open
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => syncFilesToWebContainer()}
            className="h-6 px-2 text-xs text-zinc-400 hover:text-zinc-300"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Sync
          </Button>
          {isRunning ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={stopProcess}
              className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
            >
              <Square className="h-3 w-3" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => runNpmScript('start')}
              className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-300"
            >
              <Play className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-300"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-2">
        <div 
          ref={terminalRef} 
          className="h-full w-full"
          style={{ minHeight: '200px' }}
        />
      </div>

      <div className="p-3 border-t border-zinc-800">
        <div className="text-xs text-zinc-500 text-center">
          WebContainers API • Real Node.js execution in browser
        </div>
      </div>
    </div>
  )
}