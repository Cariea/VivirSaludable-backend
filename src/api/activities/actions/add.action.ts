import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'
import { getSpecialist } from '../../../utils/get-specialist'

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
		description,
		heartRate
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
          description,
          heart_rate
        )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
				description,
				heartRate
			]
		})



		const specialist_id = await getSpecialist(req.user?.id as string,'deportologo')

		await pool.query({
			text: `
      INSERT INTO alerts (
        user_id,
        user_receptor,
        alert,
        severity,
        type
      ) 
      VALUES ($1, $2, $3, $4, $5)
      `,
			values: [req.user?.id, specialist_id, 'Se ha añadido una nueva actividad fisica', '1', 'activity']
		})
		
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error) {
		console.log(error)
		return handleControllerError(error, res)
	}
}