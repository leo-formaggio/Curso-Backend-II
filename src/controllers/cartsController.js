import Cart from '../models/cart.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ owner: req.user._id }).populate('products.product')
    if (!cart) {
      return res.json({ status: 'success', payload: { products: [] } })
    }
    res.json({ status: 'success', payload: cart })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
}

export const addProductToCart = async (req, res) => {
  const productId = req.params.pid
  try {
    let cart = await Cart.findOne({ owner: req.user._id })
    if (!cart) {
      cart = await Cart.create({ owner: req.user._id, products: [] })
    }

    const idx = cart.products.findIndex(p => p.product.toString() === productId)
    if (idx > -1) {
      cart.products[idx].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 })
    }

    await cart.save()
    await cart.populate('products.product')
    res.json({ status: 'success', payload: cart })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
}