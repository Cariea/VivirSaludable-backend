import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from '../config'

import { UploadedFile } from 'express-fileupload'

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	secure: true
})

type MyFile = Express.Multer.File | UploadedFile

export async function uploadImage (file: MyFile | MyFile[]): Promise<UploadApiResponse> {
	const filesArray = Array.isArray(file) ? file : [file]

	const imageBuffer = 'buffer' in filesArray[0] ? filesArray[0].buffer : filesArray[0].data

	const base64Image = imageBuffer.toString('base64')

	return cloudinary.uploader.upload(`data:image/webp;base64,${base64Image}`, {
		folder: 'meals'
	})
}

export async function deleteImage (imageId: string): Promise<void> {
	await cloudinary.uploader.destroy(imageId)
}


const validImageFormats = ['jpeg', 'png', 'svg', 'webp', 'jpg']

export const isValidImageFormat = (fileName?: string): boolean => {
	if (fileName == null) {
		return false
	}
	const extension = fileName.split('.').pop()?.toLowerCase()

	if (extension == null) {
		return false
	}

	return validImageFormats.includes(extension)
}
