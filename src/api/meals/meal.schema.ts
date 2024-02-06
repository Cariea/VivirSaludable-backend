import { z } from 'zod'

export const MealSchema = z.object({
	pacient_id: z
		.string(),
	description: z
		.string(),
	imageUrl: z
		.string(),
	wasSatisfied: z
		.boolean(),
	indicateHour: z
		.string(),
	pica: z
		.boolean()
})