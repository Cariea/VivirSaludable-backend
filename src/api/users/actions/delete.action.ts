import { Response} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'
import { QueryResult } from 'pg'

export const deleteUser = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
	
		const { userId } = req.params
		const { role } = req.query
		let response: QueryResult
		if(role === 'pacient'){
			response = await pool.query({
				text: `
          DELETE FROM pacients
            WHERE user_id = $1
            RETURNING
            user_id
        `,
				values: [userId]
			})
			if (response.rows.length === 0) {
				return res.status(STATUS.NOT_FOUND).json({ message: 'Paciente no encontrado' })
			}
		}else if(role === 'specialist'){
			response = await pool.query({
				text: `
          DELETE FROM specialists
            WHERE user_id = $1
            RETURNING
            user_id
        `,
				values: [userId]
			})
			if (response.rows.length === 0) {
				return res.status(STATUS.NOT_FOUND).json({ message: 'Especialista no encontrado' })
			}
		}
		return res.status(STATUS.OK).json({ message: 'Usuario eliminado' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
