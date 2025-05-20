import { useState } from 'react';
import api from '@/utils/axiosInstance';

type DeleteAccountResult = {
  success: boolean;
  message: string;
};

const useDeleteAccount = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const deleteAccount = async (): Promise<DeleteAccountResult> => {
    setLoading(true);
    try {
      const response = await api.post('/api/profile/delete-account');
      const message = response.data?.message || 'Account deleted successfully.';
      setSuccess(message);
      setError(null);
      return { success: true, message };
    } catch (err: any) {
      const message = err.response?.data?.error || 'Une erreur est survenue';
      setError(message);
      setSuccess(null);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading, error, success };
};

export default useDeleteAccount;
