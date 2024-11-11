import { writeFileSync } from 'fs';
import { join } from 'path';

const envContent = `VITE_FIREBASE_API_KEY=AIzaSyCInw1-3dqnxZ9S_oVVkLhEdEJx2byAFWA
VITE_FIREBASE_AUTH_DOMAIN=desings-by-ohlala.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=desings-by-ohlala
VITE_FIREBASE_STORAGE_BUCKET=desings-by-ohlala.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=130355956024
VITE_FIREBASE_APP_ID=1:130355956024:web:045f69a62aee442a6dd9cd
VITE_FIREBASE_MEASUREMENT_ID=G-JL325R8E4Q
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51QJeHcIH0Nj8caTBcKr82egiNE6E3BuoFialu70DJBPGQcRaSk9tqwH8ELX9EhjdwfLIiUuxyuUwAIAMr34o6VaQ00kLCicG0s
VITE_JWT_SECRET=ohlala_jwt_secret_2024`;

try {
  writeFileSync(join(process.cwd(), '.env'), envContent);
  console.log('Environment variables set successfully!');
} catch (error) {
  console.error('Error setting environment variables:', error);
  process.exit(1);
}
