import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addActivity = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const {
		name,
		hour,
		time,
		distance,
		weight,
		repetitions,
		description
	} = req.body
	console.log(req.body)
	try {
		const { rows } = await pool.query({
			text: `
        INSERT INTO activities (
          pacient_id,
          name,
          hour,
          time,
          distance,
          weight,
          repetitions,
          description
        )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *
      `,
			values: [
				req.user?.id,
				name,
				hour,
				time,
				distance,
				weight,
				repetitions,
				description
			]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error) {
		console.log(error)
		return handleControllerError(error, res)
	}
}