import { z } from 'zod'

export const SecretionSchema = z.object({
	pacientId: z.string(),
	abundant: z.boolean(),
	yellow: z.boolean(),
	blood: z.boolean(),
	smelly: z.boolean(),
})

export const PutSecretionSchema = SecretionSchema.omit({ pacientId: true })
