'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, File, FileText, Code, Image, Trash2, Edit2, FolderOpen } from 'lucide-react'
import { useDemoStore } from '@/lib/store'

interface FileManagerProps {
  className?: string
}

export function FileManager({ className }: FileManagerProps) {
  const { projectFiles, selectedFile, setSelectedFile, addFile, deleteFile, renameFile } = useDemoStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [newFileContent, setNewFileContent] = useState('')
  const [fileToRename, setFileToRename] = useState('')
  const [newFileNameValue, setNewFileNameValue] = useState('')

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    
    switch (extension) {
      case 'html':
        return <FileText className="w-4 h-4 text-orange-500" />
      case 'css':
        return <FileText className="w-4 h-4 text-blue-500" />
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <Code className="w-4 h-4 text-yellow-500" />
      case 'json':
        return <FileText className="w-4 h-4 text-green-500" />
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return <Image className="w-4 h-4 text-purple-500" />
      default:
        return <File className="w-4 h-4 text-gray-500" />
    }
  }

  const handleAddFile = () => {
    if (!newFileName.trim()) return
    
    // Проверяем расширение файла
    const extension = newFileName.split('.').pop()?.toLowerCase()
    let content = newFileContent
    
    if (!content && extension) {
      // Генерируем базовое содержимое в зависимости от типа файла
      switch (extension) {
        case 'html':
          content = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Новая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
</body>
</html>`
          break
        case 'css':
          content = `/* Стили для ${newFileName} */
body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
}`
          break
        case 'js':
          content = `// JavaScript код для ${newFileName}
console.log('Привет, мир!');`
          break
        case 'jsx':
        case 'tsx':
          content = `import React from 'react';

const ${newFileName.split('.')[0]} = () => {
  return (
    <div>
      <h1>Новый компонент</h1>
    </div>
  );
};

export default ${newFileName.split('.')[0]};`
          break
        case 'json':
          content = `{
  "name": "${newFileName.split('.')[0]}",
  "version": "1.0.0",
  "description": ""
}`
          break
        default:
          content = `// Файл: ${newFileName}`
      }
    }
    
    addFile(newFileName, content)
    setNewFileName('')
    setNewFileContent('')
    setIsAddDialogOpen(false)
  }

  const handleRenameFile = () => {
    if (!newFileNameValue.trim() || newFileNameValue === fileToRename) return
    
    renameFile(fileToRename, newFileNameValue)
    setFileToRename('')
    setNewFileNameValue('')
    setIsRenameDialogOpen(false)
  }

  const handleDeleteFile = (fileName: string) => {
    deleteFile(fileName)
  }

  const openRenameDialog = (fileName: string) => {
    setFileToRename(fileName)
    setNewFileNameValue(fileName)
    setIsRenameDialogOpen(true)
  }

  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Файлы проекта</h3>
          <span className="text-sm text-gray-400">({projectFiles.length})</span>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-1" />
              Добавить файл
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Добавить новый файл</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Имя файла
                </label>
                <Input
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="index.html"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Содержимое (опционально)
                </label>
                <textarea
                  value={newFileContent}
                  onChange={(e) => setNewFileContent(e.target.value)}
                  placeholder="Содержимое файла..."
                  rows={6}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleAddFile}
                  disabled={!newFileName.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Создать
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-1">
        {projectFiles.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <File className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Нет файлов в проекте</p>
            <p className="text-sm">Добавьте файл, чтобы начать работу</p>
          </div>
        ) : (
          projectFiles.map((file) => (
            <div
              key={file.name}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors group ${
                selectedFile === file.name
                  ? 'bg-blue-600/20 border border-blue-500/30'
                  : 'hover:bg-gray-800/50'
              }`}
              onClick={() => setSelectedFile(file.name)}
            >
              {getFileIcon(file.name)}
              <span className="flex-1 text-sm text-gray-300 truncate">
                {file.name}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    openRenameDialog(file.name)
                  }}
                  className="h-6 w-6 p-0 hover:bg-gray-700"
                >
                  <Edit2 className="w-3 h-3 text-gray-400" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                      className="h-6 w-6 p-0 hover:bg-red-600/20"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-800 border-gray-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Удалить файл
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        Вы уверены, что хотите удалить файл "{file.name}"? 
                        Это действие нельзя отменить.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        Отмена
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteFile(file.name)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Диалог переименования */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Переименовать файл</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Новое имя файла
              </label>
              <Input
                value={newFileNameValue}
                onChange={(e) => setNewFileNameValue(e.target.value)}
                placeholder="index.html"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsRenameDialogOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Отмена
              </Button>
              <Button
                onClick={handleRenameFile}
                disabled={!newFileNameValue.trim() || newFileNameValue === fileToRename}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Переименовать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
