import {Router} from 'express'

//schemas

//Middlewares

//Controllers
import { getMeals } from './actions/get.action'
import { deleteMeal } from './actions/delete.action'
import { addMeal } from './actions/add.action'
import { updateMeal } from './actions/update.action'
const router = Router()

//Routes
router.get('/', getMeals)
router.post('/add/:pacientId', addMeal)
router.put('/update/:mealId', updateMeal)
router.delete('/:mealId', deleteMeal)

export default router