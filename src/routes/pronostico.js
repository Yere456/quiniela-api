import { Router } from 'express'
import { createPronostico, getPronostico, getPronosticos, updatePronostico } from '../controllers/pronostico.js'

const router = Router()

router.post('/api/pronostico', createPronostico)
router.get('/api/pronosticos/:id', getPronosticos)
router.get('/api/pronostico/:id', getPronostico)
router.put('/api/pronostico/:id', updatePronostico)

export default router
