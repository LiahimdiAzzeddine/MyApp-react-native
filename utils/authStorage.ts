import { User } from '@/types/user';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';
const USER_INFO_KEY = 'userInfo';

export const saveTokens = async (token: string, user: User) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(user));
};

export const getAccessToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const deleteTokens = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_INFO_KEY);
};

export const getUserInfo = async (): Promise<User | null> => {
  const json = await SecureStore.getItemAsync(USER_INFO_KEY);
  return json ? JSON.parse(json) : null;
};