import { Response } from 'express'
import { pool } from '../../../database'
import {  STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'

export const getContacts = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	let response

	try {

		if(req.user?.role === 'pacient') {

			const { rows: contacts } = await pool.query({
				text: `
            SELECT 
            s.user_id AS userId,
            s.name AS name,
            sp.name AS specialty,
            m.message AS last_message,
            m.user_id AS last_message_sender_id,
            m.created_at AS last_message_date
          FROM 
            assings a
          JOIN 
            specialists s ON a.specialist_id = s.user_id
          JOIN 
            specialties sp ON s.speciality_id = sp.specialty_id
          LEFT JOIN (
            SELECT 
              user_id,
              user_receptor,
              MAX(message_id) AS last_message_id
            FROM 
              messages
            GROUP BY 
              user_id, user_receptor
          ) max_messages ON a.pacient_id = max_messages.user_id AND s.user_id = max_messages.user_receptor
          OR a.specialist_id = max_messages.user_id AND a.pacient_id = max_messages.user_receptor
          LEFT JOIN messages m ON max_messages.user_id = m.user_id AND max_messages.last_message_id = m.message_id
          OR max_messages.user_receptor = m.user_id AND max_messages.last_message_id = m.message_id
          WHERE 
              a.pacient_id = $1 AND a.assigned_status = true AND a.alta = false
        `,
				values: [req.user?.id ]
			})
			response = contacts
		} else {
			const { rows: contacts } = await pool.query({
				text: `
          SELECT 
            p.user_id AS userId,
            p.name AS name,
            pr.name AS program,
            m.message AS last_message,
            m.user_id AS last_message_sender_id,
            m.created_at AS last_message_date
          FROM 
            assings a
          JOIN 
            belongs b ON a.pacient_id = b.pacient_id AND a.asistent_id = b.asistent_id
          JOIN 
            pacients p ON a.pacient_id = p.user_id
          JOIN 
            programs pr ON b.program_id = pr.program_id
          LEFT JOIN LATERAL (
            SELECT 
              message,
              user_id,
              created_at
            FROM 
              messages
            WHERE 
              (user_id = p.user_id AND user_receptor = $1) OR
              (user_id = $1 AND user_receptor = p.user_id)
            ORDER BY 
              created_at DESC
            LIMIT 1
          ) m ON true
          WHERE 
            a.specialist_id = $1 AND a.assigned_status = true AND a.alta = false
        `,
				values: [req.user?.id]
			})
			response = contacts
		}



		return res.status(STATUS.OK).json(camelizeObject(response))
	} catch (error: unknown) {
		return handleControllerError(error, res)
	}
}

