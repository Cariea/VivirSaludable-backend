import { z } from 'zod'

export const LoginSchema = z.object({
	userId: z
		.string()
		.min(1, 'Debe indicar una cedula')
		.max(16, 'El nombre no puede superar los 16 carácteres'),
	password: z
		.string()
		.min(1, 'Es necesario ingresar una contraseña')
		.max(64, 'El nombre debe ser menor a 64 carácteres')
})
