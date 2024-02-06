import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateSpecialty = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { specialtyId } = req.params
		const { name } = req.body

		const { rows } = await pool.query({
			text: `
        UPDATE specialties
          SET name = $1
          WHERE specialty_id = $2
          RETURNING 
          name
      `,
			values: [name, specialtyId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Especialidad no encontrada' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}