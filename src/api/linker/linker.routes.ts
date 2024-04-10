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
import { deleteLinker } from './actions/delete.action'
import { getUsers } from './actions/get-by-id'
import {darAlta} from './actions/alta.action'
const router = Router()

//Routes

router.get('/', hasAuthorization([AdminRoles.ASISTENT]), getUsers)
router.post('/add', hasAuthorization([AdminRoles.ASISTENT]), schemaGuard(AddPacientToSpecialistSchema), addPacients)
router.put('/alta', darAlta)
router.delete('/delete', hasAuthorization([AdminRoles.ASISTENT]), schemaGuard(AddPacientToSpecialistSchema), deleteLinker)

export default router