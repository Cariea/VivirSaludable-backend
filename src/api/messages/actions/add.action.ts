import { pool } from '../../../database'


export const addMessage = async (from: string, to: string, message: string): Promise<void> => {
	try {
		await pool.query({
			text: `
      INSERT INTO messages (
        user_id,
        user_receptor,
        message
        ) VALUES ($1, $2, $3)
      `,
			values: [from, to, message]
		})
	} catch (error: unknown) {
		console.error(error)
	}
}