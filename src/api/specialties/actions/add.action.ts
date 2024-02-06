import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const addSpecialty = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { name } = req.body

		const { rows } = await pool.query({
			text: `
        INSERT INTO specialties (name)
          VALUES ($1)
          RETURNING 
          name
      `,
			values: [name]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}