import { Router } from 'express'

//Consts
import { UserRole } from '../../utils/roles.enum'

//Schemas
import { AddHealtQuerySchema } from './health-querie.schema'
//Middlewares
import { hasAuthorization } from '../../middlewares/auth'
import { schemaGuard } from '../../middlewares/schema-guard'

//Controllers
import { getHealthQueries } from './actions/get.action'
import { addHealthQuery } from './actions/add.action'
import { deleteHealthQuery } from './actions/delete.action'
import { updateQueryHealth } from './actions/update.action'

const router = Router()

//Routes
router.get('/', getHealthQueries)
router.post('/',hasAuthorization([UserRole.ESPECIALISTA]), schemaGuard(AddHealtQuerySchema), addHealthQuery)
router.delete('/:quoteId',hasAuthorization([UserRole.ESPECIALISTA]), deleteHealthQuery)
router.put('/:quoteId',hasAuthorization([UserRole.ESPECIALISTA]), updateQueryHealth)
export default router