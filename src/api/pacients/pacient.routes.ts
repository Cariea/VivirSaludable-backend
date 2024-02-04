/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

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

router.get('/me', hasAuthorization('pacient'), getMe)
router.get('/:pacientId', hasAuthorization('specialist'), getByPacientId)
router.get('/', hasAuthorization('specialist'), getPacients)
router.put('/:pacientId', hasAuthorization('asistent'), updatePacient)

export default router
