import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getSymptoms = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size, specialistId } = req.query
		if (!specialistId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'Falta el specialistId en el req.query' })
		}
		const { pacientId } = req.params
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows: symptoms } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM symptoms
          WHERE pacient_id = $1
          AND specialist_id = $2
      `,
			values: [pacientId, specialistId]
		})
		console.log('symptoms', symptoms[0].count)
		const { rows } = await pool.query({
			text: `
        SELECT 
          *
        FROM symptoms
        WHERE pacient_id = $1
        AND specialist_id = $2
        LIMIT $3
        OFFSET $4
      `,
			values: [pacientId, specialistId, size, offset]
		})
		console.log('rows', rows)
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