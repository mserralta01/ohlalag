import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider, SUPER_ADMIN_EMAIL } from '../lib/firebase';

export function useAuth(requireAuth = false, requireAdmin = false) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsSuperAdmin(user?.email === SUPER_ADMIN_EMAIL);
      setLoading(false);

      if (requireAuth && !user) {
        navigate('/login');
      }

      if (requireAdmin && user?.email !== SUPER_ADMIN_EMAIL) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [requireAuth, requireAdmin, navigate]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return { 
    user, 
    loading, 
    signInWithGoogle, 
    signInWithFacebook, 
    logout,
    isAuthenticated: !!user,
    isSuperAdmin
  };
}