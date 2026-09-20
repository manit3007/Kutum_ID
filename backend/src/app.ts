import express from 'express'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import familyRoutes from './routes/family'
import suvidhaRoutes from './routes/suvidha'
import passport from './middleware/passport'

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}))
app.use(express.json())

// Session middleware for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false
}))

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/families', familyRoutes)
app.use('/api/v1/suvidha', suvidhaRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
