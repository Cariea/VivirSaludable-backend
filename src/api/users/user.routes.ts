import { Router } from 'express'

//Schemas
import { UserSchema } from './user.schema'
// Consts
import { AdminRoles, UserRole } from '../../utils/roles.enum'

//Middlewares
import { hasAuthorization } from '../../middlewares/auth'
import { schemaGuard } from '../../middlewares/schema-guard'

//Controllers
import { getAllUsers } from './actions/get.action'
import { signUp } from '../users/actions/register.action'
import { updateUser } from './actions/update.action'
import { getByUserId } from './actions/get-by-user-id.action'
import { getContacts } from './actions/get-contacts'
const router = Router()

//Routes
router.get('/', hasAuthorization([AdminRoles.ASISTENT]),getAllUsers)
router.get('/contacts', hasAuthorization([UserRole.PACIENTE,UserRole.ESPECIALISTA]),getContacts)
router.get('/:userId',hasAuthorization([AdminRoles.ASISTENT]), getByUserId)
router.post('/register',hasAuthorization([AdminRoles.ASISTENT]), schemaGuard(UserSchema), signUp)
router.put('/:userId',hasAuthorization([AdminRoles.ASISTENT]), updateUser)
export default router