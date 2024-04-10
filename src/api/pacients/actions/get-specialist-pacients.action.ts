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

export const getSpecialistPacients = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

	try {
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		console.log(req.user?.id)
		const { rows } = await pool.query({
			text: `
        SELECT COUNT(*) 
        FROM pacients p
        INNER JOIN assings a ON p.user_id = a.pacient_id AND a.assigned_status = true
        INNER JOIN specialists s ON a.specialist_id = s.user_id
        WHERE s.user_id = $1
        AND p.status = true AND a.alta = false
      `,
			values: [req.user?.id]
		})
		console.log(req.user?.id)
		const { rows: pacients } = await pool.query({
			text: `
          SELECT 
              p.user_id,
              p.name,
              p.email,
              p.phone,
              p.address,
              p.status,
              pr.name AS program
          FROM 
              pacients p
          INNER JOIN 
              assings a ON p.user_id = a.pacient_id AND a.assigned_status = true
          INNER JOIN 
              specialists s ON a.specialist_id = s.user_id
          INNER JOIN 
              users u ON p.user_id = u.user_id
          INNER JOIN 
              belongs b ON p.user_id = b.pacient_id
          INNER JOIN 
              programs pr ON b.program_id = pr.program_id
          WHERE 
              s.user_id = $1 AND p.status = true AND a.alta = false
          GROUP BY 
              p.user_id, p.name, p.email, p.phone, p.address, p.status, u.role, pr.name
          LIMIT $2
          OFFSET $3
      `,
			values: [req.user?.id, size, offset]
		})
  
  
  

		const pagination: PaginateSettings = {
			total: Number(rows[0].count),
			page: Number(page),
			perPage: Number(size)
		}

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(pacients) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.log(error)
		return handleControllerError(error, res)
	}
}
