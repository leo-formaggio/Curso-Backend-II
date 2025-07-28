import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import authRouter from './routes/authRouter.js'
import usersRouter from './routes/usersRouter.js'
import cartsRouter from './routes/cartsRouter.js'
import productsRouter from './routes/productsRouter.js'

import './utils/passportRules.js'

dotenv.config()
await mongoose.connect(process.env.MONGO_URI)

const app = express()
app.use(express.json())
app.use(passport.initialize())
app.use('/api', usersRouter)

app.use('/api/sessions', authRouter)
app.use('/api/products', passport.authenticate('jwt', { session: false }), productsRouter)
app.use('/api/cart', passport.authenticate('jwt', { session: false }), cartsRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
