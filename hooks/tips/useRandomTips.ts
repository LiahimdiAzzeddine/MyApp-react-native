import { useState, useEffect } from "react";
import api from '@/utils/axiosInstance';
import { Tip } from "@/types/tip";

const useRandomTips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRandomTips = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/api/exclusive-advices");

        if (isMounted && response.data?.success) {
          setTips(response.data.data);
        }
      } catch (err: any) {
        console.log("🚀 ~ fetchRandomTips ~ err:",JSON.stringify(err,null,2) )
        if (isMounted) {
          setError(err.message || "Une erreur est survenue");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    

    fetchRandomTips();

    return () => {
      isMounted = false;
    };
  }, []);

  return { tips, loading, error };
};

export default useRandomTips;
