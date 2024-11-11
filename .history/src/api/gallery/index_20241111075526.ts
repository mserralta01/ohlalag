import { db_ops, GalleryItem } from '../../lib/db';

export default async function handler(req: Request) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const items = await db_ops.getAll<GalleryItem>('gallery');
        // Sort items by date descending
        items.sort((a, b) => b.date.toMillis() - a.date.toMillis());
        return new Response(JSON.stringify(items), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'POST':
        const itemData = await req.json();
        const itemId = await db_ops.create<GalleryItem>('gallery', itemData);
        return new Response(JSON.stringify({ id: itemId }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Gallery API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
