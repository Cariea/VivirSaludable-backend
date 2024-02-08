import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getPPSymptoms = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
	try {
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows: symptoms } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM post_procedure_symptoms
          WHERE pacient_id = $1
      `,
			values: [req.params.pacientId]
		})
		const { rows } = await pool.query({
			text: `
        SELECT 
          pacient_id, 
          temperature, 
          redness, 
          swelling, 
          secretions, 
          pain
        FROM post_procedure_symptoms
        WHERE pacient_id = $1
        LIMIT $2
        OFFSET $3
      `,
			values: [req.params.pacientId, size, offset]
		})
		const pagination: PaginateSettings = {
			total: Number(symptoms[0].count),
			page: Number(page),
			perPage: Number(size)
		}
		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(rows) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}