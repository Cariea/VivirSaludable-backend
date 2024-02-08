import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const deleteBelong = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { pacientId } = req.params

	try {
		const { rows } = await pool.query({
			text: `
        DELETE FROM belongs
          WHERE asistent_id = $1
            AND pacient_id = $2
          RETURNING *
      `,
			values: [req.user?.id, pacientId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Belong not found' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	}catch (error: unknown) {
		return handleControllerError(error, res)
	}
}