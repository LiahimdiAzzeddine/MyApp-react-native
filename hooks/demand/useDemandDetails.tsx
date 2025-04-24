import { useEffect, useState } from 'react';
import api from '@/utils/axiosInstance';
import { DemandType } from '@/types/Demand';

const useDemandDetails = (id:number) => {
  const [demand, setDemand] = useState<DemandType|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDemande = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/requests/show/${id}`);
        setDemand(response.data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement de la demande.');
        setDemand(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDemande();
  }, [id]);

  return { demand, loading, error };
};

export default useDemandDetails;
