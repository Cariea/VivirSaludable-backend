import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deleteAntropometrico = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { antropometricoId } = req.params
		const {rows} = await pool.query({
			text: `
        DELETE FROM antropometricos
          WHERE antropometrico_id = $1
          RETURNING
          antropometrico_id
      `,
			values: [antropometricoId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Antropometrico no encontrado' })
		}
		return res.status(STATUS.OK).json({ message: 'Antropometrico eliminado' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}