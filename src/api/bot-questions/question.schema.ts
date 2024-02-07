import {z} from 'zod'

export const QuestionSchema = z.object({
	question: z.string(),
	answer: z.string()
})