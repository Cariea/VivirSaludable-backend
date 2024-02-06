import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateMeal = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { mealId } = req.params
		const { description, mealImage, wasSatisfied, indicateHour, pica } = req.body

		const { rows } = await pool.query({
			text: `
        UPDATE meals
          SET description = $1, meal_image_url = $2, was_safistied = $3, indicate_hour = $4, pica = $5
          WHERE meal_id = $6
          RETURNING 
          description,
          meal_image_url,
          was_safistied,
          indicate_hour,
          pica
      `,
			values: [description, mealImage, wasSatisfied, indicateHour, pica, mealId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Comida no encontrada' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}