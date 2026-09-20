import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { PrismaClient } from '@prisma/client'
import { oauthConfig } from '../config/oauth'

const prisma = new PrismaClient()

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    done(null, user || undefined)
  } catch (error) {
    done(error, undefined)
  }
})

passport.use(new GoogleStrategy(
  {
    clientID: oauthConfig.google.clientID,
    clientSecret: oauthConfig.google.clientSecret,
    callbackURL: oauthConfig.google.callbackURL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0].value
      if (!email) {
        return done(new Error('No email in Google profile'), undefined)
      }

      // Check if user exists
      let user = await prisma.user.findUnique({
        where: { username: email }
      })

      // If user doesn't exist, create a new one
      if (!user) {
        user = await prisma.user.create({
          data: {
            username: email,
            password_hash: '', // OAuth users don't need password
            role: 'CITIZEN'
          }
        })
      }

      return done(null, user)
    } catch (error) {
      return done(error, undefined)
    }
  }
))

export default passport
