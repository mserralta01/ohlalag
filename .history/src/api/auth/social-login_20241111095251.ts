import admin from '../../lib/firebaseAdmin';
import { generateToken } from '../../lib/auth';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      console.error('No firebaseToken provided');
      return res.status(400).json({ message: 'No token provided' });
    }

    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    
    if (!decodedToken) {
      console.error('Invalid token');
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Create or update user in our system
    const user = {
      _id: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name || decodedToken.email?.split('@')[0],
      photoURL: decodedToken.picture || null,
      role: 'user', // Default role
    };

    // Generate our JWT token
    const token = await generateToken(user);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error('Social login error:', error);
    return res.status(500).json({ message: 'Authentication failed' });
  }
}
