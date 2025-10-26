import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { projects, files } from '@/drizzle/schema'
import { eq, and } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { IDE } from '@/components/ide/ide'

interface WorkspacePageProps {
  params: Promise<{ projectId: string }>
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { projectId } = await params

  const session = await auth.api.getSession({
    headers: {
      cookie: '',
    },
  })

  if (!session) {
    redirect('/auth/signin')
  }

  // Fetch project and files
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
    redirect('/')
  }

  const projectFiles = await db
    .select()
    .from(files)
    .where(eq(files.projectId, projectId))
    .orderBy(files.path)

  return (
    <IDE 
      project={project} 
      files={projectFiles} 
      user={session.user}
    />
  )
}
