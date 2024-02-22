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
import { UserRole } from '../../../utils/roles.enum'

export const getAssignments = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
	const {pacientId, specialistId}= req.query
	if (req.user?.role === UserRole.PACIENTE && !specialistId) {
		return res.status(STATUS.BAD_REQUEST).json({ message: 'Falta el id del especialista' })
	}
	if (req.user?.role === UserRole.ESPECIALISTA && !pacientId) {
		return res.status(STATUS.BAD_REQUEST).json({ message: 'Falta el id del paciente' })
	}
  
	const querySpecialists = `SELECT COUNT(*) FROM assigned WHERE specialist_id = $1 AND pacient_id = $2`
	const queryPacients = 'SELECT COUNT(*) FROM assigned WHERE pacient_id = $1 AND specialist_id = $2'

	let assignments: Array<Record<string, any>> = []
	let count 

	try {
		let offset = (Number(page) - 1) * Number(size)
		if (Number(page) < 1) {
			offset = 0
		}

		if(req.user?.role === UserRole.ESPECIALISTA){
			const {rows: response}  = await pool.query({
				text: querySpecialists,
				values: [req.user.id, pacientId]
			})
			count = response[0].count
			const { rows } = await pool.query({
				text: `
        SELECT a.*, i.description
        FROM assigned a
        JOIN indications i ON a.specialist_id = i.specialist_id AND a.indication_id = i.indication_id
        WHERE a.specialist_id = $1 AND a.pacient_id = $2
        LIMIT $3
        OFFSET $4;
        `,
				values: [req.user.id, pacientId, size, offset]
			})
			assignments = rows
		}

		if(req.user?.role === UserRole.PACIENTE){
			const {rows: response}  = await pool.query({
				text: queryPacients,
				values: [req.user.id, specialistId]
			})
			count = response[0].count
			const { rows } = await pool.query({
				text: `
        SELECT a.*, i.description
        FROM assigned a
        JOIN indications i ON a.specialist_id = i.specialist_id AND a.indication_id = i.indication_id
        WHERE a.pacient_id = $1 AND a.specialist_id = $2
        LIMIT $3
        OFFSET $4;
        `,
				values: [req.user.id,specialistId, size, offset]
			})
			assignments = rows
		}
		
		const pagination: PaginateSettings = {
			total: Number(count),
			page: Number(page),
			perPage: Number(size)
		}

		return paginatedItemsResponse(res, STATUS.OK, camelizeObject(assignments) as Array<Record<string, any>>, pagination)
	} catch (error: unknown) {
		console.log(error)
		return handleControllerError(error, res)
	}
}