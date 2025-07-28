import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import User from '../models/User.js'
// import usersController from '../controllers/usersController.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body
  const hash = bcrypt.hashSync(password, 10)
  try {
    const newUser = await User.create({ first_name, last_name, email, age, password: hash })
    res.status(201).json({ status: 'success', payload: { id: newUser._id, email: newUser.email }})
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message })
  }
})

router.post('/login', passport.authenticate('login', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ status: 'success', token })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ status: 'success', payload: req.user })
})

// router.get('/users', passport.authenticate('jwt', { session: false }), requireRole('admin'), usersController.list)


function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role === role) return next()
    res.status(403).json({ status: 'error', message: 'Acesso negado' })
  }
}

router.get('/admin-only', passport.authenticate('jwt', { session: false }), requireRole('admin'), (req, res) => {
  res.json({ status: 'success', message: 'Bem-vindo, admin!' })
})

export default router