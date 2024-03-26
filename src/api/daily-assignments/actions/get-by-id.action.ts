import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getAssignments = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	console.log(req.user?.id)
	try {
		const { rows } = await pool.query({
			text: `
        SELECT 
          sp.name AS specialist_name,
          spe.name AS specialty,
          date_assing AS date,
          da.record_id,
          ind.description,
          da.completed
        FROM
          daily_assing da
        JOIN
          indications ind ON da.specialist_id = ind.specialist_id
            AND da.indication_id = ind.indication_id
        JOIN
          specialists sp ON da.specialist_id = sp.user_id
        JOIN
          specialties spe ON sp.speciality_id = spe.specialty_id
        WHERE
          da.pacient_id = $1
          AND date_trunc('day', da.date_assing) = date_trunc('day', CURRENT_DATE);
        `,
			values: [req.user?.id]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows))
	} catch (error: unknown) {
		console.log(error)
		return handleControllerError(error, res)
	}
}

// SELECT 
//           sp.name AS specialist_name,
//           spe.name AS specialty,
//           date_assing AS date,
//           da.record_id,
//           ind.description,
//           da.completed
//         FROM
//           daily_assing da
//         JOIN
//           indications ind ON da.specialist_id = ind.specialist_id
//             AND da.indication_id = ind.indication_id
//         JOIN
//           specialists sp ON da.specialist_id = sp.user_id
//         JOIN
//           specialties spe ON sp.speciality_id = spe.specialty_id
//         WHERE
//           da.pacient_id = $1
//           AND date_trunc('day', da.date_assing) = date_trunc('day', CURRENT_DATE);