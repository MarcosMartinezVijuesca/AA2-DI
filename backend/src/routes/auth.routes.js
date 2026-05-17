import { Router } from 'express'
import { register, login, getUsers } from '../controllers/authController.js'
import { verifyToken } from '../middleware/auth.js'
import { requireRole } from '../middleware/roles.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)

router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user })
})

// Solo accesible para admins
router.get('/users', verifyToken, requireRole('admin'), getUsers)

export default router