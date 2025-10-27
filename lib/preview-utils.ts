/**
 * Утилиты для компиляции проектов в HTML для превью
 */

export interface ProjectFile {
  name: string
  content: string
}

export interface CompiledProject {
  html: string
  hasErrors: boolean
  errors: string[]
}

/**
 * Компилирует проект в единый HTML файл для превью
 */
export function compileProject(files: ProjectFile[]): CompiledProject {
  const errors: string[] = []
  let html = ''
  let css = ''
  let js = ''

  try {
    // Разделяем файлы по типам
    const htmlFiles = files.filter(f => f.name.endsWith('.html'))
    const cssFiles = files.filter(f => f.name.endsWith('.css'))
    const jsFiles = files.filter(f => f.name.endsWith('.js') || f.name.endsWith('.ts'))
    const reactFiles = files.filter(f => f.name.endsWith('.jsx') || f.name.endsWith('.tsx'))

    // Обрабатываем HTML файлы
    if (htmlFiles.length > 0) {
      const mainHtml = htmlFiles.find(f => f.name === 'index.html') || htmlFiles[0]
      html = mainHtml.content
    } else {
      // Создаем базовый HTML если нет HTML файлов
      html = createBaseHTML()
    }

    // Обрабатываем CSS файлы
    cssFiles.forEach(file => {
      css += `\n/* ${file.name} */\n${file.content}\n`
    })

    // Обрабатываем JS файлы
    jsFiles.forEach(file => {
      js += `\n/* ${file.name} */\n${file.content}\n`
    })

    // Обрабатываем React файлы (упрощенная версия)
    if (reactFiles.length > 0) {
      const reactCode = compileReactFiles(reactFiles)
      js += `\n/* React Components */\n${reactCode}\n`
    }

    // Встраиваем CSS и JS в HTML
    const compiledHTML = injectCSSAndJS(html, css, js)

    return {
      html: compiledHTML,
      hasErrors: errors.length > 0,
      errors
    }

  } catch (error) {
    errors.push(`Ошибка компиляции: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`)
    return {
      html: createErrorHTML(errors),
      hasErrors: true,
      errors
    }
  }
}

/**
 * Создает базовый HTML шаблон
 */
function createBaseHTML(): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nocturide Preview</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a1a;
            color: #ffffff;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Nocturide Preview</h1>
        <p>Ваш проект будет отображен здесь</p>
    </div>
</body>
</html>`
}

/**
 * Компилирует React файлы в простой JS (упрощенная версия)
 */
function compileReactFiles(files: ProjectFile[]): string {
  // Это упрощенная версия - в реальном проекте нужен полноценный компилятор
  let reactCode = `
// React Runtime (упрощенная версия)
const React = {
  createElement: (type, props, ...children) => {
    const element = document.createElement(type);
    if (props) {
      Object.keys(props).forEach(key => {
        if (key === 'className') {
          element.className = props[key];
        } else if (key.startsWith('on')) {
          element.addEventListener(key.toLowerCase().substring(2), props[key]);
        } else {
          element.setAttribute(key, props[key]);
        }
      });
    }
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
    return element;
  }
};

const ReactDOM = {
  render: (element, container) => {
    container.innerHTML = '';
    container.appendChild(element);
  }
};
`

  // Добавляем код компонентов
  files.forEach(file => {
    reactCode += `\n/* ${file.name} */\n${file.content}\n`
  })

  return reactCode
}

/**
 * Встраивает CSS и JS в HTML
 */
function injectCSSAndJS(html: string, css: string, js: string): string {
  let result = html

  // Встраиваем CSS
  if (css.trim()) {
    const cssTag = `<style>\n${css}\n</style>`
    if (result.includes('</head>')) {
      result = result.replace('</head>', `${cssTag}\n</head>`)
    } else if (result.includes('<body>')) {
      result = result.replace('<body>', `<head>${cssTag}</head>\n<body>`)
    } else {
      result = `${cssTag}\n${result}`
    }
  }

  // Встраиваем JS
  if (js.trim()) {
    const jsTag = `<script>\n${js}\n</script>`
    if (result.includes('</body>')) {
      result = result.replace('</body>', `${jsTag}\n</body>`)
    } else {
      result = `${result}\n${jsTag}`
    }
  }

  return result
}

/**
 * Создает HTML с ошибками
 */
function createErrorHTML(errors: string[]): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ошибка компиляции - Nocturide</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a1a;
            color: #ff6b6b;
        }
        .error-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ff6b6b;
            border-radius: 8px;
            background: rgba(255, 107, 107, 0.1);
        }
        .error-title {
            color: #ff6b6b;
            margin-bottom: 16px;
        }
        .error-list {
            list-style: none;
            padding: 0;
        }
        .error-item {
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 107, 107, 0.2);
        }
        .error-item:last-child {
            border-bottom: none;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1 class="error-title">Ошибки компиляции</h1>
        <ul class="error-list">
            ${errors.map(error => `<li class="error-item">${error}</li>`).join('')}
        </ul>
    </div>
</body>
</html>`
}

/**
 * Определяет тип проекта по файлам
 */
export function detectProjectType(files: ProjectFile[]): 'html' | 'react' | 'vue' | 'vanilla' {
  const hasReact = files.some(f => f.name.endsWith('.jsx') || f.name.endsWith('.tsx'))
  const hasVue = files.some(f => f.name.endsWith('.vue'))
  const hasHTML = files.some(f => f.name.endsWith('.html'))

  if (hasReact) return 'react'
  if (hasVue) return 'vue'
  if (hasHTML) return 'html'
  return 'vanilla'
}

/**
 * Валидирует файлы проекта
 */
export function validateProjectFiles(files: ProjectFile[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (files.length === 0) {
    errors.push('Проект должен содержать хотя бы один файл')
  }

  files.forEach(file => {
    if (!file.name || file.name.trim() === '') {
      errors.push('Имя файла не может быть пустым')
    }
    
    if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
      errors.push(`Недопустимое имя файла: ${file.name}`)
    }

    if (file.content === undefined) {
      errors.push(`Содержимое файла ${file.name} не определено`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}
