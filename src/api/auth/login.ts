import { connectDB } from '../../lib/db';
import { authenticateUser } from '../../lib/auth';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const { user, token } = await authenticateUser(email, password);

    return new Response(
      JSON.stringify({ user, token }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Authentication failed' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}