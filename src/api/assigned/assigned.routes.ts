import { Router } from 'express'

//Consts
import { UserRole } from '../../utils/roles.enum'

//Schemas
import { AddAssigmentSchema } from './assigned.schema'

//Middlewares
import { hasAuthorization } from '../../middlewares/auth'
import { schemaGuard } from '../../middlewares/schema-guard'

//Controllers
import { getAssignments } from './actions/get.action'
import { addAssigment } from './actions/add.action'
import { deleteAssigment } from './actions/delete.action'
const router = Router()

//Routes
router.get('/',hasAuthorization([UserRole.ESPECIALISTA, UserRole.PACIENTE]), getAssignments)
router.post('/',hasAuthorization([UserRole.ESPECIALISTA]), schemaGuard(AddAssigmentSchema), addAssigment)

router.delete('/:assignedId', hasAuthorization([UserRole.ESPECIALISTA]), deleteAssigment)
export default router