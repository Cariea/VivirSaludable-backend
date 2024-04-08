import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getAlerts = async (
	req:ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { rows: alerts } = await pool.query({
			text: `
      SELECT 
        a.user_id,
        a.user_receptor,
        a.alert_id,
        a.alert,
        a.severity,
        a.type,
        a.confirmed,
        TO_CHAR(a.created_at, 'DD-MM-YYYY') AS created_at,
        u.name
      FROM 
        alerts a
      JOIN 
        users u ON a.user_id = u.user_id
      WHERE 
        a.user_receptor = $1
        ORDER BY a.alert_id DESC
      `,
			values: [req.user?.id]
		})

		return res.status(STATUS.OK).json(camelizeObject(alerts))
	} catch (error) {
		return handleControllerError(error, res)
	}
}