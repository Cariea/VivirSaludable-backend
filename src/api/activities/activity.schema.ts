import { z } from 'zod'

export const ActivitySchema = z.object({
	pacientId: z
		.string(),
	name: z
		.string()
		.min(3)
		.max(255),
	hour: z
		.string(),
	time: z
		.number()
		.positive(),
	distance: z
		.number()
		.positive(),
	weight: z
		.number()
		.positive(),
	repetitions: z
		.number()
		.positive(),
	description: z
		.string()
		.min(3)
		.max(255)
})

export const AddActivitySchema = ActivitySchema.omit({ pacientId: true })
export const UpdateActivitySchema = ActivitySchema.omit({ pacientId: true })
  