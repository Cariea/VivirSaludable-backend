import { Router } from 'express'

// Schemas
import {ProgramSchema} from './program.schema'

// Constants
import { AdminRoles } from '../../utils/roles.enum'

// Middlewares
import { hasAuthorization } from '../../middlewares/auth'
import { schemaGuard } from '../../middlewares/schema-guard'

// Controllers
import { getPrograms }  from './actions/get.action'
import { addProgram } from './actions/add.action'
import { updateProgram } from './actions/update.action'
import { deleteProgram } from './actions/delete.action'

const router = Router()

router.use(hasAuthorization([AdminRoles.ASISTENT]))
router.get('/', getPrograms)
router.post('/add', schemaGuard(ProgramSchema), addProgram)
router.put('/:programId', schemaGuard(ProgramSchema), updateProgram)
router.delete('/:programId', deleteProgram)

export default router
