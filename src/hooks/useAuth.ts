import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export function useAuth(requireAuth = false) {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (requireAuth && !token) {
      navigate('/login');
    }
  }, [requireAuth, token, navigate]);

  return { user, token, isAuthenticated: !!token };
}