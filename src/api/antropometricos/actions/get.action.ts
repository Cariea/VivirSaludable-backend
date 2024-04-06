import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'

import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getAntropometricos = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { pacientId } = req.query
		if (!pacientId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'Falta el id del paciente' })
		}

		const { rows } = await pool.query({
			text: `
        SELECT 
          specialist_id,
          pacient_id,
          antropometrico_id,
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
          visceral_fat_level,
          TO_CHAR(created_at, 'DD-MM-YYYY') as created_at
        FROM antropometricos
        WHERE
        pacient_id = $1
        `,
			values: [ pacientId]
		})

		return res.status(STATUS.OK).json(camelizeObject(rows))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}