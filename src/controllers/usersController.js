import User from '../models/User.js'

export const list = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json({ status: 'success', payload: users })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}