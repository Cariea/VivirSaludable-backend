import { Router } from 'express'

// Middlewares
import { tokenGuard } from '../../middlewares/token-guard'
import { verifyToken } from '../../middlewares/auth'
// Routers

export const router = Router()

// Test endpoint
router.get('/ping', (_req, res) => {
  res.status(200).json({ test: 'todo piola' })
})

// Middlewares for token validation
router.use(tokenGuard(), verifyToken())
