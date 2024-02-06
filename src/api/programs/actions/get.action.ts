import { Response, Request } from 'express'
import { pool } from '../../../database'
import {  DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'

export const getPrograms = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows: programs } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM programs
      `
		})
		const { rows } = await pool.query({
			text: `
        SELECT 
          program_id, 
          name, 
          description
        FROM programs
        LIMIT $1
        OFFSET $2
      `,
			values: [size, offset]
		})
		const pagination: PaginateSettings = {
			total: Number(programs[0].count),
			page: Number(page),
			perPage: Number(size)
		}
		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(rows) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
