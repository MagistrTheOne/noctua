import { z } from 'zod'

// User validation schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  image: z.string().url().optional(),
})

export const updateUserSchema = createUserSchema.partial()

// Project validation schemas
export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  isPublic: z.boolean().default(false),
  settings: z.object({
    framework: z.string().optional(),
    language: z.string().optional(),
    template: z.string().optional(),
  }).optional(),
})

export const updateProjectSchema = createProjectSchema.partial()

// File validation schemas
export const createFileSchema = z.object({
  name: z.string().min(1, 'File name is required').max(255, 'File name too long'),
  path: z.string().min(1, 'File path is required'),
  content: z.string().default(''),
  isDirectory: z.boolean().default(false),
  parentId: z.string().uuid().optional(),
})

export const updateFileSchema = z.object({
  name: z.string().min(1, 'File name is required').max(255, 'File name too long').optional(),
  content: z.string().optional(),
  isDirectory: z.boolean().optional(),
})

// API response schemas
export const projectResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  userId: z.string(),
  isPublic: z.boolean(),
  settings: z.record(z.any()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const fileResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  path: z.string(),
  content: z.string(),
  isDirectory: z.boolean(),
  projectId: z.string().uuid(),
  parentId: z.string().uuid().nullable(),
  size: z.number(),
  mimeType: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Error response schema
export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  code: z.string().optional(),
})

// Type exports
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type CreateFileInput = z.infer<typeof createFileSchema>
export type UpdateFileInput = z.infer<typeof updateFileSchema>
export type ProjectResponse = z.infer<typeof projectResponseSchema>
export type FileResponse = z.infer<typeof fileResponseSchema>
export type ErrorResponse = z.infer<typeof errorResponseSchema>
