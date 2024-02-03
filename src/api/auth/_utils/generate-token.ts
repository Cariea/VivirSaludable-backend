import { AUTH_EXPIRE, AUTH_SECRET } from '../../../config'
import { pool } from '../../../database'
import { User } from '../../../types'
import camelizeObject from '../../../utils/camelize-object'
import jwt from 'jsonwebtoken'

export async function generateToken (userId: string, table: string): Promise<any> {
  const { rows: response } = await pool.query({
    text: `
      SELECT
        user_id,
        name,
        role
      FROM ${table}
      WHERE
        user_id = $1
    `,
    values: [userId]
  })
  const data: User = camelizeObject(response[0]) as User
  const userForToken = {
    id: data.userId,
    name: data.name,
    role: data.role
  }
  const token = jwt.sign(userForToken, String(AUTH_SECRET), {
    expiresIn: AUTH_EXPIRE
  })
  const dataToken = { ...userForToken, token }

  return dataToken
}
