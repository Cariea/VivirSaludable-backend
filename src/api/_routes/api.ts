import { Router } from 'express'

// Middlewares
import { tokenGuard } from '../../middlewares/token-guard'
import { verifyToken } from '../../middlewares/auth'

// Routers
import authRouter from '../auth/auth.routes'
import pacientRouter from '../pacients/pacient.routes'
import specialistRouter from '../specialists/specialist.routes'
export const router = Router()

// Test endpoint
router.get('/ping', (_req, res) => {
	res.status(200).json({ test: 'todo piola' })
})

router.use('/auth', authRouter)

// Middlewares for token validation
router.use(tokenGuard(), verifyToken())
router.use('/pacients', pacientRouter)
router.use('/specialists', specialistRouter)
