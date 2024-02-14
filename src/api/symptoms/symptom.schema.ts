import { z } from 'zod'

export const SymptomSchema = z.object({
	pacientId: z
		.string(),
	specialistId: z
		.string(),
	name: z
		.string(),
	description: z
		.string(),
	whenAppeared: z
		.string()
})

export const addSymptomSchema = SymptomSchema.omit({ pacientId: true })
export const updateSymptomSchema = SymptomSchema.omit({ pacientId: true })