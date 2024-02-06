import {Router} from 'express'

// Middlewares

// Schemas

// Controllers
import { getAntropometricos } from './actions/get.action'
import { addAntropometrico } from './actions/add.action'
import { updateAntropometrico } from './actions/update.action'
import { deleteAntropometrico } from './actions/delete.action'
const router = Router()

//Routes
router.get('/', getAntropometricos)
router.post('/add/:pacientId', addAntropometrico)
router.put('/:antropometricoId', updateAntropometrico)
router.delete('/:antropometricoId', deleteAntropometrico)

export default router
