import { z } from 'zod'

export const IngredientSchema = z.object({
	pacientId: z
		.string(),
	mealId: z
		.number(),
	ingredientType: z
		.enum(['vegetal','fruta','proteina','lacteo','cereal','carbohidrato','otro']),
	name: z
		.string(),
	volume: z
		.number()
})

export const AddIngredientSchema = IngredientSchema.omit({pacientId: true, mealId: true})
export const UpdateIngredientSchema = IngredientSchema.omit({pacientId: true, mealId: true})