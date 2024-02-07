import { Router } from 'express'

// Schema
import { SpecialtieSchema } from './specialtie.schema'

// Middlewares
// import { hasAuthorization } from '../../middlewares/auth'
import { schemaGuard } from '../../middlewares/schema-guard'


// Controllers
import { getSpecialties } from './actions/get.action'
import { addSpecialty } from './actions/add.action'
import { updateSpecialty } from './actions/update.action'
import { deleteSpecialty } from './actions/delete.action'
const router = Router()

router.get('/', getSpecialties)
router.post('/add', schemaGuard(SpecialtieSchema), addSpecialty)
router.put('/:specialtyId', schemaGuard(SpecialtieSchema), updateSpecialty)
router.delete('/:specialtyId', deleteSpecialty)

export default router