import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const addIngredient = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const {ingredientType, name, volume } = req.body
		const {  pacientId, mealId } = req.query
		if (!pacientId || !mealId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'Pacient id and meal id are required' })
		}
		const { rows } = await pool.query({
			text: `
        INSERT INTO ingredients (
          pacient_id,
          meal_id,
          ingredient_type,
          name,
          volume
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING 
          ingredient_id
      `,
			values: [pacientId, mealId, ingredientType, name, volume]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	}catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}