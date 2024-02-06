import { Response,Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const updateAntropometrico = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
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
			visceralFatLevel} = req.body
		const {antropometricoId} = req.params
		const { rows } = await pool.query({
			text: `
        UPDATE atropometricos
          SET arm_circumference = $1,
          leg_circumference = $2,
          waist = $3,
          hip = $4,
          weight = $5,
          size = $6,
          musculoskeletal_mass = $7,
          body_fat_mass = $8,
          body_mass_index = $9,
          body_fat_percentage = $10,
          waist_hip_ratio = $11,
          visceral_fat_level = $12
          WHERE antropometrico_id = $13
          RETURNING 
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

      `,
			values: [
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
				visceralFatLevel,
				antropometricoId
			]
		})
		if (rows.length === 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Antropometrico no encontrado' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	}catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}


