/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LoginSchema } from './auth.schema'
// Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'


// Controllers
import { logIn } from './actions/login.action'
import { generateCode } from '../auth/actions/confirm-code.action'


const router = Router()

router.get('/confirm-code/:userId', generateCode)
router.post('/login', schemaGuard(LoginSchema), logIn)
export default router
