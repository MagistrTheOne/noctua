// WebContainer API client for frontend
export class WebContainerClient {
  private baseUrl = '/api/webcontainer'

  async syncFiles(files: Array<{
    name: string
    path: string
    content: string
    isDirectory: boolean
  }>) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'sync-files',
        files,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to sync files')
    }

    return response.json()
  }

  async writeFile(path: string, content: string) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'write-file',
        path,
        content,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to write file')
    }

    return response.json()
  }

  async readFile(path: string) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'read-file',
        path,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to read file')
    }

    const data = await response.json()
    return data.content
  }

  async installDependencies() {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'install-deps',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to install dependencies')
    }

    return response.json()
  }

  async runScript(script: string) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'run-script',
        script,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to run script')
    }

    return response.json()
  }

  async runCommand(command: string, args: string[] = []) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'run-command',
        command,
        args,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to run command')
    }

    return response.json()
  }

  async getUrl() {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'get-url',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get WebContainer URL')
    }

    const data = await response.json()
    return data.url
  }
}

export const webContainerClient = new WebContainerClient()
