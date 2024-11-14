import { connectDB } from '../../../lib/db';
import mongoose from 'mongoose';
import User from '../../../models/User';
import Event from '../../../models/Event';
import Registration from '../../../models/Registration';
import GalleryItem from '../../../models/GalleryItem';
import Expense from '../../../models/Expense';

const models: { [key: string]: mongoose.Model<any> } = {
  User,
  Event,
  Registration,
  GalleryItem,
  Expense,
};

export async function DELETE(req: Request) {
  try {
    await connectDB();
    
    const parts = req.url.split('/');
    const collectionName = parts[parts.length - 2];
    const id = parts[parts.length - 1];
    
    const model = models[collectionName];
    if (!model) {
      return new Response(
        JSON.stringify({ message: 'Collection not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await model.findByIdAndDelete(id);
    if (!result) {
      return new Response(
        JSON.stringify({ message: 'Record not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Record deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to delete record' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}