import { Response,Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateActivity = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { activityId } = req.params
	const {
		name,
		hour,
		time,
		distance,
		weight,
		repetitions,
		description
	} = req.body

	try {
		const { rows } = await pool.query({
			text: `
        UPDATE activities
        SET
          name = $1,
          hour = $2,
          time = $3,
          distance = $4,
          weight = $5,
          repetitions = $6,
          description = $7
        WHERE activity_id = $8
        RETURNING *
      `,
			values: [
				name,
				hour,
				time,
				distance,
				weight,
				repetitions,
				description,
				activityId
			]
		})
		if(rows.length === 0){
			return res.status(STATUS.NOT_FOUND).json({message: 'Actividad no encontrada'})
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error) {
		return handleControllerError(error, res)
	}
}