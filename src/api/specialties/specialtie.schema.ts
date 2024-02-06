import { z } from 'zod'

export const SpecialtieSchema = z.object({
	name: z
		.string()
		.min(1, 'Name is too short')
})