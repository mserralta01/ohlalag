import { db_ops, User, Event, Registration, GalleryItem, Expense } from '../src/lib/db';

async function testDatabase() {
  console.log('Starting Firebase database tests...\n');

  try {
    // Test User Model
    console.log('Testing User collection...');
    const userId = await db_ops.create<User>('users', {
      email: 'test@example.com',
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      phone: '555-0123',
      role: 'user',
      createdAt: new Date()
    });
    console.log('✅ Successfully created test user');
    
    const foundUser = await db_ops.get<User>('users', userId);
    console.log('✅ Successfully retrieved test user');
    
    await db_ops.delete('users', userId);
    console.log('✅ Successfully deleted test user\n');

    // Test Event Model
    console.log('Testing Event collection...');
    const eventId = await db_ops.create<Event>('events', {
      title: 'Test Event',
      date: new Date(),
      time: '19:00',
      location: 'Test Location',
      price: 89.99,
      description: 'Test Description',
      images: [],
      spotsAvailable: 10,
      totalSpots: 10,
      duration: '2 hours',
      includes: ['Test Item 1', 'Test Item 2'],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('✅ Successfully created test event');
    
    const foundEvent = await db_ops.get<Event>('events', eventId);
    console.log('✅ Successfully retrieved test event');
    
    await db_ops.delete('events', eventId);
    console.log('✅ Successfully deleted test event\n');

    // Test Registration Model
    console.log('Testing Registration collection...');
    const registrationId = await db_ops.create<Registration>('registrations', {
      eventId: 'test-event-id',
      firstName: 'Test',
      lastName: 'Attendee',
      email: 'attendee@example.com',
      phone: '555-0124',
      paymentStatus: 'pending',
      createdAt: new Date()
    });
    console.log('✅ Successfully created test registration');
    
    const foundRegistration = await db_ops.get<Registration>('registrations', registrationId);
    console.log('✅ Successfully retrieved test registration');
    
    await db_ops.delete('registrations', registrationId);
    console.log('✅ Successfully deleted test registration\n');

    // Test GalleryItem Model
    console.log('Testing GalleryItem collection...');
    const galleryItemId = await db_ops.create<GalleryItem>('gallery', {
      imageUrl: 'https://example.com/test.jpg',
      artistName: 'Test Artist',
      date: new Date(),
      createdAt: new Date()
    });
    console.log('✅ Successfully created test gallery item');
    
    const foundGalleryItem = await db_ops.get<GalleryItem>('gallery', galleryItemId);
    console.log('✅ Successfully retrieved test gallery item');
    
    await db_ops.delete('gallery', galleryItemId);
    console.log('✅ Successfully deleted test gallery item\n');

    // Test Expense Model
    console.log('Testing Expense collection...');
    const expenseId = await db_ops.create<Expense>('expenses', {
      category: 'Supplies',
      amount: 49.99,
      description: 'Test Expense',
      date: new Date(),
      paymentMethod: 'credit',
      createdAt: new Date()
    });
    console.log('✅ Successfully created test expense');
    
    const foundExpense = await db_ops.get<Expense>('expenses', expenseId);
    console.log('✅ Successfully retrieved test expense');
    
    await db_ops.delete('expenses', expenseId);
    console.log('✅ Successfully deleted test expense\n');

    // Test Query Operation
    console.log('Testing query operation...');
    const queryResults = await db_ops.query<Event>('events', 'price', '>=', 50);
    console.log('✅ Successfully queried events');

    console.log('All Firebase database tests completed successfully! 🎉');

  } catch (error) {
    console.error('❌ Error during database tests:', error);
    if (error instanceof Error) {
      console.error('❌ Detailed error:', error.message);
    }
  }
}

// Run the tests
testDatabase();
