import z from 'zod'

export const AddPacientToSpecialistSchema = z.object({
	specialistId: z.string(),
	pacientId: z.string(),
})