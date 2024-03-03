import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { getUserRole } from '../../../utils/get-user-role'
import { UserRole } from '../../../utils/roles.enum'


export const getUsers = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { userId } = req.query
		if (!userId) {
			return res.status(STATUS.BAD_REQUEST).json({ message: 'userId is required' })
		}

		if(await getUserRole(userId as string) === UserRole.ESPECIALISTA){
			const { rows: pacients } = await pool.query({
				text: `
          SELECT a.user_id , a.name AS name
            FROM pacients a
            JOIN belongs b ON a.user_id = b.pacient_id
            JOIN programs p ON b.program_id = p.program_id
            JOIN users u ON a.user_id = u.user_id
            WHERE NOT EXISTS (
              SELECT 1
              FROM assings a2
              JOIN specialists s ON a2.specialist_id = s.user_id
              WHERE a2.pacient_id = a.user_id
                AND s.speciality_id = (
                  SELECT speciality_id
                  FROM specialists
                  WHERE user_id = $1
                ) AND s.status = true
            ) 
        `,
				values: [userId]
			})
			return res.status(STATUS.OK).json(camelizeObject(pacients) as Array<Record<string, any>>)
		}else {
			const { rows: specialists } = await pool.query({
				text: `
          SELECT DISTINCT s.user_id, s.name AS name, sp.name AS especialty
          FROM specialists s
          JOIN specialties sp ON s.speciality_id = sp.specialty_id
          WHERE s.speciality_id NOT IN (
            SELECT s2.speciality_id
            FROM specialists s2
            JOIN assings a ON s2.user_id = a.specialist_id
            WHERE a.pacient_id = $1
          ) AND s.user_id NOT IN (
            SELECT a.specialist_id
            FROM assings a
            WHERE a.pacient_id = $1
          ) AND s.status = true
        `,
				values: [userId]
			})
			return res.status(STATUS.OK).json(camelizeObject(specialists) as Array<Record<string, any>>)
		}
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}