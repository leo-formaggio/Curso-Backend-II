import passport from 'passport'
import { Router } from 'express'
import Cart from '../models/cart.js'

const router = Router()

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const cart = await Cart.findOne({ owner: req.user._id }).populate('products.product')
    return res.json({ status: 'success', payload: cart || { products: [] } })
  }
);

router.post('/products/:pid',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userId = req.user._id
    const productId = req.params.pid
    let cart = await Cart.findOne({ owner: userId })
    if (!cart) {
      cart = await Cart.create({ owner: userId, products: [] })
    }
    const idx = cart.products.findIndex(p => p.product.toString() === productId)
    if (idx !== -1) {
      cart.products[idx].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 })
    }
    await cart.save()
    await cart.populate('products.product')
    res.json({ status: 'success', payload: cart })
  }
)

export default router