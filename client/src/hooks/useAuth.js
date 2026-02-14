import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuthCheck = () => {
  const { user, loading } = useAuthContext();
  
  return { isAuthenticated: !!user, loading };
};

export const useRequireAuth = (redirectTo = '/login') => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  return { user, loading };
};

export const useRequireAdmin = (redirectTo = '/dashboard') => {
  const { user, loading, isAdmin } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin())) {
      navigate(redirectTo);
    }
  }, [user, loading, isAdmin, navigate, redirectTo]);

  return { user, loading };
};
