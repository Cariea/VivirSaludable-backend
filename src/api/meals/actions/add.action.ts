import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const addMeal = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { pacientId } = req.params
		const { description, mealImage, wasSatisfied, indicateHour, pica } = req.body

		const { rows } = await pool.query({
			text: `
        INSERT INTO meals (
          pacient_id,
          description,
          meal_image_url,
          was_safistied,
          indicate_hour,
          pica
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING 
          meal_id
      `,
			values: [pacientId, description, mealImage, wasSatisfied, indicateHour, pica]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}