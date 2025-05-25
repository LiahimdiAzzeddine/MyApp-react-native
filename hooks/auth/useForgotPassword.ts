import { useSpinner } from '@/context/LoadingContext';
import api from '@/utils/axiosInstance';
import { useState } from 'react';

type ForgotPasswordData = {
  email: string;
};

type ForgotPasswordResponse = {
  success: boolean;
};

const useForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | Record<string, string[]> | null>(null);
const { setSpinner  } = useSpinner();
  const handleForgotPassword = async (
    userData: ForgotPasswordData
  ): Promise<ForgotPasswordResponse> => {
    setLoading(true);
    setSpinner(true);
    setError(null);

    try {
      const response = await api.post('/api/auth/forgot-password', userData);

      if (response.data.success) {
        return { success: true };
      } else {
        setError(response.data.message || 'Une erreur est survenue');
        return { success: false };
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.errors || 'Une erreur est survenue. Veuillez réessayer.'
      );
      return { success: false };
    } finally {
      setLoading(false);
      setSpinner(false);
    }
  };

  return { handleForgotPassword, loading, error };
};

export default useForgotPassword;
