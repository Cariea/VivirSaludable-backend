import { Response, Request } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE ,STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import {
	PaginateSettings,
	paginatedItemsResponse
} from '../../../utils/responses'

export const getAllUsers = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
		const { rows: pacients } = await pool.query({
			text: `
        SELECT
          p.user_id,
          p.name,
          p.email,
          p.phone,
          p.status,
          u.role AS role,
          pr.name AS program,
          COUNT(DISTINCT a.specialist_id) AS numero_especialistas,
          COUNT(DISTINCT b.program_id) AS numero_programas
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
        GROUP BY
          p.user_id, p.name, p.email, p.phone, p.status, u.role, pr.name
      `
		})
		console.log('pacients', pacients)
		const { rows: specialists } = await pool.query({
			text: `
        SELECT
          s.user_id AS user_id,
          s.name AS name,
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
          s.status = TRUE
        GROUP BY
          s.user_id, s.name, sp.name, s.status, u.role;
      `
		})
		const users = pacients.concat(specialists)
		const offset = (Number(page) - 1) * Number(size)
		const pagination: PaginateSettings = {
			total: users.length,
			page: Number(page),
			perPage: Number(size)
		}
		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(users.slice(offset, offset + Number(size))) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}
