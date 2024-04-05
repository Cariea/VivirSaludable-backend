import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'

import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getActivity = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { pacientId } = req.query
		if (!pacientId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'Falta el id del paciente' })
		}
	

		const { rows } = await pool.query({
			text: `
        SELECT 
          pacient_id,
          activity_id,
          name,
          TO_CHAR(hour, 'HH24:MI') as hour,
          time,
          distance,
          weight,
          repetitions,
          description,
          heart_rate,
          TO_CHAR(created_at, 'DD-MM-YYYY') as date
        FROM activities
        WHERE pacient_id = $1

        `,
			values: [pacientId]
		})

		return res.status(STATUS.OK).json(camelizeObject(rows))
	} catch (error) {
		return handleControllerError(error,res )
	}
}