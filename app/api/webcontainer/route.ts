import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { webContainerManager } from '@/lib/webcontainer'

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, projectId, files, fileId, content, path } = body

    switch (action) {
      case 'sync-files':
        if (!files || !Array.isArray(files)) {
          return NextResponse.json({ error: 'Files array is required' }, { status: 400 })
        }

        await webContainerManager.mountFiles(files)
        return NextResponse.json({ message: 'Files synced successfully' })

      case 'write-file':
        if (!path || content === undefined) {
          return NextResponse.json({ error: 'Path and content are required' }, { status: 400 })
        }

        await webContainerManager.writeFile(path, content)
        return NextResponse.json({ message: 'File written successfully' })

      case 'read-file':
        if (!path) {
          return NextResponse.json({ error: 'Path is required' }, { status: 400 })
        }

        const fileContent = await webContainerManager.getFileContent(path)
        return NextResponse.json({ content: fileContent })

      case 'install-deps':
        await webContainerManager.installDependencies()
        return NextResponse.json({ message: 'Dependencies installed successfully' })

      case 'run-script':
        const { script } = body
        if (!script) {
          return NextResponse.json({ error: 'Script name is required' }, { status: 400 })
        }

        const process = await webContainerManager.runScript(script)
        const url = await webContainerManager.getUrl()
        
        return NextResponse.json({ 
          message: 'Script started successfully',
          url,
          processId: process.id
        })

      case 'run-command':
        const { command, args = [] } = body
        if (!command) {
          return NextResponse.json({ error: 'Command is required' }, { status: 400 })
        }

        const cmdProcess = await webContainerManager.runCommand(command, args)
        return NextResponse.json({ 
          message: 'Command started successfully',
          processId: cmdProcess.id
        })

      case 'get-url':
        const webContainerUrl = await webContainerManager.getUrl()
        return NextResponse.json({ url: webContainerUrl })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('WebContainer API error:', error)
    return NextResponse.json(
      { error: 'Failed to process WebContainer request' },
      { status: 500 }
    )
  }
}
