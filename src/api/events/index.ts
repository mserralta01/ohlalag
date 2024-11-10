import { connectDB } from '../../lib/db';
import Event from '../../models/Event';

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 });

    return new Response(
      JSON.stringify(events),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to fetch events' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const eventData = await req.json();
    const event = await Event.create(eventData);

    return new Response(
      JSON.stringify(event),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to create event' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}