'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { 
  Save, 
  Play, 
  Share2, 
  Settings, 
  Terminal,
  User,
  LogOut 
} from 'lucide-react'
import { useState } from 'react'

interface NavigationBarProps {
  project: {
    id: string
    name: string
    description: string | null
  }
  user: {
    id: string
    email: string
    name: string | null
    image: string | null
  }
  activeFile?: {
    id: string
    name: string
    path: string
  } | null
}

export function NavigationBar({ project, user, activeFile }: NavigationBarProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [projectName, setProjectName] = useState(project.name)

  const handleSave = () => {
    // Save logic will be implemented
    console.log('Saving project...')
  }

  const handleRun = () => {
    // Run logic will be implemented
    console.log('Running project...')
  }

  const handleShare = () => {
    // Share logic will be implemented
    console.log('Sharing project...')
  }

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/sign-out', { method: 'POST' })
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="glass-navbar h-16 flex items-center justify-between px-4 border-b border-zinc-800">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-xl font-bold text-white">Nocturide</span>
        </div>
        
        <div className="h-6 w-px bg-zinc-700" />
        
        {isEditingName ? (
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditingName(false)
              }
            }}
            className="bg-transparent text-white font-medium px-2 py-1 rounded border border-zinc-600 focus:border-zinc-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditingName(true)}
            className="text-white font-medium hover:text-zinc-300 transition-colors"
          >
            {projectName}
          </button>
        )}
        
        {activeFile && (
          <>
            <div className="h-6 w-px bg-zinc-700" />
            <span className="text-zinc-400 text-sm">
              {activeFile.path}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className="text-zinc-300 hover:text-white hover:bg-zinc-800"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRun}
          className="text-zinc-300 hover:text-white hover:bg-zinc-800"
        >
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="text-zinc-300 hover:text-white hover:bg-zinc-800"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-300 hover:text-white hover:bg-zinc-800"
        >
          <Terminal className="h-4 w-4 mr-2" />
          Terminal
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-300 hover:text-white hover:bg-zinc-800"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || ''} alt={user.name || user.email} />
                <AvatarFallback>
                  {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {user.name && <p className="font-medium">{user.name}</p>}
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
