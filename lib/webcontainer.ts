import { WebContainer } from '@webcontainer/api'

export class WebContainerManager {
  private webcontainer: WebContainer | null = null
  private isInitialized = false

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      this.webcontainer = await WebContainer.boot()
      this.isInitialized = true
      console.log('WebContainer initialized successfully')
    } catch (error) {
      console.error('Failed to initialize WebContainer:', error)
      throw error
    }
  }

  async mountFiles(files: Array<{
    name: string
    path: string
    content: string
    isDirectory: boolean
  }>): Promise<void> {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized')
    }

    // Build file tree structure
    const fileTree: any = {}
    
    files.forEach(file => {
      const pathParts = file.path.split('/').filter(Boolean)
      let current = fileTree
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i]
        if (!current[part]) {
          current[part] = {}
        }
        current = current[part]
      }
      
      const fileName = pathParts[pathParts.length - 1]
      if (file.isDirectory) {
        current[fileName] = {}
      } else {
        current[fileName] = {
          file: {
            contents: file.content
          }
        }
      }
    })

    await this.webcontainer.mount(fileTree)
    console.log('Files mounted to WebContainer')
  }

  async installDependencies(): Promise<void> {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized')
    }

    const installProcess = await this.webcontainer.spawn('npm', ['install'])
    
    return new Promise((resolve, reject) => {
      installProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log('npm install:', data)
        }
      }))

      installProcess.exit.then(code => {
        if (code === 0) {
          console.log('Dependencies installed successfully')
          resolve()
        } else {
          reject(new Error(`npm install failed with code ${code}`))
        }
      })
    })
  }

  async runScript(script: string): Promise<any> {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized')
    }

    const process = await this.webcontainer.spawn('npm', ['run', script])
    return process
  }

  async runCommand(command: string, args: string[] = []): Promise<any> {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized')
    }

    const process = await this.webcontainer.spawn(command, args)
    return process
  }

  async getFileContent(path: string): Promise<string> {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized')
    }

    try {
      const file = await this.webcontainer.fs.readFile(path, 'utf-8')
      return file
    } catch (error) {
      console.error(`Failed to read file ${path}:`, error)
      throw error
    }
  }

  async writeFile(path: string, content: string): Promise<void> {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized')
    }

    try {
      await this.webcontainer.fs.writeFile(path, content)
    } catch (error) {
      console.error(`Failed to write file ${path}:`, error)
      throw error
    }
  }

  async getPort(): Promise<number> {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized')
    }

    return this.webcontainer.port
  }

  async getUrl(): Promise<string> {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized')
    }

    return this.webcontainer.url
  }

  isReady(): boolean {
    return this.isInitialized && this.webcontainer !== null
  }
}

export const webContainerManager = new WebContainerManager()
