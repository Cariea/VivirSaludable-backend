import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addAntropometrico = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { pacientId } = req.query
	if (!pacientId) {
		return res.status(STATUS.BAD_REQUEST).json({ message: 'Falta el id del paciente' })
	}
	const {
		armCircumference,
		legCircumference,
		waist,
		hip,
		weight,
		size,
		musculoskeletalMass,
		bodyFatMass,
		bodyMassIndex,
		bodyFatPercentage,
		waistHipRatio,
		visceralFatLevel
	} = req.body
	

	try {
		const { rows } = await pool.query({
			text: `
        INSERT INTO atropometricos (
          specialist_id,
          pacient_id,
          arm_circumference,
          leg_circumference,
          waist,
          hip,
          weight,
          size,
          musculoskeletal_mass,
          body_fat_mass,
          body_mass_index,
          body_fat_percentage,
          waist_hip_ratio,
          visceral_fat_level
        )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          RETURNING *
      `,
			values: [
				req.user?.id,
				pacientId,
				armCircumference,
				legCircumference,
				waist,
				hip,
				weight,
				size,
				musculoskeletalMass,
				bodyFatMass,
				bodyMassIndex,
				bodyFatPercentage,
				waistHipRatio,
				visceralFatLevel
			]
		})

		return res.status(STATUS.CREATED).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}