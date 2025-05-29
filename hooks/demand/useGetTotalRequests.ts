import { useState } from 'react';
import api from '@/utils/axiosInstance';
import { Level, LevelApiResponse } from '@/types/Level';

const useGetTotalRequests = () => {
  const [loading, setLoading] = useState(false);
  const [totalRequests, setTotalRequests] = useState<number | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTotalRequests = async (): Promise<LevelApiResponse | false> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<LevelApiResponse>('/api/requests/total');

      if (response.status === 200 && response.data.success) {
        const { total_requests, levels, current_level } = response.data;

        setTotalRequests(30);
        
        setLevels(levels);
        setCurrentLevel(current_level);

        return response.data;
      } else {
        setError('Erreur inattendue lors de la récupération des données.');
        return false;
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Utilisateur non authentifié.');
      } else {
        setError('Erreur lors de la récupération des données.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    totalRequests,
    levels,
    currentLevel,
    error,
    fetchTotalRequests,
    setError,
  };
};

export default useGetTotalRequests;
