import { Router } from 'express'
import { createEquipo } from '../controllers/equipos.js'

const router = Router()

router.post('/api/equipos', createEquipo)

export default router
