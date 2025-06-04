import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { Tip, UseLastTipsResult } from "@/types/tip";

const useLastTips = (
  page = 1,
  limit = 10,
  tipPreferences: number[] = []
): UseLastTipsResult => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLastTips = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api/tips/latest", {
          params: {
            page,
            limit,
            preferences: tipPreferences,
          },
        });

        if (isMounted) {
       
          
          setTips(response.data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Une erreur est survenue");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLastTips();

    return () => {
      isMounted = false; // Permet d'éviter les appels `setState` sur un composant démonté
    };
  }, [tipPreferences, limit, page]);

  return { tips, loading, error };
};

export default useLastTips;
