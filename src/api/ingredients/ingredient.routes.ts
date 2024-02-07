import { Router } from 'express'

//schemas

//Middlewares

//Controllers
import { getIngredients } from './actions/get.action'
import { deleteIngredient } from './actions/delete.action'
import { addIngredient } from './actions/add.action'
import { updateIngredient } from './actions/update.action'
const router = Router()

//Routes
router.get('/:mealId', getIngredients)
router.delete('/:ingredientId', deleteIngredient)
router.post('/add', addIngredient)
router.put('/update/:ingredientId', updateIngredient)
export default router