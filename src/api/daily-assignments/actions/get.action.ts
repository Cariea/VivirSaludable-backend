import { Response } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'

export const getPacientAssignments = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size, pacientId } = req.query
		console.log('pacientId', pacientId)
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows: indications } = await pool.query({
			text: `
        SELECT COUNT(*) 
        FROM 
          daily_assing
        WHERE 
          specialist_id = $1 AND
          pacient_id = $2
      `,
			values: [req.user?.id, pacientId]
		})
		console.log('indications', indications)
		const { rows } = await pool.query({
			text: `
        SELECT 
          specialist_id, 
          indication_id, 
          pacient_id, 
          date_assing, 
          completed
        FROM 
          daily_assing
        WHERE 
          specialist_id = $1 AND
          pacient_id = $2
        LIMIT $3
        OFFSET $4
      `,
			values: [req.user?.id, pacientId, size, offset]
		})
		console.log('rows', rows)
		const pagination: PaginateSettings = {
			total: Number(indications[0].count),
			page: Number(page),
			perPage: Number(size)
		}
		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(rows) as Array<Record<string, any>>, pagination)
	}
	catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}