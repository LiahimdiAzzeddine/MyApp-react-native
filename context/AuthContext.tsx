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
}

export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  userInfo: null,
  login: async () => {},
  logout: async () => {},
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
    console.log("🚀 ~ logout ~ login:",userInfo)
    router.replace('/login'); 
  };
    

  return (
    <AuthContext.Provider value={{ userToken, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
