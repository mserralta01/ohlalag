import express from 'express';
import admin from './src/lib/firebaseAdmin';
import { generateToken } from './src/lib/auth';

const app = express();
app.use(express.json());

// Social login endpoint
app.post('/api/auth/social-login', async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    
    if (!decodedToken) {
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
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
