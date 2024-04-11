import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { AUTH_ROUNDS } from '../../../config'
import { sendMail } from '../../../utils/send-mail-service'



export const newPassword = async (
	req: Request,
	res: Response
): Promise<Response | undefined> => {
	try {
		const { email } = req.body
		console.log(email)
		const pacient = await pool.query({
			text: `
        SELECT EXISTS
        (SELECT 1 FROM pacients WHERE email = $1);
      `,
			values: [email],
		})

		const specialist = await pool.query({
			text: `
        SELECT EXISTS 
        (SELECT 1 FROM specialists WHERE email = $1);
      `,
			values: [email],
		})

		console.log(pacient)
		console.log(specialist)

		const code = Math.floor(Math.random() * 900000) + 100000
		const password = await bcrypt.hash(String(code), Number(AUTH_ROUNDS))
    
		if(pacient.rows[0].exists === true){
			
			await pool.query({
				text: `
          UPDATE pacients
          SET password = $1
          WHERE email = $2
          RETURNING email
        `,
				values: [password, email],
			})
                
		} else if(specialist.rows[0].exists === true){
			await pool.query({
				text: `
          UPDATE specialists
          SET password = $1
          WHERE email = $2
          RETURNING email
        `,
				values: [password, email],
			})
		}
		sendMail(email, 'Su nueva contraseña es',`<h1> ${code} </h1>`)
		

		return res.status(STATUS.OK).json({ message: 'Se ha enviado un correo con la nueva contraseña' })
	} catch (error) {
		return handleControllerError(error, res)
	}
}