import { Response } from 'express'
import { pool } from '../../../database'
import {  STATUS } from '../../../utils/constants'
// import {
// 	PaginateSettings,
// 	paginatedItemsResponse
// } from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getMessages = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const {  toUserId } = req.query
  
	if(!toUserId) {
		return res.status(STATUS.BAD_REQUEST).json({
			message: 'toUserId is required'
		})
	}
	try {

		// const { rows } = await pool.query({
		// 	text: `
		//     SELECT COUNT(*) 
		//       FROM messages
		//       WHERE 
		//       (user_id = $1 AND user_receptor = $2) OR 
		//       (user_id = $2 AND user_receptor = $1)
		//   `,
		// 	values: [req.user?.id, toUserId]
		// })

		const { rows: messages } = await pool.query({
			text: `
        SELECT * 
          FROM messages
          WHERE 
          (user_id = $1 AND user_receptor = $2) OR 
          (user_id = $2 AND user_receptor = $1)
          ORDER BY message_id DESC
          LIMIT 150
      `,
			values: [req.user?.id, toUserId]
		})

		// const pagination: PaginateSettings = {
		// 	total: Number(rows[0].count),
		// 	page: Number(page),
		// 	perPage: Number(size)
		// }
		return res.status(STATUS.OK).json(camelizeObject(messages))
		//return paginatedItemsResponse(res, STATUS.OK, camelizeObject(messages) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}