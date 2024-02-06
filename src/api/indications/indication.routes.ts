import { Router } from 'express'

// Schemas

// Middlewares
import { hasAuthorization } from '../../middlewares/auth'

// Controllers
import { addIndication } from './actions/add.action'
import { deleteIndication } from './actions/delete.action'
import { getBySpecialistId } from './actions/get-by-specialist-id.action'
import { updateIndication } from './actions/update.action'
import { UserRole } from '../../utils/roles.enum'

const router = Router()

router.use(hasAuthorization([UserRole.ESPECIALISTA]))

router.get('/', getBySpecialistId)
router.post('/add', addIndication)
router.put('/:indicationId', updateIndication)
router.delete('/:indicationId', deleteIndication)

export default router
