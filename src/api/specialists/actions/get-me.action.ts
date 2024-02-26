import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getMe = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { rows } = await pool.query({
			text: `
      SELECT s.user_id, s.name AS specialist_name, s.email, s.asistent_id, s.speciality_id, sp.name AS specialty_name, s.phone, s.status
      FROM specialists s
      JOIN specialties sp ON s.speciality_id = sp.specialty_id
      WHERE s.user_id = $1
      AND s.status = true
      `,
			values: [req.user?.id]
		})

		const { rows: botQuestions } = await pool.query({
			text: `
      SELECT question, answer
      FROM bot_questions
      WHERE specialist_id = $1
      `,
			values: [req.user?.id]
		})
   
	
		const { rows: indications } = await pool.query({
			text: `
      SELECT indication_id, description
      FROM indications
      WHERE specialist_id = $1
      `,
			values: [req.user?.id]
		})

		const {rows: assignedPatients} = await pool.query({
			text: `
      SELECT p.user_id, p.name, p.email, p.phone, p.created_at
      FROM pacients p
      JOIN assings a ON p.user_id = a.pacient_id
      WHERE a.specialist_id = $1
      AND a.assigned_status = true
      `,
			values: [req.user?.id]
		})



		const { rows: healthQueries } = await pool.query({
			text: `
      SELECT quote_id, quote_date, quote_atention, quote_review
      FROM health_queries
      WHERE specialist_id = $1
      AND quote_date > current_date
      `,
			values: [req.user?.id]
		})
		const response = {
			...camelizeObject(rows[0]),
			botQuestions: camelizeObject(botQuestions),
			indications: camelizeObject(indications),
			assignedPatients: camelizeObject(assignedPatients),
			healthQueries: camelizeObject(healthQueries)
		}
		return res.status(STATUS.OK).json(response)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
