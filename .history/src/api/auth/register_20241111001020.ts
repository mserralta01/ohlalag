import { connectDB } from '../../lib/db';
import User from '../../models/User';
import { generateToken } from '../../lib/auth';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { firstName, lastName, email, password, phone } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'Email already registered' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    const token = await generateToken(user);

    return new Response(
      JSON.stringify({ user, token }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Registration failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}