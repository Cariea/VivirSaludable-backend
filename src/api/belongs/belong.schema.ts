import { z } from 'zod'

export const belongSchema = z.object({
	asistent_id: z.string(),
	pacient_id: z.string(),
	program_id: z.number(),
	entry_date: z.string()
})
