import { Response } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'


export const getBelongs = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
	try {
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}

		const { rows } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM belongs
          WHERE asistent_id = $1
      `,
			values: [req.user?.id]
		})

		const { rows: belongs } = await pool.query({
			text: `
        SELECT * 
          FROM belongs
          WHERE asistent_id = $1
          LIMIT $2
          OFFSET $3
      `,
			values: [req.user?.id, size, offset]
		})

		const pagination: PaginateSettings = {
			total: Number(rows[0].count),
			page: Number(page),
			perPage: Number(size)
		}

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(belongs) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}