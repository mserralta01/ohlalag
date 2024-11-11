import { db_ops, User } from '../../lib/db';
import { sign } from 'jsonwebtoken';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { firstName, lastName, email, password, phone } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Check if user already exists
    const existingUsers = await db_ops.query<User>('users', 'email', '==', email);
    if (existingUsers.length > 0) {
      return new Response('User already exists', { status: 400 });
    }

    // Create user
    const userId = await db_ops.create<User>('users', {
      firstName,
      lastName,
      email,
      password, // Password will be hashed by db_ops
      phone,
      role: 'user'
    });

    // Generate JWT token
    const token = sign(
      { userId, email, role: 'user' },
      process.env.VITE_JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    return new Response(JSON.stringify({ token, userId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
