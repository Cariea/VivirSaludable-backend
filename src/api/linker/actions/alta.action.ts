import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'

export const darAlta = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { pacientId } = req.query
		if (!pacientId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'pacientId is required' })
		}
		const { rows } = await pool.query({
			text: `
        UPDATE assings
        SET alta = $3
        WHERE pacient_id = $1
        AND specialist_id = $2
        `,
			values: [pacientId, req.user?.id,true]
		})
		console.log(rows)
		return res.status(STATUS.OK).json(rows[0])
	}catch (error: unknown) {
		console.log(error)
		return handleControllerError(error,res)
	}
}