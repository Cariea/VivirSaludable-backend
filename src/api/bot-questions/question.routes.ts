import { Router } from 'express'



//Controllers
import { getQuestions } from './actions/get.action'
import { addQuestion } from './actions/add.action'
import { updateQuestion } from './actions/update.action'
import { deleteQuestion } from './actions/delete.action'

const router = Router()
//Routes
router.get('/', getQuestions)
router.post('/add', addQuestion)
router.put('/:questionId', updateQuestion)
router.delete('/:questionId', deleteQuestion)

export default router