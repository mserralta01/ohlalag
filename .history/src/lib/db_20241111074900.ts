import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import bcrypt from 'bcryptjs';
import { join } from 'path';
import { readFileSync } from 'fs';

// Initialize Firebase Admin
try {
  const serviceAccountPath = join(__dirname, 'firebase-service-account.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
  throw error;
}

const db = getFirestore();

// Base interface for all documents
interface BaseDocument {
  id?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Type definitions
export interface User extends BaseDocument {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'user' | 'admin';
}

export interface Event extends BaseDocument {
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
}

export interface Registration extends BaseDocument {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface GalleryItem extends BaseDocument {
  imageUrl: string;
  artistName: string;
  date: Date;
}

export interface Expense extends BaseDocument {
  category: string;
  amount: number;
  description: string;
  date: Date;
  paymentMethod: 'cash' | 'credit' | 'debit';
}

interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
  toDate(): Date;
}

// Type guard for Firestore Timestamp
function isFirestoreTimestamp(value: unknown): value is FirestoreTimestamp {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_seconds' in value &&
    '_nanoseconds' in value &&
    typeof (value as any).toDate === 'function'
  );
}

// Helper function to convert Date objects to Firestore Timestamps
const convertDatesToTimestamps = (data: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  
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
const convertTimestampsToDate = (data: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (isFirestoreTimestamp(value)) {
      result[key] = value.toDate();
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => 
        isFirestoreTimestamp(item) ? item.toDate() : item
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
  async create<T extends BaseDocument>(
    collectionName: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'> & { password?: string }
  ): Promise<string> {
    try {
      // Hash password if it's a user document
      let processedData: Record<string, any> = { ...data };
      if (collectionName === 'users' && processedData.password) {
        const salt = await bcrypt.genSalt(10);
        processedData.password = await bcrypt.hash(processedData.password, salt);
      }

      // Convert all dates to Timestamps and add metadata
      const now = Timestamp.fromDate(new Date());
      processedData = {
        ...convertDatesToTimestamps(processedData),
        createdAt: now,
        updatedAt: now
      };

      // Remove undefined values
      Object.keys(processedData).forEach(key => 
        processedData[key] === undefined && delete processedData[key]
      );

      const docRef = await db.collection(collectionName).add(processedData);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  },

  // Read a document
  async get<T extends BaseDocument>(collectionName: string, id: string): Promise<T | null> {
    try {
      const doc = await db.collection(collectionName).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }
      
      return {
        id: doc.id,
        ...convertTimestampsToDate(doc.data() || {})
      } as T;
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error);
      throw error;
    }
  },

  // Read all documents from a collection
  async getAll<T extends BaseDocument>(collectionName: string): Promise<T[]> {
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
  async update<T extends BaseDocument>(
    collectionName: string,
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<void> {
    try {
      const processedData = {
        ...convertDatesToTimestamps(data),
        updatedAt: Timestamp.fromDate(new Date())
      };

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
  async query<T extends BaseDocument>(
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
