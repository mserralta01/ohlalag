import mongoose from 'mongoose';
import User from '../src/models/User';
import Event from '../src/models/Event';
import Registration from '../src/models/Registration';
import GalleryItem from '../src/models/GalleryItem';
import Expense from '../src/models/Expense';

const MONGODB_URI = process.env.VITE_MONGODB_URI || 'mongodb+srv://doadmin:7kL548A9CHJ1N3B6@db-mongodb-nyc3-47501-2d48b1f5.mongo.ondigitalocean.com/admin';

async function testDatabase() {
  console.log('Starting database tests...\n');

  try {
    // Test Connection
    console.log('Testing connection...');
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true, sslValidate: true });
    console.log('✅ Successfully connected to MongoDB\n');

    // Test User Model
    console.log('Testing User model...');
    const testUser = await User.create({
      email: 'test@example.com',
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      phone: '555-0123',
      role: 'user'
    });
    console.log('✅ Successfully created test user');
    
    const foundUser = await User.findById(testUser._id);
    console.log('✅ Successfully retrieved test user');
    
    await User.findByIdAndDelete(testUser._id);
    console.log('✅ Successfully deleted test user\n');

    // Test Event Model
    console.log('Testing Event model...');
    const testEvent = await Event.create({
      title: 'Test Event',
      date: new Date(),
      time: '19:00',
      location: 'Test Location',
      price: 89.99,
      description: 'Test Description',
      spotsAvailable: 10,
      totalSpots: 10,
      duration: '2 hours',
      includes: ['Test Item 1', 'Test Item 2']
    });
    console.log('✅ Successfully created test event');
    
    const foundEvent = await Event.findById(testEvent._id);
    console.log('✅ Successfully retrieved test event');
    
    await Event.findByIdAndDelete(testEvent._id);
    console.log('✅ Successfully deleted test event\n');

    // Test Registration Model
    console.log('Testing Registration model...');
    const testRegistration = await Registration.create({
      eventId: new mongoose.Types.ObjectId(),
      firstName: 'Test',
      lastName: 'Attendee',
      email: 'attendee@example.com',
      phone: '555-0124',
      paymentStatus: 'pending'
    });
    console.log('✅ Successfully created test registration');
    
    const foundRegistration = await Registration.findById(testRegistration._id);
    console.log('✅ Successfully retrieved test registration');
    
    await Registration.findByIdAndDelete(testRegistration._id);
    console.log('✅ Successfully deleted test registration\n');

    // Test GalleryItem Model
    console.log('Testing GalleryItem model...');
    const testGalleryItem = await GalleryItem.create({
      imageUrl: 'https://example.com/test.jpg',
      artistName: 'Test Artist',
      date: new Date()
    });
    console.log('✅ Successfully created test gallery item');
    
    const foundGalleryItem = await GalleryItem.findById(testGalleryItem._id);
    console.log('✅ Successfully retrieved test gallery item');
    
    await GalleryItem.findByIdAndDelete(testGalleryItem._id);
    console.log('✅ Successfully deleted test gallery item\n');

    // Test Expense Model
    console.log('Testing Expense model...');
    const testExpense = await Expense.create({
      category: 'Supplies',
      amount: 49.99,
      description: 'Test Expense',
      date: new Date(),
      paymentMethod: 'credit'
    });
    console.log('✅ Successfully created test expense');
    
    const foundExpense = await Expense.findById(testExpense._id);
    console.log('✅ Successfully retrieved test expense');
    
    await Expense.findByIdAndDelete(testExpense._id);
    console.log('✅ Successfully deleted test expense\n');

    console.log('All database tests completed successfully! 🎉');

  } catch (error) {
    console.error('❌ Error during database tests:', error);
    console.error('❌ Detailed error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDatabase connection closed.');
  }
}

// Run the tests
testDatabase();