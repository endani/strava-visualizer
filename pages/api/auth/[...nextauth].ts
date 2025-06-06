import NextAuth from 'next-auth'
// import StravaProvider from 'next-auth/providers/strava'

console.log('Strava Client ID:', process.env.STRAVA_CLIENT_ID)
console.log('Strava Client Secret is set:', !!process.env.STRAVA_CLIENT_SECRET)
console.log('NextAuth Secret is set:', !!process.env.NEXTAUTH_SECRET)
console.log('NEXTAUTH_URL is set:', process.env.NEXTAUTH_URL)

export default NextAuth({
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
  // providers: [
  //   // StravaProvider({
  //   //   clientId: process.env.STRAVA_CLIENT_ID,
  //   //   clientSecret: process.env.STRAVA_CLIENT_SECRET,
  //   //   authorization: {
  //   //     params: {
  //   //       scope: 'activity:read_all,profile:read_all',
  //   //     },
  //   //   },
  //   // }),
  // ],
  // callbacks: {
  //   async jwt({ token, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token
  //       token.refreshToken = account.refresh_token
  //       token.expiresAt = account.expires_at
  //     }

  //     return token
  //   },
  //   async session({ session, token }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken

  //     return session
  //   },
  // },
  // pages: {
  //   signIn: '/auth/signin',
  //   error: '/auth/error',
  // },
})
