import { Response, Request } from 'express'
import { pool } from '../../../database'
import {  STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getPrograms = async (
	_req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { rows } = await pool.query({
			text: `
        SELECT 
          program_id, 
          name, 
          description
        FROM programs
      `
		})
		return res.status(STATUS.OK).json(camelizeObject(rows))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
