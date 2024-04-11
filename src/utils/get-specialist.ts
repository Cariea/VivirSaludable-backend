import { pool } from '../database'

export const getSpecialist = async (userId: string, specialtie: string): Promise<string> => {
	try {
		const { rows } = await pool.query({
			text: `
      SELECT specialists.user_id AS specialist_id
      FROM specialists
      JOIN specialties ON specialists.speciality_id = specialties.specialty_id
      JOIN assings ON specialists.user_id = assings.specialist_id
      JOIN pacients ON assings.pacient_id = pacients.user_id
      WHERE pacients.user_id = $1
      AND specialties.name = $2
      `,
			values: [userId, specialtie]
		})
		console.log(rows)
		return rows[0].specialist_id
	} catch (error: unknown) {
		console.log(error)
		return ''
	}
}