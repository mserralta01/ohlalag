import { connectDB } from '../../lib/db';
import GalleryItem from '../../models/GalleryItem';

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const id = req.url.split('/').pop();
    const item = await GalleryItem.findByIdAndDelete(id);

    if (!item) {
      return new Response(
        JSON.stringify({ message: 'Gallery item not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Gallery item deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to delete gallery item' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}