import { Router } from 'express'

const router = Router()

//Controllers
import { getAllUsers } from './actions/get.action'

//Routes
router.get('/', getAllUsers)

export default router