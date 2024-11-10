import { connectDB } from '../lib/db';

export async function GET() {
  try {
    await connectDB();
    return new Response(
      JSON.stringify({ message: 'Database connection successful' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Database connection failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}