// for project types
import { z } from 'zod'

// Schemas
import { UserSchema } from '../api/users/users.schema'

// User
export type User = z.infer<typeof UserSchema>
export type UserPayload = Omit<User, 'userId'>
