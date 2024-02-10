import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateIngredient = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { ingredientId } = req.params
		const {ingredientType, name, volume } = req.body

		const { rows } = await pool.query({
			text: `
        UPDATE ingredients
        SET 
          ingredient_type = $1,
          name = $2,
          volume = $3
        WHERE ingredient_id = $4
        RETURNING 
          ingredient_id
      `,
			values: [ingredientType, name, volume, ingredientId]
		})
		if (!rows[0]) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Ingredient not found' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	}catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}