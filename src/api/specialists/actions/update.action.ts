import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateSpecialists = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { specialistId } = req.params
		const { name, email, phone, specialityId } = req.body

		const { rows } = await pool.query({
			text: `
        UPDATE specialists
          SET name = $1, email = $2, phone = $3, speciality_id = $5
          WHERE user_id = $4
          AND status = true
          RETURNING name, email, phone
      `,
			values: [name, email, phone, specialistId, specialityId]
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
