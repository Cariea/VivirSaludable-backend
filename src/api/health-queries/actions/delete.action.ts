import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'

export const deleteHealthQuery = async (
	req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
	try {
		const { quoteId } = req.params
		if(!quoteId){
			return res.status(STATUS.BAD_REQUEST).json({message: 'Se requiere el id de la consulta'})
		}
		await pool.query({
			text: `
        DELETE FROM health_queries
          WHERE 
          quote_id = $1
      `,
			values: [quoteId]
		})
		return res.status(STATUS.OK).json({ message: 'Consulta eliminada' })
	} catch (error: any) {
		console.error(error)
		return handleControllerError(error, res)
	}
}