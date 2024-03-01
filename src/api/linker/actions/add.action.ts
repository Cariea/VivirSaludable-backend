import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'
import { checkUsers } from '../../../utils/check-users'


export const addPacients = async (
	req: ExtendedRequest,
	res: Response,
): Promise<Response> => {
	const { specialistId, pacientId } = req.body
	if(await checkUsers([specialistId, pacientId]) === false){
		return res.status(STATUS.BAD_REQUEST).json({
			message: 'Invalid users'
		})
	}
	try {
		const { rows } = await pool.query({
			text: `
        INSERT INTO assings (
          asistent_id,
          specialist_id,
          pacient_id
        ) VALUES ($1, $2, $3)
        RETURNING *
      `,
			values: [req.user?.id, specialistId, pacientId]
		})
		return res.status(STATUS.CREATED).json(camelizeObject(rows[0]))
	}
	catch (error: unknown) {
		return handleControllerError(error,res)
	}
}