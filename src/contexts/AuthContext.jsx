"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetCurrentUserQuery, useLogoutMutation } from '@/api/auth/authApi';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(
    typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : false
  );
  
  const { data, isLoading: isLoadingUser, refetch, error } = useGetCurrentUserQuery(undefined, {
    skip: !hasToken, // Skip query if no token
    refetchOnMountOrArgChange: true,
  });
  const [logoutMutation] = useLogoutMutation();

  // Update hasToken when localStorage changes
  useEffect(() => {
    const checkToken = () => {
      const token = typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : false;
      setHasToken(token);
    };
    
    // Check token on mount
    checkToken();
    
    // Listen for storage changes (in case token is set/removed elsewhere)
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkToken);
      return () => window.removeEventListener('storage', checkToken);
    }
  }, []);

  useEffect(() => {
    if (!hasToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    if (!isLoadingUser) {
      if (data?.data?.user) {
        setUser(data.data.user);
      } else if (error) {
        // Token might be invalid, remove it
        localStorage.removeItem('auth_token');
        setHasToken(false);
        setUser(null);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }
  }, [data, isLoadingUser, error, hasToken]);

  const login = (loginData) => {
    // loginData should contain { access_token, user }
    if (loginData?.access_token) {
      localStorage.setItem('auth_token', loginData.access_token);
      setHasToken(true);
      // Set user from login response, query will automatically refetch due to hasToken change
      if (loginData.user) {
        setUser(loginData.user);
      }
      // The query will automatically run when hasToken becomes true
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear token and user
      localStorage.removeItem('auth_token');
      setHasToken(false);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    if (!hasToken) {
      return;
    }
    try {
      const result = await refetch();
      if (result?.data?.data?.user) {
        setUser(result.data.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      // Token might be invalid, remove it
      localStorage.removeItem('auth_token');
      setHasToken(false);
      setUser(null);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user && hasToken,
    userRole: user?.role?.toLowerCase() || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
