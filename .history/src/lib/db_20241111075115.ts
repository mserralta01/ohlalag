import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';

// Initialize Firebase Admin
const serviceAccount = {
  type: "service_account",
  project_id: "desings-by-ohlala",
  private_key_id: "b1ff807cc5d489a1b63b144b71960215e8a2dc8a",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDssMELYbg+H0Iz\n038T/MmeOqqpOEFHxg1dRT6f9seyAVwVpb2ZGQPET1uQzLnc6uFCVQgk9//FzugX\ncIHrE37/soP0s2AfGDzUnqzy88t6QyUWgvUhSZ/6lcZ+CpkkriQLgOp6PueVOyPH\nPh4oIryI/YlOKi6AGJAy8Pf/JtBAT0sI15mN27tMKVZ7ZHXZ4qtt2UXckpI1k/4K\nkylBAUcwzm9ZOYw6vw/xu9dFh80+GXC4frcJJlkcuBPuHVXneA5xMN4kI1sVjnow\nR1BHyEbIlnhY9UCMYx6VTCqavsk2qbk9UnywOQfkmEuijQwH812qmERhRqMudL0A\nGgC1w67vAgMBAAECggEAC/BPqtnNsWbiCXtjcqgl3IY8CBevON+u2koJ9YdwNwFy\nwIeUKS4Su3eyeC4DbNCO9smtBMrBMYKVJv2E6Bnn8x2kVbCO91j0uvE00Xcy1JXU\nP8iKQcwVA2hDoCVVTsoKRZqsLE9fXtUiIffEDXID5x49K0UQaspFl8EBpiXLvyD7\nIU/4COzx+iP96+8s4Zm+bmL2+I0ZPKc4Jy+FzP3e6aFmdIx+pXEZPbfVz3xC/9ix\ng+8mFgRxNaGs0UchMjHYERNVVKb5oVtOOpLhsriCjKtGWYbks4rEWhHBg3CXuPY9\nSPpfT9JS4hNQG+LpFep8S9oLziAiLnRFZMo9rWY53QKBgQD9xQGvRYOsGbbhupcM\njP7gFlAVMYSjmM+cqhFsabU8EtrxyfRak7AJ5WiA1IroOm8e4i3z85kHFtENMfSo\nsto86LnPpexuiW2Nn8bRxrTZADJPS8mc4/bcaWbetnPYld+VP260X4M4Qra+heFZ\nGR8/fCixiK1OKaHL119bkWLdfQKBgQDuxVGWHH90MrCHXER2MkFtTUB9qOdl2oHb\ncsrv19tZeQOhZ1xNk0jGAJhMK8O+WsnBn1+HVx63NfbSF/R5lquhH2BTsEXJVvwx\nyKGOaxjkC8t9YL4WcI8FzXhWPwAEiryxajwDT6GJUKkDFFYgsnj3vH39KSC9J/KW\nv6M6qfsZ2wKBgQDlaeeG+zH5MNn7IUMSjpiQHrvRHQ4LE8eEmt7bgojcQTN76JYm\nGGPJ3oHmDb9yB/mTEuh2JR+PoBnncuT6aY4QCFiKlzayCz1mDi6gUKIHlzzkIOCo\nHBJ82jCsYIdEIuGYvFqpZ7tp7i3k+YVqleKA8w6ayLPb+JkTfaXwUvPsxQKBgQDF\nKhDt2MhyRi05CTrLM0KNpD39xcyWcbHLaWYkWWWa42/ZBwXUVSvBvNoGBBmWBVgW\n16jFlG4bsacH45oQERfWa5daY/Osh3SnE1o8xTj/jrHQ7WLqGrYvf3TAGzPDjGC2\nS9gUj9v/DKkTjuZ0B4wWXgLXWu/a4rLSQpriJVzhAwKBgGl7Rv7uNZPXG2Al0rfD\nTSTEU90vObe4XQ5/oE0uerghtFjVPCMaDeNKZjTwMaOpbUFCPAiUR2pAIl64kYeM\n4J3fxYDUCwgmTPZQK+WFqMVN1J3WasKZEqgGYr65yz34jz4Wdg2RuVl0plhCDP8J\njhrvcAiqbH2VNwEcFIBSOG0Y\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-9l7jd@desings-by-ohlala.iam.gserviceaccount.com",
  client_id: "109874160601257735944",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9l7jd%40desings-by-ohlala.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
} catch (error) {
  // App might already be initialized
  console.log('Firebase Admin initialization error (might be already initialized):', error);
}

const db = admin.firestore();

// Base interface for all documents
interface BaseDocument {
  id?: string;
  createdAt: admin.firestore.Timestamp;
  updatedAt?: admin.firestore.Timestamp;
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
  date: admin.firestore.Timestamp;
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
  date: admin.firestore.Timestamp;
}

export interface Expense extends BaseDocument {
  category: string;
  amount: number;
  description: string;
  date: admin.firestore.Timestamp;
  paymentMethod: 'cash' | 'credit' | 'debit';
}

// Helper function to convert Date objects to Firestore Timestamps
const convertDatesToTimestamps = (data: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Date) {
      result[key] = admin.firestore.Timestamp.fromDate(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => 
        item instanceof Date ? admin.firestore.Timestamp.fromDate(item) : item
      );
    } else if (value && typeof value === 'object') {
      result[key] = convertDatesToTimestamps(value);
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
      const now = admin.firestore.Timestamp.fromDate(new Date());
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
      const docSnapshot = await db.collection(collectionName).doc(id).get();
      
      if (!docSnapshot.exists) {
        return null;
      }
      
      return {
        id: docSnapshot.id,
        ...docSnapshot.data()
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
      return snapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
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
        updatedAt: admin.firestore.Timestamp.fromDate(new Date())
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
      const processedValue = value instanceof Date ? admin.firestore.Timestamp.fromDate(value) : value;
      const snapshot = await db.collection(collectionName)
        .where(field, operator, processedValue)
        .get();

      return snapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      })) as T[];
    } catch (error) {
      console.error(`Error querying documents in ${collectionName}:`, error);
      throw error;
    }
  }
};

export default db;
