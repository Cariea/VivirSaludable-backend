import { Response } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getAntropometricos = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size, pacientId } = req.query
		if (!pacientId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'Falta el id del paciente' })
		}
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows: antropometricos } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM antropometricos
          WHERE specialist_id = $1
          AND pacient_id = $2
      `,
			values: [req.user?.id, pacientId]
		})
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
          created_at dom_created_at
        FROM antropometricos
        WHERE specialist_id = $1
        AND pacient_id = $2
        LIMIT $3
        OFFSET $4
        `,
			values: [req.user?.id, pacientId, size, offset]
		})
		const pagination: PaginateSettings = {
			total: Number(antropometricos[0].count),
			page: Number(page),
			perPage: Number(size)
		}
		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(rows) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}