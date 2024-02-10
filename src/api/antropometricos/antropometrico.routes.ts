import {Router} from 'express'

//Consts
import { UserRole } from '../../utils/roles.enum'

// Schemas
import { AntropometricoSchema } from './antropometrico.schema'
// Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'
import { hasAuthorization } from '../../middlewares/auth'
// Controllers
import { getAntropometricos } from './actions/get.action'
import { addAntropometrico } from './actions/add.action'
import { updateAntropometrico } from './actions/update.action'
import { deleteAntropometrico } from './actions/delete.action'
const router = Router()

//Routes
router.get('/', getAntropometricos)
router.post('/add', hasAuthorization([UserRole.ESPECIALISTA]),schemaGuard(AntropometricoSchema),  addAntropometrico)
router.put('/:antropometricoId',  hasAuthorization([UserRole.ESPECIALISTA]), schemaGuard(AntropometricoSchema),  updateAntropometrico)
router.delete('/:antropometricoId',  hasAuthorization([UserRole.ESPECIALISTA]), deleteAntropometrico)

export default router
