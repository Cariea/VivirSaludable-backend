import { Router } from 'express'

// Consts
import { AdminRoles } from '../../utils/roles.enum'

//schemas
import { AddPacientToSpecialistSchema } from './linker.schema'

//Middlewares
import { schemaGuard } from '../../middlewares/schema-guard'
import { hasAuthorization } from '../../middlewares/auth'

//Controllers
import { addPacients } from './actions/add.action'

const router = Router()

//Routes

router.post('/add', hasAuthorization([AdminRoles.ASISTENT]), schemaGuard(AddPacientToSpecialistSchema), addPacients)

export default router