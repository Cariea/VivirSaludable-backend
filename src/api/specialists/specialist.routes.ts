/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Schemas
// import { PacientSchema } from './pacient.schema'

// Middlewares
// import { schemaGuard } from '../../middlewares/schema-guard'
//import { hasAuthorization } from '../../middlewares/auth'

// Controllers
import { getSpecialists } from './actions/get.action'
import {  getBySpecialistsId } from './actions/get-by-specialist-id.action'
import { getMe } from './actions/get-me.action'
import {  updateSpecialists } from './actions/update.action'
import { getPacientSpecialists } from './actions/get-pacient-specialist.action'

const router = Router()

router.get('/me', getMe)
router.get('/pacient', getPacientSpecialists)
router.get('/:specialistId', getBySpecialistsId)
router.get('/', getSpecialists)
router.put('/:specialistId', updateSpecialists)

export default router
