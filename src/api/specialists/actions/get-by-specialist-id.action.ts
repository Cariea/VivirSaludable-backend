import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getBySpecialistsId = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { specialistId } = req.params
		console.log(specialistId)
		const { rows } = await pool.query({
			text: `
        SELECT name, email, phone
          FROM specialists
          WHERE user_id = $1
          AND status = true
      `,
			values: [specialistId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Especialista no encontrado' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
