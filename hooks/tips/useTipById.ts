import { useState, useEffect } from 'react';
import axios from '@/api/axios'; 
import { Tip } from '@/types/tip';


/**
 * Hook personnalisé pour récupérer un conseil par son ID
 * @param id L'identifiant du conseil à récupérer
 * @returns Un objet contenant le conseil, l'état de chargement et les erreurs éventuelles
 */
const useTipById = (id: string | null) => {
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ne rien faire si l'ID est null ou undefined
    if (!id) {
      setLoading(false);
      return;
    }

    // Fonction pour récupérer le conseil depuis l'API
    const fetchTipById = async () => {
      setLoading(true);
      setError(null);

      try {
        // Appel à l'API pour récupérer le conseil par ID
        const response = await axios.get(`/api/tips/${id}`);
        setTip(response.data);
      } catch (err) {
        // Gestion des erreurs avec TypeScript
        const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
        setError(errorMessage);
        console.error('Erreur lors de la récupération du conseil:', err);
      } finally {
        setLoading(false);
      }
    };

    // Exécuter la fonction de récupération
    fetchTipById();
  }, [id]); // Réexécuter lorsque l'ID change

  return { tip, loading, error };
};

export default useTipById;