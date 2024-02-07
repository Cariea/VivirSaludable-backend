import {Router} from 'express'

//schemas
import { AddMealSchema, UpdateMealSchema } from './meal.schema'

//Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'

//Controllers
import { getMeals } from './actions/get.action'
import { deleteMeal } from './actions/delete.action'
import { addMeal } from './actions/add.action'
import { updateMeal } from './actions/update.action'
const router = Router()

//Routes
router.get('/', getMeals)
router.post('/add/:pacientId', schemaGuard(AddMealSchema), addMeal)
router.put('/update/:mealId',  schemaGuard(UpdateMealSchema),updateMeal)
router.delete('/:mealId', deleteMeal)

export default router