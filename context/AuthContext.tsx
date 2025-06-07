// context/AuthContext.tsx

import React, { createContext, useState, useEffect } from 'react';
import { saveTokens, getAccessToken, getUserInfo, deleteTokens } from '../utils/authStorage';
import { useRouter } from 'expo-router';
import { User } from '@/types/user';

interface AuthContextProps {
  userToken: string | null;
  userInfo: User | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUserLevel: (newLevel: any) => Promise<void>; 
}

export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  userInfo: null,
  login: async () => {},
  logout: async () => {},
  updateUserLevel: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadAuthData = async () => {
      const token = await getAccessToken();
      const user = await getUserInfo();
      setUserToken(token);
      setUserInfo(user);
    };
      
    loadAuthData();
  }, []);

  const login = async (token: string, user: User) => {

    await saveTokens(token, user);
    setUserToken(token);
    setUserInfo(user);
  };

  const logout = async () => {
    await deleteTokens();
    setUserToken(null);
    setUserInfo(null);
    router.replace('/login'); 
  };
    
const updateUserLevel = async (newLevel: any) => {
  if (userInfo) {
    const updatedUser = {
      ...userInfo,
      levels: newLevel,
    };

    setUserInfo(updatedUser);
    await saveTokens(userToken || '', updatedUser); // MAJ dans SecureStore
  }
};

  return (
    <AuthContext.Provider value={{ userToken, userInfo, login, logout,updateUserLevel  }}>
      {children}
    </AuthContext.Provider>
  );
};
