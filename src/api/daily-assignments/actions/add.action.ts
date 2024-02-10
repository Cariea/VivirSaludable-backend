import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addDailyAssignment = async (
	req: ExtendedRequest, 
	res: Response,
): Promise<Response | undefined> => {
	try {
		const { indicationId, specialistId, completed } = req.body
		const response = await pool.query({
			text: `
        INSERT INTO daily_assing (
          specialist_id,
          indication_id,
          pacient_id,
          completed
        ) 
        VALUES ($1, $2, $3, $4)
        RETURNING
          specialist_id,
          indication_id,
          pacient_id,
          date_assing,
          completed
      `,
			values: [specialistId, indicationId, req.user?.id, completed]
		})
		return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}