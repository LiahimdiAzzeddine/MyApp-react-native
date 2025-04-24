import { useState } from "react";
import api from '@/utils/axiosInstance';
import { DemandType } from "@/types/Demand";

const API_URL = "/api/requests";

const useIncrementInsistCount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const incrementInsistCount = async (
    demandeId: number,
    setDemandeState: React.Dispatch<React.SetStateAction<DemandType>>
  ): Promise<void> => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`${API_URL}/${demandeId}/increment-insist`);
      if (response.status === 200 && response.data?.data) {
        setDemandeState(response.data.data);
      } else {
        throw new Error("Erreur lors de l'incrémentation du compteur d'insistance.");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Une erreur est survenue lors de l'envoi de la requête.";
      setError(message);
      console.error("Erreur de requête:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    incrementInsistCount,
    loading,
    error,
  };
};

export default useIncrementInsistCount;
