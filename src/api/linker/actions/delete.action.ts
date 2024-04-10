import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'


export const deleteLinker = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const { specialistId, pacientId } = req.body
	if (!specialistId || !pacientId) {
		return res.status(STATUS.BAD_REQUEST).json({ message: 'Especialista o paciente no encontrado' })
	}
	console.log(specialistId)
	try {
		const { rows } = await pool.query({
			text: `
        DELETE FROM assings
        WHERE specialist_id = $1 AND pacient_id = $2
        RETURNING *
      `,
			values: [specialistId, pacientId]
		})
		console.log(rows)
		return res.status(STATUS.OK).json(rows[0])
	}
	catch (error: unknown) {
		return handleControllerError(error,res)
	}
}