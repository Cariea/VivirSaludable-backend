import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handle-controller-error'
import fileUpload from 'express-fileupload'
import camelizeObject from '../../../utils/camelize-object'
import {isValidImageFormat, uploadImage} from '../../../utils/cloudinary'
import { ExtendedRequest } from '../../../middlewares/auth'
import { getSpecialist } from '../../../utils/get-specialist'
export const addMeal = async (
	req: ExtendedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { description, wasSatisfied, indicateHour, pica, ingredients } = req.body
		const ingredientsObject = JSON.parse(ingredients)
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
			values: [req.user?.id, description, imageUrl, wasSatisfied, indicateHour, pica]
		})

		const mealId = rows[0].meal_id

		ingredientsObject.forEach(async (ingredient: any) => {
			const {type, name, quantity} = ingredient
			await pool.query({
				text: `
          INSERT INTO ingredients (
            pacient_id,
            meal_id,
            ingredient_type,
            name,
            volume
          ) VALUES ($1, $2, $3, $4, $5)
        `,
				values: [req.user?.id, mealId, type, name, quantity]
			})
		})

		const specialist_id = await getSpecialist(req.user?.id as string,'nutricionista')

		await pool.query({
			text: `
      INSERT INTO alerts (
        user_id,
        user_receptor,
        alert,
        severity,
        type
      ) 
      VALUES ($1, $2, $3, $4, $5)
      `,
			values: [req.user?.id, specialist_id, 'Se ha añadido una nueva comida', '1', 'meal']
		})
		

		return res.status(STATUS.OK).json(camelizeObject(rows[0]))
	} catch (error: unknown) {
		console.error(error)
		return handleControllerError(error, res)
	}
}