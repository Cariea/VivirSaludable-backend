import { z } from 'zod'

export const MealSchema = z.object({
	pacient_id: z
		.string(),
	description: z
		.string(),
	wasSatisfied: z
		.enum(['true', 'false']),
	indicateHour: z
		.string(),
	pica: z
		.enum(['true', 'false'])
})

export const AddMealSchema = MealSchema.omit({ pacient_id: true })
export const UpdateMealSchema = MealSchema.omit({ pacient_id: true })