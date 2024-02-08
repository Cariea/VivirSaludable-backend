import { z } from 'zod'

export const PostProcedureSymptomSchema = z.object({
	pacientId: z.string(),
	temperature: z.number(),
	redness: z.boolean(),
	swelling: z.boolean(),
	secretions: z.boolean(),
	pain: z.boolean()
})

export const AddPostProcedureSymptomSchema = PostProcedureSymptomSchema.omit({ pacientId: true })