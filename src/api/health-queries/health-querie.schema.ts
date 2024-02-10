import { z } from 'zod'

export const HealtQuerySchema = z.object({
	specialistId: z.string(),
	pacientId: z.string(),
	quoteDate: z.string(),
	quoteAtention: z.boolean(),
	quoteReview: z.string()
})

export const AddHealtQuerySchema = HealtQuerySchema.omit({ specialistId: true, quoteAtention: true, quoteReview: true})
export const UpdateHealtQuerySchema = HealtQuerySchema.omit({ specialistId: true, pacientId: true, quoteDate: true})