import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deleteIngredient = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { ingredientId } = req.params
		const {rows} = await pool.query({
			text: `
        DELETE FROM ingredients
          WHERE ingredient_id = $1
          RETURNING
          ingredient_id
      `,
			values: [ingredientId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Ingrediente no encontrado' })
		}
		return res.status(STATUS.OK).json({ message: 'Ingrediente eliminado' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}