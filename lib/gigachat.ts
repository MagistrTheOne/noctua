// GigaChat API integration
export class GigaChatAPI {
  private accessToken: string | null = null
  private tokenExpiresAt: number = 0

  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken
    }

    try {
      const response = await fetch(process.env.GIGACHAT_OAUTH_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'RqUID': crypto.randomUUID(),
          'Authorization': `Basic ${process.env.GIGACHAT_AUTHORIZATION_KEY}`,
        },
        body: new URLSearchParams({
          scope: process.env.GIGACHAT_SCOPE!,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`)
      }

      const data = await response.json()
      this.accessToken = data.access_token
      this.tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 60000 // 1 minute buffer
      
      if (!this.accessToken) {
        throw new Error('No access token received from GigaChat')
      }
      
      return this.accessToken
    } catch (error) {
      console.error('Error getting GigaChat access token:', error)
      throw error
    }
  }

  /**
   * Выполняет запрос к GigaChat API с retry логикой для токена
   */
  private async makeGigaChatRequest(endpoint: string, body: any, retryCount = 0): Promise<any> {
    try {
      const token = await this.getAccessToken()
      
      const response = await fetch(`${process.env.GIGACHAT_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      // Если 401 и это первый запрос, обновляем токен и повторяем
      if (response.status === 401 && retryCount === 0) {
        console.log('Token expired, refreshing...')
        this.accessToken = null // Сбрасываем токен
        this.tokenExpiresAt = 0
        return this.makeGigaChatRequest(endpoint, body, retryCount + 1)
      }

      if (!response.ok) {
        throw new Error(`GigaChat API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error making GigaChat request:', error)
      throw error
    }
  }

  async sendMessage(message: string, context?: string): Promise<string> {
    try {
      const data = await this.makeGigaChatRequest('/api/v1/chat/completions', {
        model: 'GigaChat',
        messages: [
          {
            role: 'system',
            content: `You are an AI coding assistant integrated into Nocturide IDE. 
            Help users with their code, provide explanations, suggestions, and assistance.
            ${context ? `Current file context: ${context}` : ''}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      })

      return data.choices[0]?.message?.content || 'No response from AI'
    } catch (error) {
      console.error('Error sending message to GigaChat:', error)
      throw error
    }
  }

  async explainCode(code: string, language: string): Promise<string> {
    return this.sendMessage(
      `Please explain this ${language} code:\n\n${code}`,
      code
    )
  }

  async refactorCode(code: string, language: string, instructions?: string): Promise<string> {
    const prompt = instructions 
      ? `Please refactor this ${language} code according to these instructions: ${instructions}\n\nCode:\n${code}`
      : `Please refactor this ${language} code to make it cleaner and more maintainable:\n\n${code}`
    
    return this.sendMessage(prompt, code)
  }

  async generateCode(description: string, language: string): Promise<string> {
    return this.sendMessage(
      `Please generate ${language} code for: ${description}`,
    )
  }

  async fixCode(code: string, language: string, error?: string): Promise<string> {
    const prompt = error
      ? `Please fix this ${language} code that has the following error: ${error}\n\nCode:\n${code}`
      : `Please review and fix any issues in this ${language} code:\n\n${code}`

    return this.sendMessage(prompt, code)
  }

  async generateProject(prompt: string): Promise<{
    name: string
    settings: any
    files: Array<{
      name: string
      path: string
      content: string
      mimeType: string
    }>
  }> {
    try {
      const data = await this.makeGigaChatRequest('/api/v1/chat/completions', {
        model: 'GigaChat',
        messages: [
          {
            role: 'system',
            content: `You are an expert full-stack developer. Generate complete, production-ready projects based on user descriptions.

Create a detailed project structure with:
1. Project name (descriptive, kebab-case)
2. Framework and technology stack
3. Complete file structure with all necessary files
4. Working code for each file
5. Proper dependencies and configuration
6. README and documentation

Format your response as JSON:
{
  "name": "project-name",
  "settings": {
    "framework": "react",
    "language": "typescript",
    "template": "vite"
  },
  "files": [
    {
      "name": "package.json",
      "path": "/package.json",
      "content": "{\\"name\\": \\"project-name\\", ...}",
      "mimeType": "application/json"
    },
    {
      "name": "README.md",
      "path": "/README.md",
      "content": "# Project Name\\n...",
      "mimeType": "text/markdown"
    }
  ]
}

Generate complete, working code. Include all necessary dependencies, configuration files, and implementation. Make it production-ready.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000,
      })

      const content = data.choices[0]?.message?.content

      if (!content) {
        throw new Error('No content received from AI')
      }

      // Parse JSON response - GigaChat может вернуть markdown с JSON внутри
      try {
        let jsonContent = content
        
        // Если ответ обернут в markdown код блоки, извлекаем JSON
        const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
        if (codeBlockMatch) {
          jsonContent = codeBlockMatch[1].trim()
        }
        
        // Если есть другие markdown элементы, пытаемся найти JSON
        if (!jsonContent.startsWith('{')) {
          const jsonMatch = content.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            jsonContent = jsonMatch[0]
          }
        }
        
        const projectData = JSON.parse(jsonContent)
        return {
          name: projectData.name || 'generated-project',
          settings: projectData.settings || {},
          files: projectData.files || [],
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', content)
        console.error('Parse error:', parseError)
        
        // Fallback: создаем базовый проект
        return {
          name: 'generated-project',
          settings: {
            framework: 'react',
            language: 'typescript',
            template: 'vite'
          },
          files: [
            {
              name: 'README.md',
              path: '/README.md',
              content: `# Generated Project\n\n${prompt}\n\nThis project was generated by Nocturide AI.`,
              mimeType: 'text/markdown'
            }
          ]
        }
      }
    } catch (error) {
      console.error('Error generating project with GigaChat:', error)
      throw error
    }
  }
}

export const gigaChatAPI = new GigaChatAPI()
