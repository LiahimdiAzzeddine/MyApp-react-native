import { useState, useEffect } from 'react';
import axios from '@/api/axios'; 
import { Tip, FormattedTip } from '@/types/tip';
import { getFavorite } from '@/utils/favoritesController';
import { createTip } from '@/utils/createTips';
import { useAppContext } from '@/context/AppContext';

/**
 * Hook personnalisé pour récupérer un conseil par son ID
 * Recherche d'abord localement, puis sur le serveur si nécessaire
 * @param id L'identifiant du conseil à récupérer
 * @returns Un objet contenant le conseil formaté, l'état de chargement et les erreurs éventuelles
 */
const useTipById = (id: string | null) => {
  const [tip, setTip] = useState<FormattedTip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOnline } = useAppContext();

  useEffect(() => {
    // Ne rien faire si l'ID est null ou undefined
    if (!id) {
      setLoading(false);
      setTip(null);
      setError(null);
      return;
    }

    // Fonction principale de recherche
    const findTip = async () => {
      setLoading(true);
      setError(null);
      setTip(null);

      try {
        // 1. Recherche locale d'abord
        console.log(`Recherche locale pour le tip ${id}...`);
        const localTip = await getFavorite(id);
        
        if (localTip) {
          console.log(`Tip ${id} trouvé localement`);
          setTip(localTip);
          setLoading(false);
          return; // Tip trouvé localement, on s'arrête ici
        }

        console.log(`Tip ${id} non trouvé localement`);

        // 2. Si pas trouvé localement ET utilisateur en ligne, chercher sur le serveur
        if (isOnline) {
          console.log(`Recherche sur le serveur pour le tip ${id}...`);
          
          try {
            const response = await axios.get(`/api/tips/${id}`);
            const remoteTip = createTip(response.data);
            
            console.log(`Tip ${id} trouvé sur le serveur`);
            setTip(remoteTip);
          } catch (serverError) {
            console.error('Erreur serveur:', serverError);
            const errorMessage = serverError instanceof Error 
              ? serverError.message 
              : 'Erreur de connexion au serveur';
            setError(errorMessage);
          }
        } else {
          // Utilisateur hors ligne et pas de tip local
          console.log('Utilisateur hors ligne et tip non disponible localement');
          setError('Ce conseil n\'est pas disponible hors ligne');
        }

      } catch (localError) {
        console.error('Erreur lors de la recherche locale:', localError);
        
        // Si erreur locale ET utilisateur en ligne, essayer quand même le serveur
        if (isOnline) {
          try {
            console.log('Tentative de récupération sur le serveur après erreur locale...');
            const response = await axios.get(`/api/tips/${id}`);
            const remoteTip = createTip(response.data);
            setTip(remoteTip);
          } catch (serverError) {
            const errorMessage = serverError instanceof Error 
              ? serverError.message 
              : 'Erreur lors de la récupération du conseil';
            setError(errorMessage);
          }
        } else {
          setError('Erreur d\'accès aux données locales');
        }
      } finally {
        setLoading(false);
      }
    };

    findTip();
  }, [id, isOnline]); // Réexécuter si l'ID ou l'état de connexion change

  return { tip, loading, error };
};

export default useTipById;