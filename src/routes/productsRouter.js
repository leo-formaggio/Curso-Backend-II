import passport from 'passport'
import { Router } from 'express'
import { requireRole } from '../utils/auth.js'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController.js'

const router = Router()

router.get('/',
  passport.authenticate('jwt', { session: false }),
  getAllProducts
)

router.get('/:pid',
  passport.authenticate('jwt', { session: false }),
  getProductById
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  requireRole('admin'),
  createProduct
)

router.put('/:pid',
  passport.authenticate('jwt', { session: false }),
  requireRole('admin'),
  updateProduct
)

router.delete('/:pid',
  passport.authenticate('jwt', { session: false }),
  requireRole('admin'),
  deleteProduct
)

export default router