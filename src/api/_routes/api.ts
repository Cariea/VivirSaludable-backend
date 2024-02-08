import { Router } from 'express'

// Middlewares
import { tokenGuard } from '../../middlewares/token-guard'
import { verifyToken } from '../../middlewares/auth'

// Routers
import authRouter from '../auth/auth.routes'
import pacientRouter from '../pacients/pacient.routes'
import specialistRouter from '../specialists/specialist.routes'
import indicationsRouter from '../indications/indication.routes'
import programRouter from '../programs/program.routes'
import questionRouter from '../bot-questions/question.routes'
import specialtiesRouter from '../specialties/specialtie.routes'
import antropometricosRouter from '../antropometricos/antropometrico.routes'
import mealsRouter from '../meals/meal.routes'
import ingredientsRouter from '../ingredients/ingredient.routes'
import symptomsRouter from '../symptoms/symptom.routes'
import activitiesRoutes from '../activities/activity.routes'
import assignmentsRoutes from '../assigned/assigned.routes'
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
router.use('/indications', indicationsRouter)
router.use('/programs', programRouter)
router.use('/questions', questionRouter)
router.use('/specialties', specialtiesRouter)
router.use('/antropometricos', antropometricosRouter)
router.use('/meals', mealsRouter)
router.use('/ingredients', ingredientsRouter)
router.use('/symptoms', symptomsRouter)
router.use('/activities', activitiesRoutes)
router.use('/assignments', assignmentsRoutes)
