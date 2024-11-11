# Vercel Environment Variables Setup

To deploy this application on Vercel, you need to configure the following environment variables in your Vercel project settings.

## How to Configure

1. Go to your project on [Vercel Dashboard](https://vercel.com)
2. Navigate to Settings > Environment Variables
3. Add each of the following variables:

## Required Environment Variables

### Firebase Client Configuration
These variables are used by the client-side Firebase SDK:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

### Firebase Admin SDK Configuration
These variables are used by the server-side Firebase Admin SDK:
```
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
```

**Important Note about FIREBASE_PRIVATE_KEY**: 
When adding the private key to Vercel:
1. Copy the entire private key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts
2. Keep all the newline characters (`\n`)
3. Wrap the entire key in double quotes

### Stripe Configuration
For payment processing:
```
VITE_STRIPE_PUBLISHABLE_KEY
```

### JWT Configuration
For legacy support if needed:
```
VITE_JWT_SECRET
```

## Development vs Production

Vercel allows you to set different values for Development, Preview, and Production environments. Consider setting up separate Firebase projects and configurations for each environment.

## Verifying Configuration

After deploying, you can verify your environment variables are correctly set by:
1. Going to your Vercel project dashboard
2. Clicking on "Deployments"
3. Selecting your latest deployment
4. Clicking on "Runtime Logs"

If you see any environment-related errors, double-check that all variables are properly set in your Vercel project settings.
