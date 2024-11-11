import mongoose from 'mongoose'
import User from '../src/models/User';

const MONGODB_URI = 'mongodb+srv://doadmin:7kL548A9CHJ1N3B6@db-mongodb-nyc3-47501-2d48b1f5.mongo.ondigitalocean.com/admin';

async function createSuperAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const superAdmin = {
      email: 'admin@ohlalaatelier.com',
      password: 'Admin123!',
      firstName: 'Andrea',
      lastName: 'Serralta',
      phone: '(305) 205-9132',
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: superAdmin.email });
    if (existingAdmin) {
      console.log('Superadmin already exists');
      await mongoose.disconnect();
      return;
    }

    // Create new admin user
    const user = await User.create(superAdmin);
    console.log('Superadmin created successfully');
    console.log('Email:', superAdmin.email);
    console.log('Password:', superAdmin.password);
    console.log('User ID:', user._id);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating superadmin:', error);
    process.exit(1);
  }
}

createSuperAdmin();