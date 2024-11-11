import { db_ops, Event } from '../../lib/db';

export default async function handler(req: Request) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const events = await db_ops.getAll<Event>('events');
        // Sort events by date
        events.sort((a, b) => a.date.toMillis() - b.date.toMillis());
        return new Response(JSON.stringify(events), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'POST':
        const eventData = await req.json();
        const eventId = await db_ops.create<Event>('events', eventData);
        return new Response(JSON.stringify({ id: eventId }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Events API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
