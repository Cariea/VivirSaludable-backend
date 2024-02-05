import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const addProgram = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { name, description } = req.body

		const { rows } = await pool.query({
			text: `
        INSERT INTO programs (name, description)
          VALUES ($1, $2)
          RETURNING 
          name, 
          description
      `,
			values: [name, description]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}