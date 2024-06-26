import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'

import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getQuestions = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {

	try {

		const { rows: questions } = await pool.query({
			text: `
        SELECT * 
          FROM bot_questions
          WHERE specialist_id = $1
      `,
			values: [req.user?.id ]
		})

		return res.status(STATUS.OK).json(camelizeObject(questions))
	} catch (error: unknown) {
		console.log(error)
		return handleControllerError(error, res)
	}
}