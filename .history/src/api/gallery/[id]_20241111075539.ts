import { db_ops, GalleryItem } from '../../lib/db';

export default async function handler(req: Request) {
  try {
    const { method } = req;
    const id = req.url.split('/').pop();

    if (!id) {
      return new Response('Gallery item ID is required', { status: 400 });
    }

    switch (method) {
      case 'GET':
        const item = await db_ops.get<GalleryItem>('gallery', id);
        if (!item) {
          return new Response('Gallery item not found', { status: 404 });
        }
        return new Response(JSON.stringify(item), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'PUT':
      case 'PATCH':
        const updateData = await req.json();
        await db_ops.update<GalleryItem>('gallery', id, updateData);
        return new Response('Gallery item updated successfully', { status: 200 });

      case 'DELETE':
        await db_ops.delete('gallery', id);
        return new Response('Gallery item deleted successfully', { status: 200 });

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Gallery API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
