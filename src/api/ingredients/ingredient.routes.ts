import { Router } from 'express'

//schemas
import { AddIngredientSchema } from './ingredient.schema'
import { UpdateIngredientSchema } from './ingredient.schema'

//Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'

//Controllers
import { getIngredients } from './actions/get.action'
import { deleteIngredient } from './actions/delete.action'
import { addIngredient } from './actions/add.action'
import { updateIngredient } from './actions/update.action'
const router = Router()

//Routes
router.get('/', getIngredients)
router.post('/add', schemaGuard(AddIngredientSchema), addIngredient)
router.put('/:ingredientId',schemaGuard(UpdateIngredientSchema), updateIngredient)
router.delete('/:ingredientId', deleteIngredient)

export default router