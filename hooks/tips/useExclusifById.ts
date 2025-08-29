import { useState, useEffect } from 'react'; 
import api from '@/utils/axiosInstance';
import { FormattedTip } from '@/types/tip';
import { createTip } from '@/utils/createTips';
import { useAppContext } from '@/context/AppContext';

const useExclusifById = (id: string | null) => {
  const [tip, setTip] = useState<FormattedTip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOnline } = useAppContext();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setTip(null);
      setError(null);
           
      return;
    }

    const findTip = async () => {
      setLoading(true);
      setError(null);
      setTip(null);

      try {
        if (isOnline) {
          try {
            const response = await api.get(`/api/advices/${id}`);
            const remoteTip = createTip(response.data);
            setTip(remoteTip); 
          } catch (serverError: any) {
            console.error('Erreur serveur:', serverError);

            if (serverError.response?.status === 405) {
              setError("La méthode d'accès à ce conseil est interdite (405)");
            } else if (serverError.response?.status === 404) {
              setError("Ce conseil n'existe pas (404)");
            } else {
              setError(serverError.message || "Erreur de connexion au serveur");
            }
          }
        } else {
          setError('Ce conseil n\'est pas disponible hors ligne');
        }
      } finally {
        setLoading(false);
      }
    };

    findTip();
  }, [id, isOnline]);

  return { tip, loading, error };
};

export default useExclusifById;
