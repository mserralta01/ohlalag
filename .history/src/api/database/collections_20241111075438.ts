import { db_ops } from '../../lib/db';

export default async function handler(req: Request) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const collections = ['users', 'events', 'registrations', 'gallery', 'expenses'];
        return new Response(JSON.stringify(collections), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Collections API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
