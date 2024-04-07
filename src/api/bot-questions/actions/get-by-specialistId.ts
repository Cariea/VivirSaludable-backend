import { Response,Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'

import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getQuestionsByID = async (
	req: Request,
	res: Response
): Promise<Response> => {

	try {
		const { specialistId } = req.params
		const { rows: questions } = await pool.query({
			text: `
        SELECT * 
          FROM bot_questions
          WHERE specialist_id = $1
      `,
			values: [specialistId ]
		})

		return res.status(STATUS.OK).json(camelizeObject(questions))
	} catch (error: unknown) {
		console.log(error)
		return handleControllerError(error, res)
	}
}