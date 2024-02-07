import { z } from 'zod'

export const IngredientSchema = z.object({
	pacientId: z
		.string(),
	mealId: z
		.number(),
	ingredientType: z
		.enum(['solid', 'liquid']),
	name: z
		.string(),
	volume: z
		.number()
})