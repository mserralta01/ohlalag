import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCInw1-3dqnxZ9S_oVVkLhEdEJx2byAFWA",
  authDomain: "desings-by-ohlala.firebaseapp.com",
  projectId: "desings-by-ohlala",
  storageBucket: "desings-by-ohlala.appspot.com",
  messagingSenderId: "130355956024",
  appId: "1:130355956024:web:045f69a62aee442a6dd9cd",
  measurementId: "G-JL325R8E4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Super admin email
export const SUPER_ADMIN_EMAIL = 'mserralta@gmail.com';

export default app;