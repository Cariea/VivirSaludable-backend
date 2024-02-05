import { AUTH_EXPIRE, AUTH_SECRET } from '../../../config'
import jwt from 'jsonwebtoken'

export async function generateToken (userId: string, name: string, role: string): Promise<any> {
	const userForToken = {
		id: userId,
		name: name,
		role: role
	}
	const token = jwt.sign(userForToken, String(AUTH_SECRET), {
		expiresIn: AUTH_EXPIRE
	})
	const dataToken = { ...userForToken, token }

	return dataToken
}
