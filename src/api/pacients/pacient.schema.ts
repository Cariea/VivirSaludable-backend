import { z } from 'zod'

export const PacientSchema = z.object({
	userId: z
		.string()
		.min(1, 'Debe indicar una cedula')
		.max(16, 'El nombre no puede superar los 16 carácteres'),
	name: z
		.string()
		.min(1, 'Debe indicar un nombre')
		.max(64, 'El nombre no puede superar los 64 carácteres'),
	email: z
		.string()
		.min(1, 'Debe indicar un correo electrónico')
		.max(128, 'El email no puede superar los 128 carácteres')
		.email(),
	phone: z
		.string()
		.max(16, 'El número de teléfono no puede superar los 16 carácteres')
		.optional(),
	status: z
		.boolean()
})
