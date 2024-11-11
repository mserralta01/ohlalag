import { db_ops, User } from '../../lib/db';
import { getAuth } from 'firebase-admin/auth';

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

    // Since we're using Firebase Auth, we need to verify the ID token
    // The client should sign in with Firebase Auth SDK and send us the ID token
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!idToken) {
      return new Response('No authorization token provided', { status: 401 });
    }

    // Verify the ID token
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);

    // Get user from Firestore
    const users = await db_ops.query<User>('users', 'email', '==', email);
    const user = users[0];

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Return user data
    return new Response(JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Login error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
