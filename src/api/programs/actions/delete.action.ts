import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deleteProgram = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { programId } = req.params
		const {rows} = await pool.query({
			text: `
        DELETE FROM programs
          WHERE program_id = $1
          RETURNING
          program_id,
          description
      `,
			values: [programId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Programa no encontrado' })
		}
		return res.status(STATUS.OK).json({ message: 'Programa eliminado' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
