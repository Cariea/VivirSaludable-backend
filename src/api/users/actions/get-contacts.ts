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

export const getContacts = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
	let response
	let count
	try {
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}
		if(req.user?.role === 'pacient') {
			const { rows } = await pool.query({
				text: `
          SELECT COUNT(*) 
            FROM assings
            WHERE 
            pacient_id = $1 AND assigned_status = true
        `,
				values: [req.user?.id]
			})
			count = rows[0].count
			const { rows: contacts } = await pool.query({
				text: `
          SELECT 
              s.user_id AS userId,
              s.name AS name,
              sp.name AS specialty
          FROM 
              assings a
          JOIN 
              specialists s ON a.specialist_id = s.user_id
          JOIN 
              specialties sp ON s.speciality_id = sp.specialty_id
          WHERE 
              a.pacient_id = $1 AND a.assigned_status = true
          LIMIT $2
          OFFSET $3
        `,
				values: [req.user?.id, size, offset]
			})
			response = contacts
		} else {
			const { rows } = await pool.query({
				text: `
          SELECT COUNT(*) 
            FROM assings
            WHERE 
            specialist_id = $1 AND assigned_status = true
        `,
				values: [req.user?.id]
			})
			count = rows[0].count
			const { rows: contacts } = await pool.query({
				text: `
          SELECT 
              p.user_id AS userId,
              p.name AS name,
              pr.name AS program
          FROM 
              assings a
          JOIN 
              belongs b ON a.pacient_id = b.pacient_id AND a.asistent_id = b.asistent_id
          JOIN 
              pacients p ON a.pacient_id = p.user_id
          JOIN 
              programs pr ON b.program_id = pr.program_id
          WHERE 
              a.specialist_id = $1 AND a.assigned_status = true     
          LIMIT $2
          OFFSET $3
        `,
				values: [req.user?.id, size, offset]
			})
			response = contacts
		}

		const pagination: PaginateSettings = {
			total: Number(count),
			page: Number(page),
			perPage: Number(size)
		}
		console.log('response', response) 

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}

