import { Router } from 'express'

//Consts

//Schemas

//Middlewares

//Controllers
import { getMessages } from './actions/get.action'
const router = Router()

//Routes
router.get('/', getMessages)
export default router