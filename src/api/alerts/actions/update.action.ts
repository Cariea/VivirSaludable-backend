import { Response,Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateAlert = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { alertId } = req.params

	try {
		const { rows } = await pool.query({
			text: `
        UPDATE alerts
        SET
          confirmed =  $2
        WHERE alert_id = $1
        RETURNING *
      `,
			values: [alertId, true]
			
		})
		if(rows.length === 0){
			return res.status(STATUS.NOT_FOUND).json({message: 'Alerta no encontrada'})
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error) {
		return handleControllerError(error, res)
	}
}