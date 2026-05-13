import { Router } from 'express'
import { register, login } from '../controllers/authController.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)

// Ruta protegida de ejemplo para verificar que el token funciona
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user })
})

export default router