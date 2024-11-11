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
  Timestamp
} from 'firebase/firestore';

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

// Helper function to convert Firestore data to our types
const convertTimestamps = (data: any) => {
  if (data?.date) {
    data.date = data.date.toDate();
  }
  if (data?.createdAt) {
    data.createdAt = data.createdAt.toDate();
  }
  if (data?.updatedAt) {
    data.updatedAt = data.updatedAt.toDate();
  }
  return data;
};

// Database operations
export const db_ops = {
  // Create a new document
  async create<T>(collectionName: string, data: T, id?: string): Promise<string> {
    const docRef = id ? doc(db, collectionName, id) : doc(collection(db, collectionName));
    
    // Convert dates to Firestore Timestamps
    const processedData = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      date: data['date'] ? Timestamp.fromDate(new Date(data['date'])) : null
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
  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, collectionName, id);
    const processedData = {
      ...data,
      updatedAt: Timestamp.now(),
      date: data['date'] ? Timestamp.fromDate(new Date(data['date'])) : undefined
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
