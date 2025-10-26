import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { files, projects } from '@/drizzle/schema'
import { updateFileSchema } from '@/lib/validations'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [file] = await db
      .select()
      .from(files)
      .where(eq(files.id, id))

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Verify user owns the project
    const [project] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, file.projectId),
          eq(projects.userId, session.user.id)
        )
      )

    if (!project) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    return NextResponse.json(file)
  } catch (error) {
    console.error('Error fetching file:', error)
    return NextResponse.json(
      { error: 'Failed to fetch file' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateFileSchema.parse(body)

    // Get the file first to verify ownership
    const [existingFile] = await db
      .select()
      .from(files)
      .where(eq(files.id, id))

    if (!existingFile) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Verify user owns the project
    const [project] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, existingFile.projectId),
          eq(projects.userId, session.user.id)
        )
      )

    if (!project) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const [updatedFile] = await db
      .update(files)
      .set({
        ...validatedData,
        size: validatedData.content ? validatedData.content.length : existingFile.size,
        updatedAt: new Date(),
      })
      .where(eq(files.id, id))
      .returning()

    return NextResponse.json(updatedFile)
  } catch (error) {
    console.error('Error updating file:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the file first to verify ownership
    const [existingFile] = await db
      .select()
      .from(files)
      .where(eq(files.id, id))

    if (!existingFile) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Verify user owns the project
    const [project] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, existingFile.projectId),
          eq(projects.userId, session.user.id)
        )
      )

    if (!project) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Delete the file
    await db.delete(files).where(eq(files.id, id))

    return NextResponse.json({ message: 'File deleted successfully' })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}
