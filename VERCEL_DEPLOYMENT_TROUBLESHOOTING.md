# Vercel Deployment Troubleshooting

## NextAuth 404 Error

If you're getting a 404 error on `/api/auth/session` or other NextAuth routes, follow these steps:

### 1. Check Environment Variables

Make sure these environment variables are set in your Vercel project:

```bash
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 2. Test API Routes

Visit these URLs to test if API routes are working:

- `https://strava-visualizer.vercel.app/api/health` - Should return health status
- `https://strava-visualizer.vercel.app/api/test` - Should return environment variable status
- `https://strava-visualizer.vercel.app/api/log-test` - Writes a log line; use to confirm Vercel Logs are showing (see §5)

### 3. Check Vercel Function Logs

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Functions" tab
4. Look for any errors in the `/api/auth/[...nextauth]` function

### 4. Fix 404 on `/api/auth/*` (auth works locally, 404 on Vercel)

**Important:** NextAuth requires a single catch-all file `pages/api/auth/[...nextauth].ts`. Do not split auth into separate route files (e.g. `session.ts`, `providers.ts`); NextAuth checks at runtime that it’s running from `[...nextauth]` and will throw `MISSING_NEXTAUTH_API_ROUTE_ERROR` otherwise.

The app uses two settings that often fix 404s:

- **`trustHost: true`** in the NextAuth config — so NextAuth trusts Vercel’s host (e.g. `X-Forwarded-Host`). Without this, auth can work locally but fail on Vercel.
- **`runtime: 'nodejs'`** on the auth API route — so the route is deployed as a Node serverless function. If it were treated as Edge, NextAuth could misbehave or 404.

If you still see 404 after deploy:

- Set **`NEXTAUTH_URL`** in Vercel to your exact production URL, e.g. `https://strava-visualizer.vercel.app` (no trailing slash). Then redeploy.
- In Vercel, enable **“Automatically expose System Environment Variables”** so `VERCEL_URL` is available if NextAuth uses it.

### 5. No logs showing at all (even when visiting the site)

- **Runtime logs only exist for serverless functions.** Loading the main page alone may not create a log if the page is static; API routes and `getServerSideProps` do.
- **Check the Deployment filter:** In Logs, open the **Deployment** (or **Resource**) filter and set it to **All** or to the **latest Production** deployment. If it’s set to an old or preview deployment that gets no traffic, you’ll see no logs.
- **Verify you’re hitting this project:** Open the site in an incognito window and use the exact production URL (e.g. `https://strava-visualizer.vercel.app`). Then trigger a request that hits an API route.
- **Use the log-test route:** After deploying, visit `https://your-domain.vercel.app/api/log-test`. That route writes a line to the console. In Vercel Logs (filters reset, Live on), look for that request and its message. If it appears, logging works and the problem is elsewhere; if it doesn’t, the traffic may be going to another deployment or the Logs view may be filtered wrong.

### 6. Common Issues and Solutions

#### Issue: Environment variables not loading

**Solution**:

- Make sure all environment variables are set in Vercel dashboard
- Redeploy after setting environment variables
- Check that variable names match exactly (case-sensitive)

#### Issue: NextAuth secret not set

**Solution**:

- Generate a new secret: `openssl rand -base64 32`
- Set it as `NEXTAUTH_SECRET` in Vercel

#### Issue: NEXTAUTH_URL not set correctly

**Solution**:

- Set `NEXTAUTH_URL` to your exact Vercel domain
- Include `https://` protocol
- No trailing slash

#### Issue: Strava OAuth redirect URI mismatch

**Solution**:

- In your Strava app settings, set the redirect URI to:
  `https://strava-visualizer.vercel.app/api/auth/callback/strava`

### 7. Debug Steps

1. Check the test API route: `/api/test`
2. Check Vercel function logs
3. Verify environment variables are loaded
4. Test with a simple API route first

### 8. Alternative Solutions

If the issue persists:

1. **Downgrade NextAuth**: Try using NextAuth v4.22.0
2. **Check Next.js version**: Ensure compatibility
3. **Clear Vercel cache**: Redeploy with cache cleared
4. **Contact Vercel support**: If all else fails

### 9. Local vs Production

- Local works but production doesn't = Environment variable issue
- Both fail = Code issue
- Intermittent = Vercel platform issue
