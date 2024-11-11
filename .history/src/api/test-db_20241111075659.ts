import { db } from '../lib/db';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Test database connection by attempting to list collections
    const collections = await db.listCollections();
    return new Response(JSON.stringify({
      status: 'success',
      message: 'Database connection successful',
      collections: collections.map(col => col.id)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database test error:', error);
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
