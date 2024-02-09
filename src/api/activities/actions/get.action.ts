import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getActivity = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size, pacientId } = req.query
		if (!pacientId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'Falta el id del paciente' })
		}
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows: activities } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM activities
          WHERE pacient_id = $1
      `,
			values: [pacientId]
		})
		const { rows } = await pool.query({
			text: `
        SELECT 
          pacient_id,
          activity_id,
          name,
          hour,
          time,
          distance,
          weight,
          repetitions,
          description,
          created_at dom_created_at
        FROM activities
        WHERE pacient_id = $1
        LIMIT $2
        OFFSET $3
        `,
			values: [pacientId, size, offset]
		})
		const pagination: PaginateSettings = {
			total: Number(activities[0].count),
			page: Number(page),
			perPage: Number(size)
		}
		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(rows) as Array<Record<string, any>>, pagination)
	} catch (error) {
		return handleControllerError(error,res )
	}
}