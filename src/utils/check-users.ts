import { pool } from '../database'

const transformToCommaSeparatedString = (data: string[]): string => {
	if (data.length === 0) {
		return '0'
	}

	const quotedIDs = data.map(id => `'${id}'`)
	return quotedIDs.join(',')
}



export const checkUsers = async (users: string[]):Promise<boolean> => {
	try {
		const { rows } = await pool.query({
			text: `
        SELECT user_id FROM users WHERE user_id in (${transformToCommaSeparatedString(users)})
          `,
		})
		const ret = rows.length === users.length
		return ret
	}
	catch (error: unknown) {
		console.error(error)
		return false
	}
}