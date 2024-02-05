import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updatePacient = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { pacientId } = req.params
		const { name, email, phone } = req.body

		const { rows } = await pool.query({
			text: `
        UPDATE pacients
          SET name = $1, email = $2, phone = $3
          WHERE user_id = $4
          AND status = true
          RETURNING name, email, phone
      `,
			values: [name, email, phone, pacientId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Paciente no encontrado' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
