import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../src/lib/firebaseAdmin'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const collections = await admin.firestore().listCollections();
    res.status(200).json({
      status: 'success',
      message: 'Database connection successful',
      collections: collections.map((col) => col.id),
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
} 