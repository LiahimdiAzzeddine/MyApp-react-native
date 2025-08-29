import { useState } from "react";
import api from "@/utils/axiosInstance";
import { Level, LevelApiResponse } from "@/types/Level";

const useGetTotalRequests = () => {
  const [loading, setLoading] = useState(false);
  const [totalRequests, setTotalRequests] = useState<number | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevels, setCurrentLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>();
  const [error, setError] = useState<string | null>(null);

  const fetchTotalRequests = async (): Promise<LevelApiResponse | false> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<LevelApiResponse>("/api/requests/total");

      if (response.status === 200 && response.data.success) {
        const { total_requests, levels, current_levels } = response.data;

        setTotalRequests(total_requests?total_requests:0);

        setLevels(levels);
        setCurrentLevels(current_levels ?? []);
        if (current_levels && current_levels.length > 0) {
          setCurrentLevel(
            current_levels.reduce((max, level) =>
              level.id > max.id ? level : max
            )
          );
        } else {
          setCurrentLevel(null);
        }
        return response.data;
        
      } else {
        setError("Erreur inattendue lors de la récupération des données.");
        return false;
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Utilisateur non authentifié.");
      } else {
        setError("Erreur lors de la récupération des données.");
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
    currentLevels,
    currentLevel,
    error,
    fetchTotalRequests,
    setError,
  };
};

export default useGetTotalRequests;
