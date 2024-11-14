import { connectDB } from '../../lib/db';
import Event from '../../models/Event';

export async function GET(req: Request) {
  try {
    await connectDB();
    const id = req.url.split('/').pop();
    const event = await Event.findById(id);

    if (!event) {
      return new Response(
        JSON.stringify({ message: 'Event not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(event),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to fetch event' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const id = req.url.split('/').pop();
    const updates = await req.json();
    
    const event = await Event.findByIdAndUpdate(id, updates, { new: true });

    if (!event) {
      return new Response(
        JSON.stringify({ message: 'Event not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(event),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to update event' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const id = req.url.split('/').pop();
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return new Response(
        JSON.stringify({ message: 'Event not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Event deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to delete event' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}