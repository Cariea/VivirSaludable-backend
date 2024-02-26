import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { generateToken } from '../_utils/generate-token'
import bcrypt from 'bcrypt'
export const logIn = async (
	req: Request,
	res: Response
): Promise<Response | undefined> => {
	try {
		const { userId, password } = req.body
		const { rows: userResponse } = await pool.query({
			text: `
        SELECT
          user_id,
          name,
          role,
          password
        FROM users
        WHERE
          user_id = $1
          and status = true
      `,
			values: [userId]
		})
		if (userResponse.length > 0) {
			const isPasswordCorrect = await bcrypt.compare(password, userResponse[0].password)
			if (isPasswordCorrect) {
				const token = await generateToken(userResponse[0].user_id, userResponse[0].name, userResponse[0].role)
				return res.status(STATUS.OK).json(token)
			}
		}

		const { rows: asistentsResponse } = await pool.query({
			text: `
        SELECT
          user_id,
          name,
          role,
          password
        FROM asistents
        WHERE
          user_id = $1
      `,
			values: [userId]
		})

		if (asistentsResponse.length > 0) {
			const isPasswordCorrect = await bcrypt.compare(password, asistentsResponse[0].password)
			if (isPasswordCorrect) {
				const token = await generateToken(asistentsResponse[0].user_id,asistentsResponse[0].name, asistentsResponse[0].role)
				return res.status(STATUS.OK).json(token)
			}
		}

		return res.status(STATUS.UNAUTHORIZED).json({ message: 'Id o Contraseña Incorrecta' })
	} catch (error: unknown) {
		console.log(error)
		return handleControllerError(error, res)
	}
}
