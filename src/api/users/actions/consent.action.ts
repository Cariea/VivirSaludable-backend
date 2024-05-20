import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'

export const updateConsent = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {

		await pool.query({
			text: `
        UPDATE users
        SET first_login = $1
        WHERE user_id = $2
      `,
			values: [true, req.user?.id]
		})

		return res.status(STATUS.OK).json({ message: 'Consentimiento actualizado' })
	} catch (error: unknown) {
		console.log(error)
		return  handleControllerError(error, res)
	}
}