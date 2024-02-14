import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateSymptom = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { symptomId } = req.params
		const { name, description, whenAppeared, specialistId } = req.body

		const { rows } = await pool.query({
			text: `
        UPDATE symptoms
          SET name = $1,
          description = $2,
          when_appeared = $3,
          specialist_id = $4
          WHERE symptom_id = $5
          RETURNING 
          name,
          description
      `,
			values: [name, description, whenAppeared, specialistId, symptomId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Síntoma no encontrado' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}