import { Router } from 'express'

//Consts
import { UserRole } from '../../utils/roles.enum'

//Middlewares
import { hasAuthorization } from '../../middlewares/auth'

//Controllers
import { getAlerts } from './actions/get.action'
import { updateAlert } from './actions/update.action'
import {addAlert} from './actions/add.action'

const router = Router()

//Routes
router.get('/', hasAuthorization([UserRole.PACIENTE, UserRole.ESPECIALISTA]), getAlerts)
router.put('/:alertId', hasAuthorization([UserRole.PACIENTE, UserRole.ESPECIALISTA]), updateAlert)
router.post('/add', hasAuthorization([UserRole.PACIENTE, UserRole.ESPECIALISTA]), addAlert)

export default router
