import { Router } from 'express'

//Consts
import { UserRole } from '../../utils/roles.enum'
//Schemas
import { AddActivitySchema,UpdateActivitySchema } from './activity.schema'

//Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'
import { hasAuthorization } from '../../middlewares/auth'

//Controllers
import { getActivity } from './actions/get.action'
import { addActivity } from './actions/add.action'
import { updateActivity } from './actions/update.action'
import { deleteActivity } from './actions/delete.action'

const router = Router()

//Routes
router.get('/', hasAuthorization([UserRole.PACIENTE, UserRole.ESPECIALISTA]), getActivity)
router.post('/', hasAuthorization([UserRole.PACIENTE]), schemaGuard(AddActivitySchema), addActivity)
router.put('/:activityId', hasAuthorization([UserRole.PACIENTE]),schemaGuard(UpdateActivitySchema), updateActivity)
router.delete('/:activityId',hasAuthorization([UserRole.PACIENTE]), deleteActivity)

export default router
