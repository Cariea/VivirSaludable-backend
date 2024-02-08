import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addAssigment = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { pacientId, indicationId } = req.body

	try {
		const { rows } = await pool.query({
			text: `
        INSERT INTO assigned (specialist_id, pacient_id, indication_id)
          VALUES ($1, $2, $3)
          RETURNING *
      `,
			values: [req.user?.id, pacientId, indicationId]
		})

		return res.status(STATUS.CREATED).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}