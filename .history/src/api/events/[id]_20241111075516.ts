import { db_ops, Event } from '../../lib/db';

export default async function handler(req: Request) {
  try {
    const { method } = req;
    const id = req.url.split('/').pop();

    if (!id) {
      return new Response('Event ID is required', { status: 400 });
    }

    switch (method) {
      case 'GET':
        const event = await db_ops.get<Event>('events', id);
        if (!event) {
          return new Response('Event not found', { status: 404 });
        }
        return new Response(JSON.stringify(event), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'PUT':
      case 'PATCH':
        const updateData = await req.json();
        await db_ops.update<Event>('events', id, updateData);
        return new Response('Event updated successfully', { status: 200 });

      case 'DELETE':
        await db_ops.delete('events', id);
        return new Response('Event deleted successfully', { status: 200 });

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Event API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
