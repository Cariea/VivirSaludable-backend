import { z } from 'zod'

export const MealSchema = z.object({
	pacient_id: z
		.string(),
	description: z
		.string(),
	mealImage: z
		.string(),
	wasSatisfied: z
		.boolean(),
	indicateHour: z
		.string(),
	pica: z
		.boolean()
})

export const AddMealSchema = MealSchema.omit({ pacient_id: true })
export const UpdateMealSchema = MealSchema.omit({ pacient_id: true })