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
		const { userId, email, name, role, phone, specialityId } = req.body
		let { password } = req.body
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
		}
		if (role === 'specialist') {
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
		return handleControllerError(error, res)
	}
}
