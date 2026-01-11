import { useState, useEffect, useCallback } from 'react';

const ADMIN_SESSION_KEY = 'admin_authenticated';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

interface AdminSession {
  authenticated: boolean;
  timestamp: number;
}

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(() => {
    const sessionData = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (sessionData) {
      try {
        const session: AdminSession = JSON.parse(sessionData);
        const now = Date.now();
        if (session.authenticated && (now - session.timestamp) < SESSION_TIMEOUT) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem(ADMIN_SESSION_KEY);
          setIsAuthenticated(false);
        }
      } catch {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const session: AdminSession = {
            authenticated: true,
            timestamp: Date.now(),
          };
          sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
          setIsAuthenticated(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
