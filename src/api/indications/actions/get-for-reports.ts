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
				message: 'Missing data'
			})
		}
		const { rows } = await pool.query({
			text: `
        SELECT ia.indication_id, ia.completed, i.description, TO_CHAR(ia.date_assing, 'DD-MM-YYYY') as date, ia.record_id, TO_CHAR(ia.date_assing, 'HH24:MI:SS') as hour
        FROM daily_assing ia
        INNER JOIN assigned a ON ia.specialist_id = a.specialist_id
          AND ia.indication_id = a.indication_id
          AND ia.pacient_id = a.pacient_id
        INNER JOIN indications i ON ia.specialist_id = i.specialist_id
          AND ia.indication_id = i.indication_id
        WHERE ia.pacient_id = $1
          AND ia.specialist_id = $2
          AND ia.date_assing >= CURRENT_DATE - INTERVAL '7 days'
        ORDER BY ia.date_assing DESC;
      `,
			values: [pacientId, req.user?.id]
		})
	
		return res.status(STATUS.OK).json(camelizeObject(rows))
	
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
