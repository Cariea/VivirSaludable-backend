import { Response, Request} from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'

export const deleteActivity = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { activityId } = req.params
	console.log(activityId)
	try {
		const { rows } = await pool.query({
			text: `
        DELETE FROM activities
        WHERE activity_id = $1
        RETURNING *
      `,
			values: [activityId]
		})
		if(rows.length === 0){
			return res.status(STATUS.NOT_FOUND).json({message: 'Actividad no encontrada'})
		}
		return res.status(STATUS.OK).json(rows[0])
	} catch (error) {
		return handleControllerError(error, res)
	} 
}
