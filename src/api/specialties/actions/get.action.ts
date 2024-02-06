import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getSpecialties = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows: specialties } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM specialties
      `
		})
		const { rows } = await pool.query({
			text: `
        SELECT 
          specialty_id, 
          name
        FROM specialties
        LIMIT $1
        OFFSET $2
      `,
			values: [size, offset]
		})
		const pagination: PaginateSettings = {
			total: Number(specialties[0].count),
			page: Number(page),
			perPage: Number(size)
		}
		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(rows) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}