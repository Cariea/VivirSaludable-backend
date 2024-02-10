import { Router } from 'express'

//consts

//Schemas
import { PutSecretionSchema, SecretionSchema } from './secretion.schema'
//Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'

//Controllers
import { getSecretions } from './actions/get.action'
import { addSecretion } from './actions/add.action'
import { updateSecretion } from './actions/update.action'
import { deleteSecretion } from './actions/delete.action'

const router = Router()

//Routes
router.get('/', getSecretions)
router.post('/add', schemaGuard(SecretionSchema), addSecretion)
router.put('/:recordId', schemaGuard(PutSecretionSchema), updateSecretion)
router.delete('/:recordId', deleteSecretion)
export default router