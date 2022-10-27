import { Router } from 'express'
import { createPronostico } from '../controllers/pronostico.js'

const router = Router()

router.post('/api/pronostico', createPronostico)

export default router
