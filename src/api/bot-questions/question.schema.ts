import {z} from 'zod'

export const QuestionSchema = z.object({
	specialistId: z.string(),
	question: z.string(),
	answer: z.string()
})