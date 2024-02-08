import { z } from 'zod'

export const AssignedSchema = z.object({
	specialistId: z.string(),
	indicationId: z.number(),
	pacientId: z.string(),
	completed: z.boolean()
})

export const AddAssigmentSchema = AssignedSchema.omit({ specialistId: true, completed: true })
export const UpdatedAssignedSchema = AssignedSchema.omit({ specialistId: true, indicationId: true, pacientId: true })

