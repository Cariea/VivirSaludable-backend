import { Response, Request } from 'express'
import { pool } from '../../../database'
// import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
// import camelizeObject from '../../../utils/camelize-object'
import { UserRole } from '../../../utils/roles.enum'
import camelizeObject from '../../../utils/camelize-object'

export const getByUserId = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { userId } = req.params
		const {rows: role} = await pool.query({
			text:`
        SELECT role 
        FROM users 
        where user_id = $1
      `,
			values: [userId]
		})
		if(role[0].role === UserRole.ESPECIALISTA){
			const {rows: specialist} = await pool.query({
				text:`
        SELECT s.user_id, s.name, s.email, s.asistent_id, sp.name as specialty, s.phone, s.address, s.status
        FROM specialists s
        JOIN specialties sp ON s.speciality_id = sp.specialty_id
        WHERE s.user_id = $1
      `,
				values: [userId]
			})
			const {rows: programs} = await pool.query({
				text:`
          SELECT DISTINCT
            pr.program_id,
            pr.name AS program_name,
            pr.description AS program_description
          FROM assings a
          JOIN pacients p ON a.pacient_id = p.user_id
          JOIN belongs b ON p.user_id = b.pacient_id
          JOIN programs pr ON b.program_id = pr.program_id
          WHERE a.specialist_id =   $1
      `,
				values: [userId]
			})
			const {rows: pacients}= await pool.query({
				text:`
          SELECT 
            p.user_id,
            p.name AS pacient_name,
            p.email,
            p.phone,
            pr.name AS program_name,
            pr.description AS program_description
          FROM assings a
          JOIN pacients p ON a.pacient_id = p.user_id
          JOIN belongs b ON p.user_id = b.pacient_id
          JOIN programs pr ON b.program_id = pr.program_id
          WHERE a.specialist_id = $1
        `,
				values: [userId]
			})
			const response = {
				...camelizeObject(specialist[0]),
				role: UserRole.ESPECIALISTA,
				programs: camelizeObject(programs),
				pacients: camelizeObject(pacients)
			}
			return res.status(200).json(response)
		}else {
			const {rows: pacient} = await pool.query({
				text:`
          SELECT 
            p.user_id,
            p.name,
            p.email,
            p.phone,
            p.status,
            p.address,
            pr.name as program,
            pr.description AS description
          FROM pacients p
          JOIN belongs b ON p.user_id = b.pacient_id
          JOIN programs pr ON b.program_id = pr.program_id
          WHERE p.user_id = $1
      `,
				values: [userId]
			})
			const {rows: specialists} = await pool.query({
				text:`
          SELECT 
            s.user_id,
            s.name AS specialist_name,
            s.email,
            s.phone,
            s.address,
            sp.name AS specialty
          FROM assings a
          JOIN specialists s ON a.specialist_id = s.user_id
          JOIN specialties sp ON s.speciality_id = sp.specialty_id
          WHERE a.pacient_id = $1
        `,
				values: [userId]
			})
			const response = {
				...camelizeObject(pacient[0]),
				role: UserRole.PACIENTE,
				specialists: camelizeObject(specialists)
			}
			return res.status(200).json(response)
		}
	}catch (error: unknown) {
		console.log(error)
		return handleControllerError(error,res)
	} 
}
