import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Necesario para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const usersPath = path.join(__dirname, '../data/users.json')

// Lee los usuarios del JSON
const readUsers = () => {
  const data = fs.readFileSync(usersPath, 'utf-8')
  return JSON.parse(data)
}

// Guarda los usuarios en el JSON
const saveUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
}

// REGISTRO
export const register = async (req, res) => {
  const { username, password, role } = req.body

  const users = readUsers()
  const exists = users.find(u => u.username === username)

  if (exists) {
    return res.status(400).json({ message: 'El usuario ya existe' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
    role: role || 'user'
  }

  users.push(newUser)
  saveUsers(users)

  res.status(201).json({ message: 'Usuario registrado correctamente' })
}

// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body

  const users = readUsers()
  const user = users.find(u => u.username === username)

  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado' })
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return res.status(401).json({ message: 'Contraseña incorrecta' })
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  })
}

//Solo admin, obtener usuarios
export const getUsers = (req, res) => {
  const users = readUsers()
  const safeUsers = users.map(({ password, ...rest }) => rest)
  res.json(safeUsers)
}