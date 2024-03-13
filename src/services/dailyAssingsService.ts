import { pool } from '../database'
import cron from 'node-cron'
import camelizeObject from '../utils/camelize-object'

type assings ={
  specialistId: string,
  indicationId: number,
  pacientId: string


}

export const dailyAssingsService = cron.schedule('0 1 * * *', async () => {
	try {
		const response = await pool.query({
			text:`
      SELECT specialist_id, indication_id, pacient_id 
      FROM assigned
      `,}
		)
	
		const assings = camelizeObject(response.rows) as assings[]
		assings.map(assing =>  {
			pool.query({
				text: `
      INSERT INTO daily_assing (specialist_id, indication_id, pacient_id)
      VALUES ($1, $2, $3)
      `,
				values: [assing.specialistId, assing.indicationId, assing.pacientId]
			})
			console.log(`Se a creado la asignacion diaria del especialista ${assing.specialistId} con el paciente ${assing.pacientId} y la indicacion ${assing.indicationId}`)
		})
	} catch (error) {
		console.log(error)
	}
})
