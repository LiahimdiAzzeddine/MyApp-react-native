import { useState, useEffect } from 'react';
import axios from '@/api/axios';
import { Recipe } from '@/types/recipe';
import { getRFavorite } from '@/utils/favoritesController';


const useRecipeById = (id: number) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convertir l'id en string pour la recherche
        const idString = id.toString();

        // Chercher directement la recette dans les favoris locaux
        const localRecipe = await getRFavorite(idString);
        
        if (localRecipe) {
          setRecipe(localRecipe);
          setLoading(false);
          return; // Pas besoin d'appeler le backend
        }

        // Si la recette n'est pas dans les favoris locaux, appeler le backend
        const response = await axios.get(`/api/recipe/${id}`);
        setRecipe(response.data);
        
      } catch (err: any) {
        console.error('Erreur lors de la récupération de la recette:', err);
        setError(err?.response?.data?.error || 'Une erreur est survenue');
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    } else {
      setLoading(false);
    }
  }, [id]);

  return { recipe, loading, error };
};

export default useRecipeById;