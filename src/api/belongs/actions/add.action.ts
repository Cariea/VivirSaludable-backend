import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addBelong = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { pacientId, programId } = req.body

	try {
		const { rows } = await pool.query({
			text: `
        INSERT INTO belongs (asistent_id, pacient_id, program_id)
          VALUES ($1, $2, $3)
          RETURNING *
      `,
			values: [req.user?.id, pacientId, programId]
		})

		return res.status(STATUS.CREATED).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}