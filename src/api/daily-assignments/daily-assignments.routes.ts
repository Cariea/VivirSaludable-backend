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
import { getAssignments } from './actions/get-by-id.action'
import { updateDailyAssignmentStatus } from './actions/update.action'
const router = Router()

//Routes
router.get('/', hasAuthorization([UserRole.ESPECIALISTA]),getPacientAssignments)
router.get('/pacient', hasAuthorization([UserRole.PACIENTE]), getAssignments)
router.post('/', hasAuthorization([UserRole.PACIENTE]), addDailyAssignment)
router.put('/:recordId', hasAuthorization([UserRole.PACIENTE]), updateDailyAssignmentStatus)
router.delete('/:recordId', hasAuthorization([UserRole.PACIENTE]), deleteAssignment)

export default router