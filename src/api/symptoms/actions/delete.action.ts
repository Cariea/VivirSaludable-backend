import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deleteSymptom = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { symptomId } = req.params
		const {rows} = await pool.query({
			text: `
        DELETE FROM symptoms
          WHERE symptom_id = $1
          RETURNING
          symptom_id,
          name
      `,
			values: [symptomId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Síntoma no encontrado' })
		}
		return res.status(STATUS.OK).json({ message: 'Síntoma eliminado' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}