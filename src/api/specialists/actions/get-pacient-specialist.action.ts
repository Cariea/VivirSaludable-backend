import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getPacientSpecialists = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const response = await pool.query({
			text: `
      SELECT 
    s.user_id AS user_id,
    s.name AS name,
    sp.name AS especialty,
    CASE 
        WHEN DATE_TRUNC('day', hq.quote_date) = DATE_TRUNC('day', CURRENT_TIMESTAMP - INTERVAL '4 hours') THEN 'hoy'
        WHEN DATE_TRUNC('day', hq.quote_date) < DATE_TRUNC('day', CURRENT_TIMESTAMP - INTERVAL '4 hours') THEN 'no planificada'
        ELSE COALESCE(
            TO_CHAR(hq.quote_date, 'DD-MM-YYYY'),
            'no planificada'
        )
    END AS next_health_query_date
FROM 
    assings a
INNER JOIN 
    specialists s ON a.specialist_id = s.user_id
INNER JOIN 
    specialties sp ON s.speciality_id = sp.specialty_id
LEFT JOIN LATERAL (
    SELECT quote_date
    FROM health_queries
    WHERE specialist_id = s.user_id AND pacient_id = a.pacient_id
    ORDER BY quote_date DESC
    LIMIT 1
) AS hq ON true
WHERE 
    a.pacient_id = $1 AND
    a.assigned_status = TRUE AND
    a.alta = FALSE 
ORDER BY 
    next_health_query_date ASC;

  
  
      `,
			values: [req.user?.id]
		})
		return res.status(STATUS.OK).json(camelizeObject(response.rows))
	} catch (error) {
		return handleControllerError(error,res )
	}
}