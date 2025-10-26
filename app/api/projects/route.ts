import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { projects, files } from '@/drizzle/schema'
import { createProjectSchema } from '@/lib/validations'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, session.user.id))
      .orderBy(projects.updatedAt)

    return NextResponse.json(userProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
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
    const validatedData = createProjectSchema.parse(body)

    const [newProject] = await db
      .insert(projects)
      .values({
        ...validatedData,
        userId: session.user.id,
      })
      .returning()

    // Create default files
    const defaultFiles = [
      {
        name: 'package.json',
        path: '/package.json',
        content: JSON.stringify({
          name: validatedData.name.toLowerCase().replace(/\s+/g, '-'),
          version: '1.0.0',
          description: validatedData.description || '',
          main: 'index.js',
          scripts: {
            start: 'node index.js',
            dev: 'node index.js',
          },
          dependencies: {},
        }, null, 2),
        projectId: newProject.id,
        isDirectory: false,
        mimeType: 'application/json',
      },
      {
        name: 'index.js',
        path: '/index.js',
        content: `// Welcome to ${validatedData.name}!
console.log('Hello, World!');

// Your code starts here...
`,
        projectId: newProject.id,
        isDirectory: false,
        mimeType: 'text/javascript',
      },
    ]

    await db.insert(files).values(defaultFiles)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
