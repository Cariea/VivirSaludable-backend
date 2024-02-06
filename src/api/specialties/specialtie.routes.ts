import { Router } from 'express'

// Middlewares
// import { hasAuthorization } from '../../middlewares/auth'

// // Schema
// import { SpecialtieSchema } from './specialtie.schema'

// Controllers
import { getSpecialties } from './actions/get.action'
import { addSpecialty } from './actions/add.action'
import { updateSpecialty } from './actions/update.action'
import { deleteSpecialty } from './actions/delete.action'
const router = Router()

router.get('/', getSpecialties)
router.post('/add', addSpecialty)
router.put('/:specialtyId', updateSpecialty)
router.delete('/:specialtyId', deleteSpecialty)

export default router