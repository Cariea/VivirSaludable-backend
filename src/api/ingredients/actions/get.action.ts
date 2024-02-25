import { Response, Request } from 'express'
import { pool } from '../../../database'
import {  DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'

export const getIngredients = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size, mealId } = req.query
		if (!mealId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'Meal id is required' })
		}
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows: ingredients } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM ingredients
          WHERE meal_id = $1
      `,
			values: [mealId]
		})
		const { rows } = await pool.query({
			text: `
        SELECT 
          *
        FROM ingredients
        WHERE meal_id = $1
        LIMIT $2
        OFFSET $3
      `,
			values: [mealId, size, offset]
		})
		const pagination: PaginateSettings = {
			total: Number(ingredients[0].count),
			page: Number(page),
			perPage: Number(size)
		}
		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(rows) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}