import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getMe = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		console.log(req.user)
		const { rows } = await pool.query({
			text: `
        SELECT user_id, name, email, phone, created_at
          FROM pacients
          WHERE user_id = $1
          AND status = true
      `,
			values: [req.user?.id]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
