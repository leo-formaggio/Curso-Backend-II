import bcrypt from 'bcrypt'
import passport from 'passport'
import User from '../models/User.js'
import { Strategy as LocalStrategy } from 'passport-local'

passport.use('login', new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    const user = await User.findOne({ email })
    if (!user) return done(null, false)
    const valid = bcrypt.compareSync(password, user.password)
    if (!valid) return done(null, false)
    return done(null, user)
}))
