import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCInw1-3dqnxZ9S_oVVkLhEdEJx2byAFWA",
  authDomain: "desings-by-ohlala.firebaseapp.com",
  projectId: "desings-by-ohlala",
  storageBucket: "desings-by-ohlala.firebasestorage.app",
  messagingSenderId: "130355956024",
  appId: "1:130355956024:web:045f69a62aee442a6dd9cd",
  measurementId: "G-JL325R8E4Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;
