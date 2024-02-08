import { Router } from 'express'

// Consts
import { AdminRoles } from '../../utils/roles.enum'

// Schemas

// Middlewares
import { hasAuthorization } from '../../middlewares/auth'

// Controllers
import { getBelongs } from './actions/get.action'
import { addBelong } from './actions/add.action'
import { deleteBelong } from './actions/delete.action'
const router = Router()

// Routes
router.get('/',hasAuthorization([AdminRoles.ASISTENT]), getBelongs)
router.post('/add',hasAuthorization([AdminRoles.ASISTENT]), addBelong)
router.delete('/:pacientId',hasAuthorization([AdminRoles.ASISTENT]), deleteBelong)


export default router