import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import bcrypt from 'bcryptjs';

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  })
});

const db = getFirestore(app);

// Type definitions
export interface User {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Event {
  id?: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  price: number;
  description: string;
  images: string[];
  spotsAvailable: number;
  totalSpots: number;
  duration: string;
  includes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Registration {
  id?: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface GalleryItem {
  id?: string;
  imageUrl: string;
  artistName: string;
  date: Date;
  createdAt: Date;
}

export interface Expense {
  id?: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
  paymentMethod: 'cash' | 'credit' | 'debit';
  createdAt: Date;
}

// Helper function to convert Date objects to Firestore Timestamps
const convertDatesToTimestamps = (data: any): any => {
  const result: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Date) {
      result[key] = Timestamp.fromDate(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => 
        item instanceof Date ? Timestamp.fromDate(item) : item
      );
    } else if (value && typeof value === 'object') {
      result[key] = convertDatesToTimestamps(value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
};

// Helper function to convert Firestore Timestamps to Dates
const convertTimestampsToDate = (data: any): any => {
  const result: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && 'toDate' in value) {
      result[key] = value.toDate();
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => 
        item && typeof item === 'object' && 'toDate' in item ? item.toDate() : item
      );
    } else if (value && typeof value === 'object') {
      result[key] = convertTimestampsToDate(value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
};

// Database operations
export const db_ops = {
  // Create a new document
  async create<T extends Record<string, any>>(collectionName: string, data: T & { password?: string }): Promise<string> {
    try {
      // Hash password if it's a user document
      let processedData = { ...data };
      if (collectionName === 'users' && processedData.password) {
        const salt = await bcrypt.genSalt(10);
        processedData.password = await bcrypt.hash(processedData.password, salt);
      }

      // Convert all dates to Timestamps and add metadata
      processedData = {
        ...convertDatesToTimestamps(processedData),
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date())
      };

      // Remove undefined values
      Object.keys(processedData).forEach(key => 
        processedData[key] === undefined && delete processedData[key]
      );

      const docRef = db.collection(collectionName).doc();
      await docRef.set(processedData);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  },

  // Read a document
  async get<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docRef = db.collection(collectionName).doc(id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      return {
        id: doc.id,
        ...convertTimestampsToDate(doc.data())
      } as T;
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error);
      throw error;
    }
  },

  // Read all documents from a collection
  async getAll<T>(collectionName: string): Promise<T[]> {
    try {
      const snapshot = await db.collection(collectionName).get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertTimestampsToDate(doc.data())
      })) as T[];
    } catch (error) {
      console.error(`Error getting all documents from ${collectionName}:`, error);
      throw error;
    }
  },

  // Update a document
  async update<T extends Record<string, any>>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    try {
      const processedData = {
        ...convertDatesToTimestamps(data),
        updatedAt: Timestamp.fromDate(new Date())
      };

      // Remove undefined values
      Object.keys(processedData).forEach(key => 
        processedData[key] === undefined && delete processedData[key]
      );

      await db.collection(collectionName).doc(id).update(processedData);
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  },

  // Delete a document
  async delete(collectionName: string, id: string): Promise<void> {
    try {
      await db.collection(collectionName).doc(id).delete();
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error);
      throw error;
    }
  },

  // Query documents
  async query<T>(
    collectionName: string,
    field: string,
    operator: '==' | '>' | '<' | '>=' | '<=',
    value: any
  ): Promise<T[]> {
    try {
      const processedValue = value instanceof Date ? Timestamp.fromDate(value) : value;
      const snapshot = await db.collection(collectionName)
        .where(field, operator, processedValue)
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertTimestampsToDate(doc.data())
      })) as T[];
    } catch (error) {
      console.error(`Error querying documents in ${collectionName}:`, error);
      throw error;
    }
  }
};

export default db;
