import {Router} from 'express'

// Schemas
import { AntropometricoSchema } from './antropometrico.schema'
// Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'
// Controllers
import { getAntropometricos } from './actions/get.action'
import { addAntropometrico } from './actions/add.action'
import { updateAntropometrico } from './actions/update.action'
import { deleteAntropometrico } from './actions/delete.action'
const router = Router()

//Routes
router.get('/', getAntropometricos)
router.post('/add/:pacientId',schemaGuard(AntropometricoSchema),  addAntropometrico)
router.put('/:antropometricoId',schemaGuard(AntropometricoSchema),  updateAntropometrico)
router.delete('/:antropometricoId', deleteAntropometrico)

export default router
