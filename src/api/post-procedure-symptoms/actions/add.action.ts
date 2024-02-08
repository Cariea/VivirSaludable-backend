import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addPPSymptom = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { temperature, redness, swelling, secretions, pain } = req.body

		await pool.query({
			text: `
        INSERT INTO post_procedure_symptoms (
          pacient_id, 
          temperature, 
          redness, 
          swelling, 
          secretions, 
          pain
          )VALUES ($1, $2, $3, $4, $5, $6)
      `,
			values: [req.user?.id, temperature, redness, swelling, secretions, pain]
		})
		return res.status(STATUS.OK).json({ message: 'Symptom agregado'})
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}