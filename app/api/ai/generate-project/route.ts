import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { projects, files } from '@/drizzle/schema'
import { gigaChatAPI } from '@/lib/gigachat'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Generate project structure using GigaChat API
    const projectStructure = await gigaChatAPI.generateProject(prompt)

    // Create project in database
    const [newProject] = await db
      .insert(projects)
      .values({
        name: projectStructure.name || `Project ${Date.now()}`,
        description: prompt,
        userId: session.user.id,
        settings: projectStructure.settings || {},
      })
      .returning()

    // Create files in database
    if (projectStructure.files && projectStructure.files.length > 0) {
      const filesToInsert = projectStructure.files.map(file => ({
        id: nanoid(),
        name: file.name,
        path: file.path,
        content: file.content,
        isDirectory: false,
        projectId: newProject.id,
        size: file.content.length,
        mimeType: file.mimeType || 'text/plain',
      }))

      await db.insert(files).values(filesToInsert)
    }

    return NextResponse.json({
      projectId: newProject.id,
      message: 'Project generated successfully',
    })

  } catch (error) {
    console.error('Project generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate project' },
      { status: 500 }
    )
  }
}
