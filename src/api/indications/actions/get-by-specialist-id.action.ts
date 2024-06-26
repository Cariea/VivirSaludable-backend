import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getBySpecialistId = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {


		const { rows } = await pool.query({
			text: `
        SELECT indication_id, description
          FROM indications
          WHERE specialist_id = $1
      `,
			values: [req.user?.id]
		})
	
		return res.status(STATUS.OK).json(camelizeObject(rows))
	
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
