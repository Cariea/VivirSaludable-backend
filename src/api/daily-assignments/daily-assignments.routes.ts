import { Router } from 'express'

//Consts
import { UserRole } from '../../utils/roles.enum'
//Schemas

//Middlewares
import { hasAuthorization } from '../../middlewares/auth'
//Controllers
import { getPacientAssignments } from './actions/get.action'
import { addDailyAssignment } from './actions/add.action'
import { deleteAssignment } from './actions/delete.action'

const router = Router()

//Routes
router.get('/', hasAuthorization([UserRole.ESPECIALISTA]),getPacientAssignments)
router.post('/', hasAuthorization([UserRole.PACIENTE]), addDailyAssignment)
router.delete('/:recordId', hasAuthorization([UserRole.PACIENTE]), deleteAssignment)

export default router