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

export const getHealthQueries = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}

		const { rows: healthQueries } = await pool.query({
			text: `
      SELECT COUNT(*)
      FROM health_queries
    WHERE (pacient_id = $1 OR specialist_id = $1)
    AND date(quote_date) >= CURRENT_DATE

      `,
			values: [req.user?.id]
		})
		console.log('healthQueries', healthQueries)
		console.log('req.user?.id', req.user?.id)
		const { rows } = await pool.query({
			text: `
        SELECT 
          *
        FROM
          health_queries
        WHERE 
          (pacient_id = $1 OR 
          specialist_id = $1)
        AND date(quote_date) >= CURRENT_DATE
        LIMIT $2
        OFFSET $3
      `,
			values: [req.user?.id, size, offset]
		})
		console.log('rows', rows)
		const pagination: PaginateSettings = {
			total: Number(healthQueries[0].count),
			page: Number(page),
			perPage: Number(size)
		}

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(rows) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}