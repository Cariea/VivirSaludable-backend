import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addQuestion = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { question, answer } = req.body

	try {
		const { rows } = await pool.query({
			text: `
        INSERT INTO bot_questions (specialist_id, question, answer)
          VALUES ($1, $2, $3)
          RETURNING *
      `,
			values: [req.user?.id, question, answer]
		})

		return res.status(STATUS.CREATED).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}