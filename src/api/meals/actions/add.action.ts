import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import fileUpload from 'express-fileupload'
import camelizeObject from '../../../utils/camelize-object'
import {isValidImageFormat, uploadImage} from '../../../utils/cloudinary'
export const addMeal = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { pacientId } = req.params
		const { description, wasSatisfied, indicateHour, pica } = req.body
		let imageUrl = ''
		if(req.files?.mealImage !== undefined){
			const mealImage = req.files.mealImage as fileUpload.UploadedFile
			if(!isValidImageFormat(mealImage.name)){
				return res.status(STATUS.BAD_REQUEST).json({message: 'El formato de imagen no admitido'})
			}
			const image = await uploadImage(mealImage)
			if(image === null){
				return res.status(STATUS.BAD_REQUEST).json({message: 'No se pudo subir la imagen'})
			}
			console.log('image', image)
			imageUrl = image.url
		}else{
			imageUrl = 'No se cargo una imagen'
		}

		const { rows } = await pool.query({
			text: `
		    INSERT INTO meals (
		      pacient_id,
		      description,
		      meal_image_url,
		      was_safistied,
		      indicate_hour,
		      pica
		    ) VALUES ($1, $2, $3, $4, $5, $6)
		    RETURNING 
		      meal_id
		  `,
			values: [pacientId, description, imageUrl, wasSatisfied, indicateHour, pica]
		})
		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}