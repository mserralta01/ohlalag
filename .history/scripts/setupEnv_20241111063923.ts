import { writeFileSync } from 'fs';
import { join } from 'path';

const envContent = `VITE_MONGODB_URI=mongodb+srv://doadmin:7kL548A9CHJ1N3B6@db-mongodb-nyc3-47501-2d48b1f5.mongo.ondigitalocean.com/admin
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51QJeHcIH0Nj8caTBcKr82egiNE6E3BuoFialu70DJBPGQcRaSk9tqwH8ELX9EhjdwfLIiUuxyuUwAIAMr34o6VaQ00kLCicG0s
VITE_JWT_SECRET=ohlala_jwt_secret_2024`;

try {
  writeFileSync(join(process.cwd(), '.env'), envContent);
  console.log('Environment variables set successfully!');
} catch (error) {
  console.error('Error setting environment variables:', error);
  process.exit(1);
}