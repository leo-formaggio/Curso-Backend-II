import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  thumbnails: [{ type: String, trim: true }]
}, { timestamps: true })

// Índices eficientes para busca por preço ou texto
productSchema.index({ title: 'text', description: 'text' })
productSchema.index({ price: 1 })

const Product = mongoose.model('Product', productSchema)
export default Product