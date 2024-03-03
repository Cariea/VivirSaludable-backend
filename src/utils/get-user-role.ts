import { pool } from '../database'

export const getUserRole = async (userId: string): Promise<string> => {
	try {
		const { rows } = await pool.query({
			text: `
        SELECT role FROM users WHERE user_id = $1
      `,
			values: [userId]
		})
		return rows[0].role
	} catch (error: unknown) {
		console.log(error)
		return ''
	}
}