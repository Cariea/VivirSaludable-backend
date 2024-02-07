import { Router } from 'express'

//schemas
import { SymptomSchema } from './symptom.schema'
//Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'
//Controllers
import { getSymptoms } from './actions/get.action'
import { addSymptom } from './actions/add.action'
import { updateSymptom } from './actions/update.action'
import { deleteSymptom } from './actions/delete.action'

const router = Router()
//Routes
router.get('/:pacientId', getSymptoms)
router.post('/add',schemaGuard(SymptomSchema), addSymptom)
router.put('/:symptomId', updateSymptom)
router.delete('/:symptomId', deleteSymptom)

export default router