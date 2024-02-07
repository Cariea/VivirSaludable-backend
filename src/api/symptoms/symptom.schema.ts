import { z } from 'zod'

export const SymptomSchema = z.object({
	pacientId: z
		.string(),
	name: z
		.string(),
	description: z
		.string(),
	whenAppeared: z
		.string()
})