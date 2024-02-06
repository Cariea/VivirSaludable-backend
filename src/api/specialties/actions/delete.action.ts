import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deleteSpecialty = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { specialtyId } = req.params
		console.log(specialtyId)
		const {rows} = await pool.query({
			text: `
        DELETE FROM specialties
          WHERE specialty_id = $1
          RETURNING
          specialty_id,
          name
      `,
			values: [specialtyId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Especialidad no encontrada' })
		}
		return res.status(STATUS.OK).json({ message: 'Especialidad eliminada' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}