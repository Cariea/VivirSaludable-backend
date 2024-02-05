import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateProgram = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { programId } = req.params
		const { name, description } = req.body

		const { rows } = await pool.query({
			text: `
        UPDATE programs
          SET name = $1, description = $2
          WHERE program_id = $3
          RETURNING 
          name, 
          description
      `,
			values: [name, description, programId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Programa no encontrado' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	} 
}