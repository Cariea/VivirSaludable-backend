import { Router } from 'express'

// Consts
import { AdminRoles } from '../../utils/roles.enum'

//Middlewares
import { hasAuthorization } from '../../middlewares/auth'

//Controllers
import { getAllUsers } from './actions/get.action'

const router = Router()

//Routes
router.get('/', hasAuthorization([AdminRoles.ASISTENT]),getAllUsers)

export default router