import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deletePPSymptom = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { symptomId } = req.params
		const {rows} = await pool.query({
			text: `
        DELETE FROM post_procedure_symptoms
          WHERE record_id = $1
          RETURNING
          record_id
      `,
			values: [symptomId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Sintoma no encontrado' })
		}
		return res.status(STATUS.OK).json({ message: 'Sintoma eliminado' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}