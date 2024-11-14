import { connectDB } from '../../lib/db';
import mongoose from 'mongoose';
import User from '../../models/User';
import Event from '../../models/Event';
import Registration from '../../models/Registration';
import GalleryItem from '../../models/GalleryItem';
import Expense from '../../models/Expense';

const models = {
  User,
  Event,
  Registration,
  GalleryItem,
  Expense,
};

export async function GET() {
  try {
    await connectDB();
    
    const collections = await Promise.all(
      Object.entries(models).map(async ([name, model]) => {
        const records = await model.find({});
        return {
          name,
          records: records.map(record => record.toObject()),
        };
      })
    );

    return new Response(
      JSON.stringify(collections),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to fetch collections' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}