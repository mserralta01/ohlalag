import { config } from 'dotenv';
import { join } from 'path';
import { writeFileSync } from 'fs';

// Setup environment variables
const envContent = `VITE_FIREBASE_API_KEY=AIzaSyCInw1-3dqnxZ9S_oVVkLhEdEJx2byAFWA
VITE_FIREBASE_AUTH_DOMAIN=desings-by-ohlala.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=desings-by-ohlala
VITE_FIREBASE_STORAGE_BUCKET=desings-by-ohlala.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=130355956024
VITE_FIREBASE_APP_ID=1:130355956024:web:045f69a62aee442a6dd9cd
VITE_FIREBASE_MEASUREMENT_ID=G-JL325R8E4Q
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51QJeHcIH0Nj8caTBcKr82egiNE6E3BuoFialu70DJBPGQcRaSk9tqwH8ELX9EhjdwfLIiUuxyuUwAIAMr34o6VaQ00kLCicG0s
VITE_JWT_SECRET=ohlala_jwt_secret_2024
FIREBASE_PROJECT_ID=desings-by-ohlala
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDssMELYbg+H0Iz\n038T/MmeOqqpOEFHxg1dRT6f9seyAVwVpb2ZGQPET1uQzLnc6uFCVQgk9//FzugX\ncIHrE37/soP0s2AfGDzUnqzy88t6QyUWgvUhSZ/6lcZ+CpkkriQLgOp6PueVOyPH\nPh4oIryI/YlOKi6AGJAy8Pf/JtBAT0sI15mN27tMKVZ7ZHXZ4qtt2UXckpI1k/4K\nkylBAUcwzm9ZOYw6vw/xu9dFh80+GXC4frcJJlkcuBPuHVXneA5xMN4kI1sVjnow\nR1BHyEbIlnhY9UCMYx6VTCqavsk2qbk9UnywOQfkmEuijQwH812qmERhRqMudL0A\nGgC1w67vAgMBAAECggEAC/BPqtnNsWbiCXtjcqgl3IY8CBevON+u2koJ9YdwNwFy\nwIeUKS4Su3eyeC4DbNCO9smtBMrBMYKVJv2E6Bnn8x2kVbCO91j0uvE00Xcy1JXU\nP8iKQcwVA2hDoCVVTsoKRZqsLE9fXtUiIffEDXID5x49K0UQaspFl8EBpiXLvyD7\nIU/4COzx+iP96+8s4Zm+bmL2+I0ZPKc4Jy+FzP3e6aFmdIx+pXEZPbfVz3xC/9ix\ng+8mFgRxNaGs0UchMjHYERNVVKb5oVtOOpLhsriCjKtGWYbks4rEWhHBg3CXuPY9\nSPpfT9JS4hNQG+LpFep8S9oLziAiLnRFZMo9rWY53QKBgQD9xQGvRYOsGbbhupcM\njP7gFlAVMYSjmM+cqhFsabU8EtrxyfRak7AJ5WiA1IroOm8e4i3z85kHFtENMfSo\nsto86LnPpexuiW2Nn8bRxrTZADJPS8mc4/bcaWbetnPYld+VP260X4M4Qra+heFZ\nGR8/fCixiK1OKaHL119bkWLdfQKBgQDuxVGWHH90MrCHXER2MkFtTUB9qOdl2oHb\ncsrv19tZeQOhZ1xNk0jGAJhMK8O+WsnBn1+HVx63NfbSF/R5lquhH2BTsEXJVvwx\nyKGOaxjkC8t9YL4WcI8FzXhWPwAEiryxajwDT6GJUKkDFFYgsnj3vH39KSC9J/KW\nv6M6qfsZ2wKBgQDlaeeG+zH5MNn7IUMSjpiQHrvRHQ4LE8eEmt7bgojcQTN76JYm\nGGPJ3oHmDb9yB/mTEuh2JR+PoBnncuT6aY4QCFiKlzayCz1mDi6gUKIHlzzkIOCo\nHBJ82jCsYIdEIuGYvFqpZ7tp7i3k+YVqleKA8w6ayLPb+JkTfaXwUvPsxQKBgQDF\nKhDt2MhyRi05CTrLM0KNpD39xcyWcbHLaWYkWWWa42/ZBwXUVSvBvNoGBBmWBVgW\n16jFlG4bsacH45oQERfWa5daY/Osh3SnE1o8xTj/jrHQ7WLqGrYvf3TAGzPDjGC2\nS9gUj9v/DKkTjuZ0B4wWXgLXWu/a4rLSQpriJVzhAwKBgGl7Rv7uNZPXG2Al0rfD\nTSTEU90vObe4XQ5/oE0uerghtFjVPCMaDeNKZjTwMaOpbUFCPAiUR2pAIl64kYeM\n4J3fxYDUCwgmTPZQK+WFqMVN1J3WasKZEqgGYr65yz34jz4Wdg2RuVl0plhCDP8J\njhrvcAiqbH2VNwEcFIBSOG0Y\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-9l7jd@desings-by-ohlala.iam.gserviceaccount.com`;

// Write .env file
writeFileSync(join(process.cwd(), '.env'), envContent);

// Load environment variables
config();

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
      role: 'user'
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
      includes: ['Test Item 1', 'Test Item 2']
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
      paymentStatus: 'pending'
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
      date: new Date()
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
      paymentMethod: 'credit'
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
