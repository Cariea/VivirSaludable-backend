import { Router } from 'express'
// Constants
import { AdminRoles } from '../../utils/roles.enum'
// Middlewares
import { hasAuthorization } from '../../middlewares/auth'

// Controllers
import { getPrograms }  from './actions/get.action'
import { addProgram } from './actions/add.action'
import { updateProgram } from './actions/update.action'
import { deleteProgram } from './actions/delete.action'

const router = Router()

router.use(hasAuthorization([AdminRoles.ASISTENT]))
router.get('/', getPrograms)
router.post('/add', addProgram)
router.put('/:programId', updateProgram)
router.delete('/:programId', deleteProgram)

export default router
