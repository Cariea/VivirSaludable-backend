import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getSpecialists = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

	try {
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		const { rows } = await pool.query({
			text: `
        SELECT COUNT(*) 
          FROM specialists
          WHERE status = $1
      `,
			values: [true]
		})

		const { rows: specialists } = await pool.query({
			text: `
        SELECT
          s.user_id AS user_id,
          s.name AS name,
          s.address AS address,
          sp.name AS especialty,
          s.status AS status,
          u.role AS role,
          COUNT(DISTINCT a.pacient_id) AS pacients,
          COUNT(DISTINCT b.program_id) AS programs
        FROM
            specialists s
        JOIN
            specialties sp ON s.speciality_id = sp.specialty_id
        JOIN
            users u ON s.user_id = u.user_id
        LEFT JOIN
            assings a ON s.user_id = a.specialist_id AND a.assigned_status = TRUE
        LEFT JOIN
            belongs b ON a.pacient_id = b.pacient_id
        WHERE
            s.status = $1
        GROUP BY
            s.user_id, s.name, sp.name, s.status, u.role
        LIMIT $2
        OFFSET $3;
      `,
			values: [true, size, offset]
		})
		console.log('specialists', specialists)
		const pagination: PaginateSettings = {
			total: Number(rows[0].count),
			page: Number(page),
			perPage: Number(size)
		}

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(specialists) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.log(error)
		return handleControllerError(error, res)
	}
}
