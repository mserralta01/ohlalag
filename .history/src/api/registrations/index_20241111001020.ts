import { connectDB } from '../../lib/db';
import Registration from '../../models/Registration';
import Event from '../../models/Event';
import { createPaymentIntent } from '../../lib/stripe';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { eventId, firstName, lastName, email, phone } = await req.json();

    const event = await Event.findById(eventId);
    if (!event) {
      return new Response(
        JSON.stringify({ message: 'Event not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (event.spotsAvailable <= 0) {
      return new Response(
        JSON.stringify({ message: 'Event is fully booked' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const paymentIntent = await createPaymentIntent(event.price);

    const registration = await Registration.create({
      eventId,
      firstName,
      lastName,
      email,
      phone,
      paymentIntentId: paymentIntent.id,
    });

    return new Response(
      JSON.stringify({ registration, clientSecret: paymentIntent.client_secret }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to create registration' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}