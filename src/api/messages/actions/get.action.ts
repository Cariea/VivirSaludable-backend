import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getMessages = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size, sessionUserId, toUserId } = req.query
	if(!sessionUserId || !toUserId) {
		return res.status(STATUS.BAD_REQUEST).json({
			message: 'sessionUserId and toUserId are required'
		})
	}
	try {
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM messages
          WHERE 
          (user_id = $1 AND user_receptor = $2) OR 
          (user_id = $2 AND user_receptor = $1)
      `,
			values: [sessionUserId, toUserId]
		})

		const { rows: messages } = await pool.query({
			text: `
        SELECT * 
          FROM messages
          WHERE 
          (user_id = $1 AND user_receptor = $2) OR 
          (user_id = $2 AND user_receptor = $1)
          ORDER BY message_id ASC
          LIMIT $3
          OFFSET $4
      `,
			values: [sessionUserId, toUserId, size, offset]
		})

		const pagination: PaginateSettings = {
			total: Number(rows[0].count),
			page: Number(page),
			perPage: Number(size)
		}

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(messages) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}