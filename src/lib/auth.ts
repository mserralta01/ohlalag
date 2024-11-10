import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function generateToken(user: any) {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = await generateToken(user);
  return { user, token };
}