import {Router} from 'express'

// Consts

// Schemas

// Middlewares

// Controllers
import { getPPSymptoms } from './actions/get.action'
import { addPPSymptom } from './actions/add.action'
import { deleteSymptom } from '../symptoms/actions/delete.action'
const router = Router()

// Routes
router.get('/:pacientId', getPPSymptoms)
router.post('/add', addPPSymptom)
router.delete('/:symptomId', deleteSymptom)

export default router