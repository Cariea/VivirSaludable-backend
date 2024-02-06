import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const deleteQuestion = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { questionId } = req.params

	try {
		const { rows } = await pool.query({
			text: `
        DELETE FROM bot_questions
          WHERE specialist_id = $1
            AND question_id = $2
          RETURNING *
      `,
			values: [req.user?.id, questionId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Question not found' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	}catch (error: unknown) {
		return handleControllerError(error, res)
	}
}