import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'

export const deleteAssignment = async (
	req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
	try {
		const { recordId } = req.params
		if(!recordId){
			return res.status(STATUS.BAD_REQUEST).json({message: 'Se requiere el id de la asignación'})
		}
		await pool.query({
			text: `
        DELETE FROM daily_assing
          WHERE 
          record_id = $1
      `,
			values: [recordId]
		})
		return res.status(STATUS.OK).json({ message: 'Asignación eliminada' })
	} catch (error: any) {
		console.error(error)
		return handleControllerError(error, res)
	}
}