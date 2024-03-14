import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'

export const updateDailyAssignmentStatus = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response | undefined> => {
	try {
		const { recordId } = req.params
		const { completed } = req.body
		await pool.query({
			text: `
        UPDATE daily_assing
        SET completed = $1
        WHERE record_id = $2
      `,
			values: [completed, recordId]
		})
		return res.status(STATUS.OK).json({status: STATUS.OK, message: 'Daily assignment updated'})
	}
	catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	} 
}
