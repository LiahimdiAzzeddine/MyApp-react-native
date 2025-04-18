import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { login } = useContext(AuthContext);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const handleSubmit = async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<boolean> => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await axios.post(apiUrl+'/api/auth/login', {
          email,
          password,
        });
  
        if (response.status === 200) {
          const { access_token,user } = response.data;
          await login(access_token,user);
          return true; 
        } else {
          setErrorMessage('Échec de la connexion');
          return false;
        }
      } catch (error: any) {
        const message = error.response?.data?.message || 'Erreur lors de la connexion';
        setErrorMessage(message);
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    return {
      handleSubmit,
      loading,
      errorMessage,
    };
  };
