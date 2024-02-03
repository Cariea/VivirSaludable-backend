import { AUTH_EXPIRE, AUTH_SECRET } from '../../../config'
import { pool } from '../../../database'
import { User } from '../../../types'
import camelizeObject from '../../../utils/camelize-object'
import jwt from 'jsonwebtoken'

export async function generateToken (email: string, table: string): Promise<any> {
  const { rows: response } = await pool.query({
    text: `
      SELECT
        user_id,
        email,
        name,
        role
      FROM ${table}
      WHERE
        email = $1
    `,
    values: [email]
  })
  const data: User = camelizeObject(response[0]) as User
  const userForToken = {
    id: data.userId,
    name: data.name,
    email: data.email,
    role: data.role
  }
  const token = jwt.sign(userForToken, String(AUTH_SECRET), {
    expiresIn: AUTH_EXPIRE
  })
  const dataToken = { ...userForToken, token }

  return dataToken
}
