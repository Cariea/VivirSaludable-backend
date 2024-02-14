import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import bcrypt from 'bcrypt'
import { AUTH_ROUNDS } from '../../../config'
export const updateUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { userId } = req.params
		const { name, email, phone, programId, specialityId, address, password } = req.body

		if(!userId || !name || !email || !phone || !password || !address){
			return res.status(STATUS.BAD_REQUEST).json({message: 'datos incompletos'})
		}

		const { rows } = await pool.query({
			text: `
      SELECT EXISTS (SELECT 1 FROM users WHERE user_id = $1) AS exists, role
      FROM users
      WHERE user_id = $1;
      `,
			values: [userId]
		})
		if (rows[0].exists === false) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Usuario no encontrado' })
		}

		const epassword = await bcrypt.hash(password, Number(AUTH_ROUNDS))

		if( rows[0].role === 'pacient'){

			if(!programId){
				return res.status(STATUS.BAD_REQUEST).json({message: 'Se requiere el id del programa'})
			}

			await pool.query({
				text: `
          UPDATE pacients
          SET name = $1, email = $2, phone = $3, status = $4, password = $5, address = $6
          WHERE user_id = $7
        `,
				values: [name, email, phone, true, epassword, address,userId]
			})

			await pool.query({
				text:`
          UPDATE belongs
          SET program_id = $1
          WHERE pacient_id = $2
        `,
				values: [programId, userId]
			})
      
		}
		console.log('rows[0].role', rows[0].role)
		if( rows[0].role === 'specialist'){
			if(!specialityId){
				return res.status(STATUS.BAD_REQUEST).json({message: 'Se requiere el id de la especialidad'})
			}
			await pool.query({
				text: `
          UPDATE specialists
          SET name = $1, email = $2, phone = $3, speciality_id = $4, password = $5 ,address = $6
          WHERE user_id = $7
        `,
				values: [name, email, phone, specialityId, epassword, address, userId]
			})
		}
		console.log('Usuario actualizado')

		return res.status(STATUS.OK).json({ message: 'Usuario actualizado' })
	} catch (error: any) {
		console.error(error)
		return handleControllerError(error, res)
	}
}