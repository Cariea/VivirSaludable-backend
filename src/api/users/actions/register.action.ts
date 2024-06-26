import { Response } from 'express'
import bcrypt from 'bcrypt'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { AUTH_ROUNDS } from '../../../config'
import { ExtendedRequest } from '../../../middlewares/auth'
import { QueryResult } from 'pg'
import { UserRole } from '../../../utils/roles.enum'
import { sendMail } from '../../../utils/send-mail-service'

export const signUp = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response | undefined> => {
	try {
		const { userId, email, name, role, phone, specialityId, programId, address } = req.body
		let response: QueryResult = { rows: [], rowCount: 0, command: 'algo paso', oid: 0, fields: [] }

		const { rows } = await pool.query({
			text: `
        SELECT EXISTS 
        (SELECT 1 FROM users WHERE user_id = $1);
      `,
			values: [userId]
		})
		if (rows[0].exists === true) {
			throw new StatusError({
				message: 'Ya existe una cuenta con esta cédula',
				statusCode: STATUS.BAD_REQUEST
			})
		}
		const code = Math.floor(Math.random() * 900000) + 100000
		const password = await bcrypt.hash(String(code), Number(AUTH_ROUNDS))
		//const password = await bcrypt.hash('vs123', Number(AUTH_ROUNDS))


		if (role === UserRole.PACIENTE) {
			if(!programId){
				return res.status(STATUS.BAD_REQUEST).json({message: 'Se requiere el id del programa'})
			}
			response = await pool.query({
				text: `
          INSERT INTO pacients (
            user_id,
            name,
            email,
            password,
            asistent_id,
            phone,
            address
            )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING
            user_id,
            email,
            name
        `,
				values: [userId, name, email, password, req.user?.id, phone, address]
			})

			await pool.query({
				text: `
        INSERT INTO belongs (asistent_id, pacient_id, program_id)
        VALUES ($1, $2, $3)
        `,
				values: [req.user?.id, userId, programId]
			})

			sendMail(email, '¡Bienvenido al Programa Vivir Saludable!',`
      ¡Nos emociona enormemente darte la bienvenida a nuestra familia de Vivir Saludable! Sabemos que tomar la decisión de embarcarte en un viaje hacia una vida más saludable no es fácil, pero estás dando el primer y más importante paso.
        <br/><br/>
      En el Programa<b> Vivir Saludable <b/>, entendemos que la pérdida de peso es un desafío que requiere<b> compromiso, dedicación y apoyo constante<b/>. Estamos aquí para acompañarte en cada paso del camino y brindarte las herramientas y el aliento que necesitas para alcanzar tus objetivos de salud.
      <br/><br/>
      Recuerda, este programa es mucho más que solo perder peso. Se trata de adoptar hábitos saludables que te permitan vivir una vida plena y feliz.<b> Cada pequeño cambio que hagas hoy te acerca un paso más a convertirte en la mejor versión de ti mismo.<b/>
      <br/><br/>
      Queremos que sepas que no estás solo en este viaje. Nuestro equipo multidisciplinario de profesionales de la salud está aquí para brindarte el apoyo y la orientación que necesitas en cada etapa. Desde nutricionistas hasta entrenadores personales, todos estamos comprometidos a ayudarte a alcanzar tus metas y sentirte mejor contigo mismo.
      <br/><br/>
      Recuerda,<b> el camino hacia una vida más saludable puede tener sus altibajos, pero cada desafío que enfrentes te hará más fuerte y te acercará un paso más a tus sueños<b/>. Mantén la vista en el objetivo y nunca te rindas, porque eres más fuerte de lo que crees y mereces vivir la vida plenamente.
      <br/><br/>
      Gracias por confiar en nosotros para acompañarte en este viaje hacia una vida más saludable. Estamos emocionados de ser parte de tu transformación y estamos aquí para ti en cada paso del camino.
      <br/><br/>
      <b>¡Bienvenido a Vivir Saludable, donde juntos construiremos un futuro más saludable y feliz!</b>

      Con cariño,

      <b>Programa Vivir Saludable</b>

      <h1>Su usuario es: ${userId}</h1>
      <h1>Su contraseña es: ${code}</h1>
      Ingrese a través de: <a href="https://vivir-saludable.quitogastro.com/">Vivir Saludable</a>`)
		}
		if (role === UserRole.ESPECIALISTA) {
			if(!specialityId){
				return res.status(STATUS.BAD_REQUEST).json({message: 'Se requiere el id de la especialidad'})
			}
			response = await pool.query({
				text: `
          INSERT INTO specialists (
            user_id,
            name,
            email,
            password,
            speciality_id,
            asistent_id,
            phone,
            address
            )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING
            user_id,
            email,
            name
        `,
				values: [userId, name, email, password, specialityId, req.user?.id, phone, address]
			})
			sendMail(email, `¡Bienvenido al Programa Vivir Saludable!`,`
      <h1>Su usuario es: ${userId}</h1>
      <h1>Su contraseña es: ${code}</h1>
      Ingrese a través de: <a href="https://vivir-saludable.quitogastro.com/">Vivir Saludable</a>`)
		}

		return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
