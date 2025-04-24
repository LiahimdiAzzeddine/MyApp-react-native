import { useState } from 'react';
import api from '@/utils/axiosInstance';

const useGetDemandsByUserId = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<any[]>([]); // ou typé si tu connais la structure


  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/requests/user`);
      const data = response.data;
      if (response.status === 200) {
        setRequests(data.data);
        return data.data;
      } else {
        setError('Erreur inattendue lors de la récupération des demandes.');
        return false;
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Aucune demande trouvée pour cet utilisateur.');
      } else {
        setError('Erreur lors de la récupération des demandes.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    error,
    requests,
    fetchRequests,
    setError,
  };
};

export default useGetDemandsByUserId;
