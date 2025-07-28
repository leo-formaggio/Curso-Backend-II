import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json({ status: 'success', payload: products })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
}

export const getProductById = async (req, res) => {
  const { pid } = req.params
  try {
    const product = await Product.findById(pid)
    if (!product) return res.status(404).json({ status: 'error', message: 'Produto não encontrado' })
    res.json({ status: 'success', payload: product })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const newProd = await Product.create(req.body)
    res.status(201).json({ status: 'success', payload: newProd })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  const { pid } = req.params
  try {
    const updated = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    if (!updated) return res.status(404).json({ status: 'error', message: 'Produto não encontrado' })
    res.json({ status: 'success', payload: updated })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  const { pid } = req.params
  try {
    const deleted = await Product.findByIdAndDelete(pid)
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Produto não encontrado' })
    res.json({ status: 'success', message: 'Produto removido' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
}