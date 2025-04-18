// utils/axiosInstance.ts

import axios from 'axios';
import { getAccessToken, deleteTokens } from './authStorage';
import { useRouter } from 'expo-router';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const router = useRouter();

    if (error.response?.status === 401) {
      // Token expired, redirect to login page
      await deleteTokens();
      router.replace('/login'); 
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
