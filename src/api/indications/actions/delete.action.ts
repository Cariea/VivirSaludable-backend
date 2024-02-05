import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'

export const deleteIndication = async (
	req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
	try {
		const { indicationId } = req.params
		await pool.query({
			text: `
        DELETE FROM indications
          WHERE 
          specialist_id = $1 AND
          indication_id = $2
      `,
			values: [req.user?.id, indicationId]
		})
		return res.status(STATUS.OK).json({ message: 'Indicación eliminada' })
	} catch (error: any) {
		console.error(error)
		return handleControllerError(error, res)
	}
}