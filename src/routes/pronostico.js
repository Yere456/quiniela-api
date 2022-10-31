import { Router } from 'express'
import { createPronostico, getPronosticos, updatePronostico } from '../controllers/pronostico.js'

const router = Router()

router.post('/api/pronostico', createPronostico)
router.get('/api/pronostico', getPronosticos)
router.put('/api/pronostico/:id', updatePronostico)

export default router
