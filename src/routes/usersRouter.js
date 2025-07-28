import passport from 'passport'
import { Router } from 'express'
import { requireRole } from '../utils/auth.js'
import { list } from '../controllers/usersController.js'

const router = Router()

router.get('/users',
  passport.authenticate('jwt', { session: false }),
  requireRole('admin'),
  list
)

export default router