import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const addSymptom = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { name, description, pacientId, whenAppeared } = req.body
		const { rows } = await pool.query({
			text: `
        INSERT INTO symptoms (
          pacient_id,
          name,
          description,
          when_appeared
          )VALUES ($1, $2, $3, $4)
          RETURNING 
          pacient_id,
          name
      `,
			values: [pacientId, name, description, whenAppeared]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}