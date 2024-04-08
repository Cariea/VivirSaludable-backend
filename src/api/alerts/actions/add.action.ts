import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addAlert = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const {
		userReceptor,
		alert,
		type
	} = req.body
	try {
		await pool.query({
			text: `
      INSERT INTO alerts (
        user_id,
        user_receptor,
        alert,
        severity,
        type
      ) 
      VALUES ($1, $2, $3, $4, $5)

      `,
			values: [req.user?.id, userReceptor, alert, '1', type]
		})
		return res.status(STATUS.OK).json({ message: 'Alerta creada' })
	} catch (error) {
		console.log(error)
		return handleControllerError(error, res)
	}
}