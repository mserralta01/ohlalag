# Vercel Deployment Setup

There are two ways to set up your environment variables in Vercel:

## Option 1: Using vercel.json (Recommended)

1. We've provided a `vercel.json` file that contains all necessary environment variables.
2. When you deploy your project, Vercel will automatically read this file and set up the environment variables.
3. No manual configuration is needed.

## Option 2: Manual Configuration

If you prefer to set up the variables manually:

1. Go to your project on [Vercel Dashboard](https://vercel.com)
2. Navigate to Settings > Environment Variables
3. Copy each variable from the `.env.example` file and add them to your Vercel project

### Required Environment Variables

#### Firebase Client Configuration
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

#### Firebase Admin SDK Configuration
```
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
```

#### Stripe Configuration
```
VITE_STRIPE_PUBLISHABLE_KEY
```

#### JWT Configuration
```
VITE_JWT_SECRET
```

## Important Notes

1. The `FIREBASE_PRIVATE_KEY` must be properly formatted:
   - Include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts
   - Keep all newline characters (`\n`)
   - Wrap in double quotes

2. Environment Scopes:
   - Development
   - Preview
   - Production

Consider setting up separate Firebase projects for different environments.

## Verification

After deploying:
1. Go to your Vercel project dashboard
2. Click "Deployments"
3. Select your latest deployment
4. Check "Runtime Logs" for any environment-related errors

## Files Provided

1. `vercel.json` - Contains all environment variables in Vercel's format
2. `.env.example` - Template for manual configuration
3. This guide (VERCEL.md) - Detailed setup instructions

Choose either Option 1 or Option 2 based on your preference. Option 1 (using vercel.json) is recommended for easier setup.
