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
        SELECT user_id, name, email, phone, created_at
          FROM pacients
          WHERE user_id = $1
          AND status = true
      `,
			values: [req.user?.id]
		})

		const { rows: antropometrics } = await pool.query({
			text:`
      SELECT arm_circumference, leg_circumference, waist, hip, weight, size, musculoskeletal_mass, body_fat_mass, body_mass_index, body_fat_percentage, waist_hip_ratio, visceral_fat_level
      FROM antropometricos
      WHERE pacient_id = $1
      ORDER BY created_at DESC
      `,
			values: [req.user?.id]
		})

		const { rows: meals} = await pool.query({
			text: `
      SELECT meal_id, description, meal_image_url, was_safistied, indicate_hour, pica, created_at
      FROM meals
      WHERE pacient_id = $1 AND date_trunc('day', created_at) >= date_trunc('day', CURRENT_DATE - interval '7 days')
      ORDER BY meal_id ASC
      `,
			values: [req.user?.id]
		})

		const { rows: symptoms } = await pool.query({
			text:`
      SELECT symptom_id, name, description, when_appeared, specialist_id
      FROM symptoms
      WHERE pacient_id = $1
      `,
			values: [req.user?.id]
		})

		const { rows: activities } = await pool.query({
			text:`
      SELECT activity_id, name, hour, time, distance, weight, repetitions, description
      FROM activities
      WHERE pacient_id = $1
      `,
			values: [req.user?.id]
		})

		const { rows: specialists } = await pool.query({
			text:`
        SELECT a.specialist_id, s.name, e.name as especialty
        FROM assings as a, specialists as s, specialties as e
        WHERE pacient_id = $1
        AND a.specialist_id = s.user_id
        AND e.specialty_id = s.speciality_id
        AND a.alta = false
      `,
			values: [req.user?.id]
		})

		const { rows: programs } = await pool.query({
			text: `
      SELECT p.name
      FROM belongs as b, programs as p
      WHERE pacient_id = $1
      AND b.program_id = p.program_id
      LIMIT 1
      `,
			values: [req.user?.id]
		})

		const { rows: postProcedureSymptoms } = await pool.query({
			text:`
        SELECT record_id, temperature, redness, swelling, secretions, pain, temperature_high, created_at
        FROM post_procedure_symptoms
        WHERE pacient_id = $1
      `,
			values: [req.user?.id]
		})
		const { rows: secretions } = await pool.query({
			text:`
        SELECT record_id, abundant, yellow, blood, smelly
        FROM secretions
        WHERE pacient_id = $1
      `,
			values: [req.user?.id]
		})
		const { rows: healtQuery } = await pool.query({
			text:`
      SELECT 
      CASE 
        WHEN MAX(quote_date) > CURRENT_DATE THEN COALESCE(MAX(CAST(quote_date AS TEXT)), 'No hay proxima consulta')
        ELSE 'No hay proxima consulta'
      END AS next_quote_date
      FROM health_queries
      WHERE pacient_id =  $1
		  `,
			values: [req.user?.id]
		})
    
		const response = {
			...camelizeObject(rows[0]),
			program: camelizeObject(programs[0].name),
			nextQuoteDate: camelizeObject(healtQuery[0].next_quote_date),
			specialists: camelizeObject(specialists),
			symptoms: camelizeObject(symptoms),
			meals: camelizeObject(meals),
			activities: camelizeObject(activities),
			antropometrics: camelizeObject(antropometrics),
			postProcedureSymptoms: camelizeObject(postProcedureSymptoms),
			secretions: camelizeObject(secretions)
		}
		return res.status(STATUS.OK).json(response)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
