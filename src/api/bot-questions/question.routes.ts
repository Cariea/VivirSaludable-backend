import { Router } from 'express'

// Schemas
import { QuestionSchema } from './question.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'

//Controllers
import { getQuestions } from './actions/get.action'
import { addQuestion } from './actions/add.action'
import { updateQuestion } from './actions/update.action'
import { deleteQuestion } from './actions/delete.action'

const router = Router()
//Routes
router.get('/', getQuestions)
router.post('/add',schemaGuard(QuestionSchema), addQuestion)
router.put('/:questionId',schemaGuard(QuestionSchema), updateQuestion)
router.delete('/:questionId', deleteQuestion)

export default router