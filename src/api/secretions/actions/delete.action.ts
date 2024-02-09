import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deleteSecretion = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { recordId } = req.params
		const {rows} = await pool.query({
			text: `
        DELETE FROM secretions
          WHERE record_id = $1
          RETURNING
          record_id
      `,
			values: [recordId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Secreción no encontrada' })
		}
		return res.status(STATUS.OK).json({ message: 'Secreción eliminada' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}