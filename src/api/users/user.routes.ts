import { Router } from 'express'

//Schemas
import { UserSchema } from './user.schema'
// Consts
import { AdminRoles } from '../../utils/roles.enum'

//Middlewares
import { hasAuthorization } from '../../middlewares/auth'
import { schemaGuard } from '../../middlewares/schema-guard'

//Controllers
import { getAllUsers } from './actions/get.action'
import { signUp } from '../users/actions/register.action'

const router = Router()

//Routes
router.get('/', hasAuthorization([AdminRoles.ASISTENT]),getAllUsers)
router.post('/register',hasAuthorization([AdminRoles.ASISTENT]), schemaGuard(UserSchema), signUp)
export default router