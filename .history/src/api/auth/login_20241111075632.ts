import { db_ops, User } from '../../lib/db';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Find user by email
    const users = await db_ops.query<User>('users', 'email', '==', email);
    if (users.length === 0) {
      return new Response('Invalid credentials', { status: 401 });
    }

    const user = users[0];

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response('Invalid credentials', { status: 401 });
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.VITE_JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    return new Response(JSON.stringify({
      token,
      user: userWithoutPassword
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
