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

export const signUp = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response | undefined> => {
	try {
		const { userId, email, name, role, phone, specialityId, programId } = req.body
		let { password } = req.body

		if(!userId || !email || !name || !role || !phone || !password){
			return res.status(STATUS.BAD_REQUEST).json({message: 'Datos incompletos en el formulario'})
		}
		const registerData = [userId, password]

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

		password = await bcrypt.hash(registerData[1], Number(AUTH_ROUNDS))

		if (role === 'pacient') {
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
            phone
            )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING
            user_id,
            email,
            name
        `,
				values: [userId, name, email, password, req.user?.id, phone]
			})

			await pool.query({
				text: `
        INSERT INTO belongs (asistent_id, pacient_id, program_id)
        VALUES ($1, $2, $3)
        `,
				values: [req.user?.id, userId, programId]
			})
		}
		if (role === 'specialist') {
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
            phone
            )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING
            user_id,
            email,
            name
        `,
				values: [userId, name, email, password, specialityId, phone, req.user?.id]
			})
		}

		return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
