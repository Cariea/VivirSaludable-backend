import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'

export const getPacients = async (
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
          FROM pacients
          WHERE status = $1
      `,
			values: [true]
		})

		const { rows: pacients } = await pool.query({
			text: `
        SELECT
          p.user_id,
          p.name,
          p.email,
          p.phone,
          p.address,
          p.status,
          u.role AS role,
          pr.name AS program,
          COUNT(DISTINCT a.specialist_id) AS especialists
        FROM
          pacients p
        LEFT JOIN
          assings a ON p.user_id = a.pacient_id AND a.assigned_status = TRUE
        LEFT JOIN
          belongs b ON p.user_id = b.pacient_id
        LEFT JOIN
          users u ON p.user_id = u.user_id
        LEFT JOIN
          programs pr ON b.program_id = pr.program_id
        WHERE 
          p.status = $1
        GROUP BY
          p.user_id, p.name, p.email, p.phone, p.status, u.role, pr.name
        LIMIT $2
        OFFSET $3
      `,
			values: [true, size, offset]
		})

		const pagination: PaginateSettings = {
			total: Number(rows[0].count),
			page: Number(page),
			perPage: Number(size)
		}

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(pacients) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}
