import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateSecretion = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { recordId } = req.params
		const { abundant, yellow, blood, smelly } = req.body

		const { rows } = await pool.query({
			text: `
        UPDATE secretions SET 
          abundant = $1, 
          yellow = $2, 
          blood = $3, 
          smelly = $4
        WHERE 
          record_id = $5
        RETURNING 
          pacient_id,
          record_id,
          abundant, 
          yellow, 
          blood, 
          smelly
      `,
			values: [abundant, yellow, blood, smelly, recordId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Secreción no encontrada' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}