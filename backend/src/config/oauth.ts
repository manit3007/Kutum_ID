export const oauthConfig = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/v1/auth/google/callback'
  },
  janParichay: {
    clientID: process.env.JAN_PARICHAY_CLIENT_ID || '',
    clientSecret: process.env.JAN_PARICHAY_CLIENT_SECRET || '',
    callbackURL: process.env.JAN_PARICHAY_CALLBACK_URL || 'http://localhost:5000/api/v1/auth/janparichay/callback'
  }
}
