import { connectDB } from '../../lib/db';
import GalleryItem from '../../models/GalleryItem';

export async function GET() {
  try {
    await connectDB();
    const items = await GalleryItem.find().sort({ date: -1 });

    return new Response(
      JSON.stringify(items),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to fetch gallery items' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const itemData = await req.json();
    const item = await GalleryItem.create(itemData);

    return new Response(
      JSON.stringify(item),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to create gallery item' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}