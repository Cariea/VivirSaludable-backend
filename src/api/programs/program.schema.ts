import { z } from 'zod'

export const ProgramSchema = z.object({
	name: z
		.string()
		.min(1, 'Debe indicar un nombre de programa')
		.max(64, 'El nombre de programa no puede superar los 64 carácteres'),
	description: z
		.string()
		.min(1, 'Debe indicar una descripción de programa')
		.max(128, 'La descripción de programa no puede superar los 128 carácteres')
})