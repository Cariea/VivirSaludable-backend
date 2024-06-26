import { Router } from 'express'

// Schemas
import { IndicationSchema } from './indication.schema'
// Middlewares
import { hasAuthorization } from '../../middlewares/auth'
import { schemaGuard } from '../../middlewares/schema-guard'

// Controllers
import { addIndication } from './actions/add.action'
import { deleteIndication } from './actions/delete.action'
import { getBySpecialistId } from './actions/get-by-specialist-id.action'
import { updateIndication } from './actions/update.action'
import { getIndications } from './actions/get-for-linker'
import { getIndications as getIndicationsCompliance} from './actions/get-for-reports'
import { UserRole } from '../../utils/roles.enum'

const router = Router()

router.use(hasAuthorization([UserRole.ESPECIALISTA]))

router.get('/', getBySpecialistId)
router.get('/get-for-reports', getIndicationsCompliance)
router.get('/get-for-linker', getIndications)
router.post('/add',schemaGuard(IndicationSchema), addIndication)
router.put('/:indicationId',schemaGuard(IndicationSchema), updateIndication)
router.delete('/:indicationId', deleteIndication)

export default router
