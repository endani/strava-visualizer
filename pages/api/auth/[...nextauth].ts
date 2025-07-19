import NextAuth from 'next-auth'
import StravaProvider from 'next-auth/providers/strava'

console.log('NextAuth v4 config loading...')
console.log(
  'STRAVA_CLIENT_ID:',
  process.env.STRAVA_CLIENT_ID ? 'SET' : 'MISSING',
)
console.log(
  'STRAVA_CLIENT_SECRET:',
  process.env.STRAVA_CLIENT_SECRET ? 'SET' : 'MISSING',
)
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING')
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

function getAuthOptions() {
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
    debug: true,
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

const authOptions = getAuthOptions()
console.log('Auth options created successfully')

export default NextAuth(authOptions)
