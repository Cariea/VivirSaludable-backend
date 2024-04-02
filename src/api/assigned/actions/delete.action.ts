import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const deleteAssigment = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { assignedId } = req.params

	try {
		const { rows } = await pool.query({
			text: `
        DELETE FROM assigned
          WHERE
          indication_id = $1
          RETURNING *
      `,
			values: [assignedId]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Assignment not found' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}