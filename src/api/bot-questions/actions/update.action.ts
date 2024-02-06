import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const updateQuestion = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { questionId } = req.params
	const { question, answer } = req.body

	try {
		const { rows } = await pool.query({
			text: `
        UPDATE bot_questions
          SET question = $1, answer = $2
          WHERE specialist_id = $3
            AND question_id = $4
          RETURNING *
      `,
			values: [question, answer, req.user?.id, questionId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Question not found' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}