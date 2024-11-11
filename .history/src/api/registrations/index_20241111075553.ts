import { db_ops, Registration } from '../../lib/db';

export default async function handler(req: Request) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const registrations = await db_ops.getAll<Registration>('registrations');
        return new Response(JSON.stringify(registrations), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'POST':
        const { eventId, firstName, lastName, email, phone } = await req.json();
        
        // Validate required fields
        if (!eventId || !firstName || !lastName || !email || !phone) {
          return new Response('Missing required fields', { status: 400 });
        }

        // Create registration
        const registrationId = await db_ops.create<Registration>('registrations', {
          eventId,
          firstName,
          lastName,
          email,
          phone,
          paymentStatus: 'pending'
        });

        return new Response(JSON.stringify({ id: registrationId }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Registrations API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
