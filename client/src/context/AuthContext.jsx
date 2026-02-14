import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { getToken, signOut } = useClerkAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = useCallback(async () => {
    try {
      await signOut();
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }, [signOut]);

  // Sync Clerk user with our backend user
  useEffect(() => {
    let isMounted = true;

    const syncUser = async () => {
      // Don't run until Clerk is ready
      if (!isLoaded) return;

      if (isSignedIn && clerkUser) {
        setLoading(true);
        try {
          console.log('🔄 AuthContext: Initiating sync for', clerkUser.id);
          const clerkToken = await getToken();
          const { setAuthToken } = await import('../services/api');
          setAuthToken(clerkToken);

          try {
            const userData = await authService.getCurrentUser();
            if (isMounted) setUser(userData.user);
            console.log('✅ AuthContext: User loaded from backend');
          } catch (err) {
            console.log('⚠️ AuthContext: User not found in backend, attempting to sync...', err);
            const syncData = {
              id: clerkUser.id,
              firstName: clerkUser.firstName,
              lastName: clerkUser.lastName,
              imageUrl: clerkUser.imageUrl,
              email: clerkUser.primaryEmailAddress ? clerkUser.primaryEmailAddress.emailAddress : null
            };
            const syncedData = await authService.syncClerkUser(syncData);
            if (isMounted) setUser(syncedData.user);
            console.log('✅ AuthContext: User synced with backend');
          }
        } catch (err) {
          console.error('❌ AuthContext: Failed to sync user with backend:', err);
          if (isMounted) setError('Failed to sync user data');
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    syncUser();
    return () => { isMounted = false; };
  }, [isLoaded, isSignedIn, clerkUser, getToken]);

  const isAdmin = useCallback(() => {
    return user?.role === 'admin' || user?.role === 'ADMIN';
  }, [user]);

  const isLoggedIn = useCallback(() => {
    return isSignedIn && !!user;
  }, [isSignedIn, user]);

  const value = {
    user,
    clerkUser,
    loading: !isLoaded || loading,
    isSignedIn,
    error,
    isAdmin,
    isLoggedIn,
    logout,
    setUser,
    setError,
    getToken // Useful for manual API calls
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
