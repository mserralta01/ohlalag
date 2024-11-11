import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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
const convertTimestampsToDate = (data: DocumentData): any => {
  const result: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      result[key] = value.toDate();
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => 
        item instanceof Timestamp ? item.toDate() : item
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
  async create<T extends DocumentData>(collectionName: string, data: T & { password?: string }): Promise<string> {
    const docRef = doc(collection(db, collectionName));
    
    // Hash password if it's a user document
    let processedData = { ...data };
    if (collectionName === 'users' && processedData.password) {
      const salt = await bcrypt.genSalt(10);
      processedData.password = await bcrypt.hash(processedData.password, salt);
    }

    // Convert all dates to Timestamps
    processedData = {
      ...convertDatesToTimestamps(processedData),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    // Remove undefined values
    Object.keys(processedData).forEach(key => 
      processedData[key] === undefined && delete processedData[key]
    );

    await setDoc(docRef, processedData);
    return docRef.id;
  },

  // Read a document
  async get<T>(collectionName: string, id: string): Promise<T | null> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...convertTimestampsToDate(docSnap.data())
    } as T;
  },

  // Read all documents from a collection
  async getAll<T>(collectionName: string): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestampsToDate(doc.data())
    })) as T[];
  },

  // Update a document
  async update<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, collectionName, id);
    const processedData = {
      ...convertDatesToTimestamps(data),
      updatedAt: Timestamp.now()
    };

    // Remove undefined values
    Object.keys(processedData).forEach(key => 
      processedData[key] === undefined && delete processedData[key]
    );

    await updateDoc(docRef, processedData);
  },

  // Delete a document
  async delete(collectionName: string, id: string): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },

  // Query documents
  async query<T>(
    collectionName: string,
    field: string,
    operator: '==' | '>' | '<' | '>=' | '<=',
    value: any
  ): Promise<T[]> {
    const processedValue = value instanceof Date ? Timestamp.fromDate(value) : value;
    const q = query(collection(db, collectionName), where(field, operator, processedValue));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestampsToDate(doc.data())
    })) as T[];
  }
};

export default db;
