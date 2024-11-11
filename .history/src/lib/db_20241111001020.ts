import mongoose from 'mongoose';

const MONGODB_URI = process.env.VITE_MONGODB_URI || 'mongodb+srv://doadmin:7kL548A9CHJ1N3B6@db-mongodb-nyc3-47501-2d48b1f5.mongo.ondigitalocean.com/admin';

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      ssl: true,
      sslValidate: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Error connecting to MongoDB:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;