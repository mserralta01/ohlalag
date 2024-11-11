import { db_ops, User, Event, Registration, GalleryItem, Expense } from '../../../lib/db';

type CollectionType = {
  users: User;
  events: Event;
  registrations: Registration;
  gallery: GalleryItem;
  expenses: Expense;
};

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split('/');
    const collection = parts[parts.length - 2] as keyof CollectionType;
    const id = parts[parts.length - 1];
    const method = req.method;

    // Validate collection name
    if (!['users', 'events', 'registrations', 'gallery', 'expenses'].includes(collection)) {
      return new Response('Invalid collection', { status: 400 });
    }

    switch (method) {
      case 'GET':
        const doc = await db_ops.get(collection, id);
        if (!doc) {
          return new Response('Document not found', { status: 404 });
        }
        return new Response(JSON.stringify(doc), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'PUT':
      case 'PATCH':
        const updateData = await req.json();
        await db_ops.update(collection, id, updateData);
        return new Response('Document updated successfully', { status: 200 });

      case 'DELETE':
        await db_ops.delete(collection, id);
        return new Response('Document deleted successfully', { status: 200 });

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Database API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
