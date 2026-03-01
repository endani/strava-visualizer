import NextAuth from 'next-auth'
import StravaProvider from 'next-auth/providers/strava'

export function getAuthOptions() {
  return {
    providers: [
      StravaProvider({
        clientId: process.env.STRAVA_CLIENT_ID || '',
        clientSecret: process.env.STRAVA_CLIENT_SECRET || '',
        authorization: {
          params: {
            scope: 'activity:read_all,profile:read_all',
          },
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: false,
    trustHost: true,
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.expiresAt = account.expires_at
        }
        return token
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken as string
        return session
      },
    },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
    },
  }
}

export default NextAuth(getAuthOptions())
