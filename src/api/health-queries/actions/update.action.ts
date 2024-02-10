import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import camelizeObject from '../../../utils/camelize-object'
import { validarFormatoFecha } from '../../../utils/validate-date'

export const updateQueryHealth = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { quoteId } = req.params
		const { quoteDate } = req.body
		if(!validarFormatoFecha(quoteDate)){
			return res.status(STATUS.BAD_REQUEST).json({message: 'El formato de la fecha es incorrecto'})
		}
	
		if(new Date(quoteDate) < new Date()){
			return res.status(STATUS.BAD_REQUEST).json({message: 'No se puede actualizar la fecha de una consulta que ya pasó'})
		}

		const { rows } = await pool.query({
			text: `
        UPDATE health_queries
        SET 
          quote_date = $1
        WHERE quote_id = $2
        RETURNING 
          quote_id,
          quote_date
      `,
			values: [quoteDate, quoteId]
		})
		if (!rows[0]) {
			return res.status(STATUS.NOT_FOUND).json({ message: 'No se puede actualizar la fecha de la consulta' })
		}
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	}catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}