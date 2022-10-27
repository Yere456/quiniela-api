import { Router } from 'express'
import { createPartido, getPartido, getPartidos, updatePartido } from '../controllers/partido.js'

const router = Router()

router.post('/api/partidos', createPartido)
router.put('/api/partidos/:id', updatePartido)
router.get('/api/partidos', getPartidos)
router.get('/api/partidos/:id', getPartido)

export default router
