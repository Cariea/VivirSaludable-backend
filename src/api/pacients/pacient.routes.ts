/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
// Constants
import { AdminRoles, UserRole } from '../../utils/roles.enum'
// Schemas
import { updatePacientSchema } from './pacient.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'
import { hasAuthorization } from '../../middlewares/auth'

// Controllers
import { getPacients } from './actions/get.action'
import { getByPacientId } from './actions/get-by-pacient-id.action'
import { getMe } from './actions/get-me.action'
import { getSpecialistPacients } from './actions/get-specialist-pacients.action'

import { updatePacient } from './actions/update.action'

const router = Router()

router.get('/me', hasAuthorization([UserRole.ESPECIALISTA, UserRole.PACIENTE]), getMe)
router.get('/:pacientId', hasAuthorization([UserRole.ESPECIALISTA]), getByPacientId)
router.get('/specialist/pacients', hasAuthorization([UserRole.ESPECIALISTA]), getSpecialistPacients)
router.get('/', hasAuthorization([UserRole.ESPECIALISTA]), getPacients)
router.put('/:pacientId', hasAuthorization([AdminRoles.ASISTENT]),schemaGuard(updatePacientSchema), updatePacient)

export default router
