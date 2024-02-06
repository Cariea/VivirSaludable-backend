import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deleteMeal = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { mealId } = req.params
		const {rows} = await pool.query({
			text: `
        DELETE FROM meals
          WHERE meal_id = $1
          RETURNING
          meal_id,
          description
      `,
			values: [mealId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Comida no encontrada' })
		}
		return res.status(STATUS.OK).json({ message: 'Comida eliminada' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}