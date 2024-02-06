/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
// Constants
import { AdminRoles, UserRole } from '../../utils/roles.enum'
// Schemas
// import { PacientSchema } from './pacient.schema'

// Middlewares
// import { schemaGuard } from '../../middlewares/schema-guard'
import { hasAuthorization } from '../../middlewares/auth'

// Controllers
import { getPacients } from './actions/get.action'
import { getByPacientId } from './actions/get-by-pacient-id.action'
import { getMe } from './actions/get-me.action'
import { updatePacient } from './actions/update.action'

const router = Router()

router.get('/me', hasAuthorization([AdminRoles.ASISTENT]), getMe)
router.get('/:pacientId', hasAuthorization([UserRole.ESPECIALISTA]), getByPacientId)
router.get('/', hasAuthorization([UserRole.ESPECIALISTA]), getPacients)
router.put('/:pacientId', hasAuthorization([AdminRoles.ASISTENT]), updatePacient)

export default router
