import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { files, projects } from '@/drizzle/schema'
import { createFileSchema } from '@/lib/validations'
import { eq, and } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    // Verify user owns the project
    const [project] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.userId, session.user.id)
        )
      )

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const projectFiles = await db
      .select()
      .from(files)
      .where(eq(files.projectId, projectId))
      .orderBy(files.path)

    return NextResponse.json(projectFiles)
  } catch (error) {
    console.error('Error fetching files:', error)
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createFileSchema.parse(body)

    // Verify user owns the project
    const [project] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, validatedData.projectId),
          eq(projects.userId, session.user.id)
        )
      )

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Check if file already exists at this path
    const [existingFile] = await db
      .select()
      .from(files)
      .where(
        and(
          eq(files.projectId, validatedData.projectId),
          eq(files.path, validatedData.path)
        )
      )

    if (existingFile) {
      return NextResponse.json(
        { error: 'File already exists at this path' },
        { status: 409 }
      )
    }

    const [newFile] = await db
      .insert(files)
      .values({
        ...validatedData,
        size: validatedData.content.length,
      })
      .returning()

    return NextResponse.json(newFile, { status: 201 })
  } catch (error) {
    console.error('Error creating file:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create file' },
      { status: 500 }
    )
  }
}
