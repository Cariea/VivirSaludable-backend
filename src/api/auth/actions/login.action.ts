import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import { generateToken } from '../_utils/generate-token'
import bcrypt from 'bcrypt'
export const logIn = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { userId, password } = req.body
    console.log('hola')
    const { rows: userResponse } = await pool.query({
      text: `
        SELECT
          user_id,
          password
        FROM users
        WHERE
          user_id = $1
      `,
      values: [userId]
    })
    console.log('hola')
    const { rows: asistentsResponse } = await pool.query({
      text: `
        SELECT
          user_id,
          password
        FROM asistents
        WHERE
          user_id = $1
      `,
      values: [userId]
    })
    console.log('hola')
    if (userResponse.length > 0) {
      const isPasswordCorrect = await bcrypt.compare(password, userResponse[0].password)
      if (isPasswordCorrect) {
        const token = await generateToken(userResponse[0].user_id, 'users')
        console.log(token)
        return res.status(STATUS.OK).json(token)
      }
    }
    console.log('hola')
    if (asistentsResponse.length > 0) {
      const isPasswordCorrect = await bcrypt.compare(password, asistentsResponse[0].password)
      if (isPasswordCorrect) {
        const token = await generateToken(asistentsResponse[0].user_id, 'asistents')
        console.log(token)
        return res.status(STATUS.OK).json(token)
      }
    }
    console.log('hola')
    return res.status(STATUS.UNAUTHORIZED).json({ message: 'Id o Contraseña Incorrecta' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
