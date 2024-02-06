import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const updateIndication = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response | undefined> => {
	try {
		const { indicationId } =req.params
		const { description } = req.body
		const response = await pool.query({
			text: `
        UPDATE indications
          SET description = $1
          WHERE indication_id = $2
          AND specialist_id = $3
        RETURNING
          specialist_id,
          indication_id,
          description
      `,
			values: [description, indicationId, req.user?.id]
		})
		if (response.rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Indicacion no encontrada' })
		}
		return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
	} catch (error: any) {
		console.error(error)
		return handleControllerError(error, res)
	}
}