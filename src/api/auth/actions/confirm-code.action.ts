import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
// import { sendMail } from '../../../utils/send-mail-service'

export const generateCode = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { userId } = req.params
		console.log('userId', userId)
		let email = ''
		const { rows } = await pool.query({
			text: `
      SELECT EXISTS (SELECT 1 FROM users WHERE user_id = $1) AS exists, role
      FROM users
      WHERE user_id = $1;
      
      `,
			values: [userId]
		})
		console.log('rows', rows)
		console.log('rows[0].role', rows[0].role)
		console.log('rows[0].exists', rows[0].exists)

		if (rows[0].exists === false) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'Usuario no encontrado' })
		}

		const code = Math.floor(100000 + Math.random() * 900000)
		await pool.query({
			text: `
        update users
          set code = $1
          where user_id = $2
      `,
			values: [code, userId]
		})
		if (rows[0].role === 'pacient') {
			const { rows: pacient } = await pool.query({
				text: `
          SELECT email
          FROM pacients
          WHERE user_id = $1
        `,
				values: [userId]
			})
			email = pacient[0].email
		}else{
			const { rows: specialist } = await pool.query({
				text: `
          SELECT email
          FROM specialists
          WHERE user_id = $1
        `,
				values: [userId]
			})
			email = specialist[0].email
		}

  
		console.log('su codigo es: ', code, 'y su email es: ', email)
		// await sendMail(
		// 	email,
		// 	'Código de confirmación',
		// 	`Tu código de confirmación es: ${code}`
		// )

		return res.status(STATUS.OK).json({ message: 'Código enviado' })
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}