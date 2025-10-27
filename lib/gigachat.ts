// GigaChat API integration
import fs from 'fs'
import path from 'path'

export class GigaChatAPI {
  private accessToken: string | null = null
  private tokenExpiresAt: number = 0

  constructor() {
    // Настройка сертификатов Минцифры для Node.js
    this.setupCertificates()
  }

  private setupCertificates() {
    try {
      const certPath = path.resolve(process.cwd(), 'certs', 'russian_trusted_root_ca_pem.crt')
      
      if (fs.existsSync(certPath)) {
        process.env.NODE_EXTRA_CA_CERTS = certPath
      }
    } catch (error) {
      console.error('❌ Error setting up certificates:', error)
    }
  }

  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      console.log('Using existing GigaChat token')
      return this.accessToken
    }

    console.log('Requesting new GigaChat access token...')
    console.log('OAuth URL:', process.env.GIGACHAT_OAUTH_URL)
    console.log('Authorization Key:', process.env.GIGACHAT_AUTHORIZATION_KEY ? 'Present' : 'Missing')
    console.log('Scope:', process.env.GIGACHAT_SCOPE)

    try {
      const oauthUrl = process.env.GIGACHAT_OAUTH_URL!
      console.log('Attempting OAuth request to:', oauthUrl)
      
      const response = await fetch(oauthUrl, {
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
        // Добавляем timeout и игнорируем SSL ошибки для тестирования
        signal: AbortSignal.timeout(10000), // 10 секунд timeout
      })

      console.log('OAuth response status:', response.status)
      console.log('OAuth response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error('OAuth error response:', errorText)
        throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('OAuth response data:', data)
      
      this.accessToken = data.access_token
      this.tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 60000 // 1 minute buffer
      
      if (!this.accessToken) {
        throw new Error('No access token received from GigaChat')
      }
      
      console.log('Successfully obtained GigaChat token, expires in:', data.expires_in, 'seconds')
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
      const fullUrl = `${process.env.GIGACHAT_API_URL}${endpoint}`
      
      console.log('Making GigaChat request to:', fullUrl)
      console.log('Request body:', JSON.stringify(body, null, 2))
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      console.log('GigaChat response status:', response.status)
      console.log('GigaChat response headers:', Object.fromEntries(response.headers.entries()))

      // Если 401 и это первый запрос, обновляем токен и повторяем
      if (response.status === 401 && retryCount === 0) {
        console.log('Token expired, refreshing...')
        this.accessToken = null // Сбрасываем токен
        this.tokenExpiresAt = 0
        return this.makeGigaChatRequest(endpoint, body, retryCount + 1)
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error('GigaChat API error response:', errorText)
        throw new Error(`GigaChat API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('GigaChat response data:', data)
      return data
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

  /**
   * Улучшает промпт пользователя для более детальной генерации
   */
  async improvePrompt(prompt: string): Promise<string> {
    try {
      const data = await this.makeGigaChatRequest('/api/v1/chat/completions', {
        model: 'GigaChat',
        messages: [
          {
            role: 'system',
            content: `Ты эксперт по созданию технических заданий для разработки ПО. 
Твоя задача - улучшить и расширить промпт пользователя для более детальной генерации проекта.

Правила улучшения:
1. Добавь конкретные технологии и фреймворки
2. Укажи архитектуру и структуру проекта
3. Добавь требования к UI/UX
4. Включи функциональные требования
5. Укажи тип приложения (веб, мобильное, десктоп)
6. Добавь требования к производительности и масштабируемости
7. Сохрани оригинальную идею пользователя

Ответь ТОЛЬКО улучшенным промптом, без дополнительных объяснений.`
          },
          {
            role: 'user',
            content: `Улучши этот промпт для более детальной генерации проекта: "${prompt}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })

      return data.choices[0]?.message?.content || prompt
    } catch (error) {
      console.error('Error improving prompt:', error)
      return prompt // Возвращаем оригинальный промпт при ошибке
    }
  }

  /**
   * Получает список доступных моделей GigaChat
   */
  async getModels(): Promise<any> {
    try {
      const token = await this.getAccessToken()
      const fullUrl = `${process.env.GIGACHAT_API_URL}/api/v1/models`
      
      console.log('Getting GigaChat models from:', fullUrl)
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      console.log('Models response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Models error response:', errorText)
        throw new Error(`Failed to get models: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Models response data:', data)
      return data
    } catch (error) {
      console.error('Error getting GigaChat models:', error)
      throw error
    }
  }
}

export const gigaChatAPI = new GigaChatAPI()
