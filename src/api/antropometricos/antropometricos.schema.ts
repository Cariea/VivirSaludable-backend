import { z } from 'zod'

export const AntropometricoSchema = z.object({
	specialistId: z
		.string(),
	pacientId: z
		.string(),
	armCircumference: z
		.number()
		.min(1, 'Arm circumference is too short'),
	legCircumference: z
		.number()
		.min(1, 'Leg circumference is too short'),
	waist: z
		.number()
		.min(1, 'Waist is too short'),
	hip: z
		.number()
		.min(1, 'Hip is too short'),
	weight: z
		.number()
		.min(1, 'Weight is too short'),
	size: z
		.number()
		.min(1, 'Size is too short'),
	musculoskeletalMass: z
		.number()
		.min(1, 'Musculoskeletal mass is too short'),
	bodyFatMass: z
		.number()
		.min(1, 'Body fat mass is too short'),
	bodyMassIndex: z
		.number()
		.min(1, 'Body mass index is too short'),
	bodyFatPercentage: z
		.number()
		.min(1, 'Body fat percentage is too short'),
	waistHipRatio: z
		.number()
		.min(1, 'Waist hip ratio is too short'),
	visceralFatLevel: z
		.number()
		.min(1, 'Visceral fat level is too short')
})