import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getIndications = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { pacientId } = req.query
		if (!pacientId) {
			return res.status(STATUS.BAD_REQUEST).json({
				message: 'Missing pacientId'
			})
		}
		const { rows } = await pool.query({
			text: `
      SELECT 
        i.indication_id,
        i.description,
        CASE WHEN a.pacient_id IS NOT NULL THEN TRUE ELSE FALSE END AS status
      FROM 
        indications i
      LEFT JOIN 
        assigned a ON i.specialist_id = a.specialist_id AND i.indication_id = a.indication_id AND a.pacient_id = $1
      WHERE 
        i.specialist_id = $2
      `,
			values: [pacientId, req.user?.id]
		})
	
		return res.status(STATUS.OK).json(camelizeObject(rows))
	
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
