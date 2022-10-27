import { Router } from 'express'
import { signinHandler, signupHandler } from '../controllers/usuarios.js'

const router = Router()

router.post('/api/login', signinHandler)
router.post('/api/register', signupHandler)

export default router
