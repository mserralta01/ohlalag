import { db_ops, User } from '../../lib/db';
import { getAuth } from 'firebase-admin/auth';

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

    // Create user in Firebase Auth
    const auth = getAuth();
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      phoneNumber: phone.startsWith('+') ? phone : `+1${phone}` // Ensure proper phone format
    });

    // Create user document in Firestore
    await db_ops.create<User>('users', {
      firstName,
      lastName,
      email,
      phone,
      role: 'user'
      // No need to store password as it's handled by Firebase Auth
    });

    // Create custom token for immediate sign-in
    const token = await auth.createCustomToken(userRecord.uid);

    return new Response(JSON.stringify({
      token,
      user: {
        id: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        role: 'user'
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Registration error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
