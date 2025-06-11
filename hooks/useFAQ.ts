import { useState, useEffect } from 'react';
import axios from '@/api/axios'; // Assure-toi que ce fichier existe bien
import { AxiosError } from 'axios';

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const useFAQ = () => {
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('/api/faqs');
        setFAQs(response.data ? Object.values(response.data) : []);
      } catch (err: unknown) {
        const axiosError = err as AxiosError;
        setError(axiosError.message || 'Une erreur est survenue');
        setFAQs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return { faqs, loading, error };
};

export default useFAQ;
