import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getQuestions = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
	const specialisId = req.query.specialistId
	console.log(specialisId)
	try {
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}

		const { rows } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM bot_questions
          WHERE specialist_id = $1
      `,
			values: [specialisId]
		})

		console.log(rows)
		const { rows: questions } = await pool.query({
			text: `
        SELECT * 
          FROM bot_questions
          WHERE specialist_id = $1
          LIMIT $2
          OFFSET $3
      `,
			values: [specialisId, size, offset]
		})
		console.log(questions)
		const pagination: PaginateSettings = {
			total: Number(rows[0].count),
			page: Number(page),
			perPage: Number(size)
		}

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(questions) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.log(error)
		return handleControllerError(error, res)
	}
}