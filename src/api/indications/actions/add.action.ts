import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addIndication = async (
	req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
	try {
		const { description } = req.body
		const response = await pool.query({
			text: `
        INSERT INTO indications (
          specialist_id,
          description
        ) 
        VALUES ($1, $2)
        RETURNING
          specialist_id,
          indication_id,
          description
      `,
			values: [req.user?.id,description]
		})

		return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
	} catch (error: any) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
