import { useState, useEffect } from "react";
import axios from "@/api/axios";
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
        const response = await axios.get("/api/tips/random");

        if (isMounted && response.data?.success) {
          setTips(response.data.data);
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

    fetchRandomTips();

    return () => {
      isMounted = false;
    };
  }, []);

  return { tips, loading, error };
};

export default useRandomTips;
