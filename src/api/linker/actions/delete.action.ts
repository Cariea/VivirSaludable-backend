import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

// CREATE TABLE assings (
//   asistent_id dom_id_card,
//   specialist_id dom_id_card,
//   pacient_id dom_id_card,
//   assigned_date dom_created_at,
//   alta BOOLEAN DEFAULT FALSE,
//   assigned_status BOOLEAN DEFAULT TRUE,
//   created_at dom_created_at,
//   updated_at dom_created_at,
//   CONSTRAINT pk_assings PRIMARY KEY (asistent_id,specialist_id,pacient_id),
//   CONSTRAINT fk_asistent_id FOREIGN KEY (asistent_id) REFERENCES asistents(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//   CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//   CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

export const deleteLinker = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const { specialistId, pacientId } = req.body
	try {
		const { rows } = await pool.query({
			text: `
        DELETE FROM assings
        WHERE specialist_id = $1 AND pacient_id = $2
        RETURNING *
      `,
			values: [specialistId, pacientId]
		})
		return res.status(STATUS.OK).json(rows[0])
	}
	catch (error: unknown) {
		return handleControllerError(error,res)
	}
}