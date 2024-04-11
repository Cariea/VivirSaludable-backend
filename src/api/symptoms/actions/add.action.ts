import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addSymptom = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { name, description, whenAppeared, specialistId } = req.body
		console.log(req.body)
		const { rows } = await pool.query({
			text: `
        INSERT INTO symptoms (
          pacient_id,
          name,
          description,
          when_appeared,
          specialist_id
          )VALUES ($1, $2, $3, $4, $5)
          RETURNING 
          pacient_id,
          name
      `,
			values: [req.user?.id, name, description, whenAppeared, specialistId]
		})



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
			values: [req.user?.id, specialistId, 'Se ha añadido un nuevo sintoma', '1', 'symptom']
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}