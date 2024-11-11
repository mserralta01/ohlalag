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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
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

// Type guard for checking if an object has a date field
const hasDateField = (obj: any): obj is { date: Date } => {
  return 'date' in obj;
};

// Helper function to convert Firestore data to our types
const convertTimestamps = (data: DocumentData) => {
  const converted = { ...data };
  if (converted.date instanceof Timestamp) {
    converted.date = converted.date.toDate();
  }
  if (converted.createdAt instanceof Timestamp) {
    converted.createdAt = converted.createdAt.toDate();
  }
  if (converted.updatedAt instanceof Timestamp) {
    converted.updatedAt = converted.updatedAt.toDate();
  }
  return converted;
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

    // Convert dates to Firestore Timestamps
    processedData = {
      ...processedData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      date: hasDateField(data) ? Timestamp.fromDate(data.date) : null
    };

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
    
    return { id: docSnap.id, ...convertTimestamps(docSnap.data()) } as T;
  },

  // Read all documents from a collection
  async getAll<T>(collectionName: string): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as T[];
  },

  // Update a document
  async update<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, collectionName, id);
    const processedData = {
      ...data,
      updatedAt: Timestamp.now(),
      date: hasDateField(data) ? Timestamp.fromDate(data.date) : undefined
    };
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
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as T[];
  }
};

export default db;
