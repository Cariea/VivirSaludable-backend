import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { ExtendedRequest } from '../../../middlewares/auth'
import { validarFormatoFecha } from '../../../utils/validate-date'

export const addHealthQuery = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response | undefined> => {
	try {
		const { pacientId, quoteDate } = req.body
		if(!validarFormatoFecha(quoteDate)){
			return res.status(STATUS.BAD_REQUEST).json({message: 'El formato de la fecha es incorrecto'})
		}
		const response = await pool.query({
			text: `
        INSERT INTO health_queries (
          pacient_id,
          specialist_id,
          quote_date
        ) 
        VALUES ($1, $2, $3)
        RETURNING
          pacient_id,
          specialist_id,
          quote_date
      `,
			values: [pacientId, req.user?.id, quoteDate]
		})
		if(response.rows.length === 0){
			return res.status(STATUS.BAD_REQUEST).json({message: 'No se pudo agregar la consulta'})
		}
		return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
	}
	catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}