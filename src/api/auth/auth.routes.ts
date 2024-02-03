/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LoginSchema } from './auth.schema'
import { UserSchema } from '../users/users.schema'
// Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'

// Middlewares
import { tokenGuard } from '../../middlewares/token-guard'
import { verifyToken } from '../../middlewares/auth'
// Controllers
import { logIn } from './actions/login.action'
import { signUp } from './actions/register.action'

const router = Router()

router.post('/login', schemaGuard(LoginSchema), logIn)
router.use(tokenGuard(), verifyToken())
router.post('/register', schemaGuard(UserSchema), signUp)

export default router
