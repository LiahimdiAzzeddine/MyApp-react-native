import axios from 'axios';
import Constants from 'expo-constants';

const apiUrl = "https://tico.foodhea.com";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export default axiosInstance;

export const axiosPrivate = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
