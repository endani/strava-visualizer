import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import StravaProvider from 'next-auth/providers/strava'

// Debug logging
console.log('NextAuth API route loaded')
console.log(
  'Strava Client ID:',
  process.env.STRAVA_CLIENT_ID ? 'Set' : 'Missing',
)
console.log('Strava Client Secret is set:', !!process.env.STRAVA_CLIENT_SECRET)
console.log('NextAuth Secret is set:', !!process.env.NEXTAUTH_SECRET)
console.log('NEXTAUTH_URL is set:', process.env.NEXTAUTH_URL)

// Validate required environment variables
if (!process.env.STRAVA_CLIENT_ID) {
  throw new Error('STRAVA_CLIENT_ID is not set')
}

if (!process.env.STRAVA_CLIENT_SECRET) {
  throw new Error('STRAVA_CLIENT_SECRET is not set')
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not set')
}

const authOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'activity:read_all,profile:read_all',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
      }

      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken

      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}

export default NextAuth(authOptions)
