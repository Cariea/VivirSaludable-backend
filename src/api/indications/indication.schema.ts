import { z } from 'zod'

export const IndicationSchema = z.object({
	description: z
		.string()
		.min(1, 'Debe indicar una descripción')
		.max(256, 'La descripción no puede superar los 256 carácteres')
})