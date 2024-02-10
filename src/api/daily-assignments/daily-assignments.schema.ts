import { z } from 'zod'

export const DailyAssignmentSchema = z.object({
	specialistId: z.string(),
	indicationId: z.number(),
	pacientId: z.string(),
	dateAssing: z.string(),
	completed: z.boolean().default(false),
})

export const AddDailyAssignmentSchema = DailyAssignmentSchema.omit({ dateAssing: true })