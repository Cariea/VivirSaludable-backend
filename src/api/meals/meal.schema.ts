import { z } from 'zod'

export const MealSchema = z.object({
	pacientId: z
		.string(),
	description: z
		.string(),
	wasSatisfied: z
		.enum(['true', 'false']),
	indicateHour: z
		.string()
		.optional(),
	pica: z
		.enum(['true', 'false'])
})

export const AddMealSchema = MealSchema.omit({ pacientId: true })
export const UpdateMealSchema = MealSchema.omit({ pacientId: true })