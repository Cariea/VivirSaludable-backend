import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const addSecretion = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { pacientId, abundant, yellow, blood, smelly } = req.body

		const { rows } = await pool.query({
			text: `
        INSERT INTO secretions (
          pacient_id, 
          abundant, 
          yellow, 
          blood, 
          smelly
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING 
          pacient_id,
          record_id,
          abundant, 
          yellow, 
          blood, 
          smelly
      `,
			values: [pacientId, abundant, yellow, blood, smelly]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	}catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}