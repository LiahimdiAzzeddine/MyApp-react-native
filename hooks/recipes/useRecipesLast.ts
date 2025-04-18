import { useState, useEffect } from 'react';
import axios from '@/api/axios'; // adapte ce chemin selon ton projet
import { Recipe, UseRecipesLastResult } from '@/types/recipe';


const useRecipesLast = (
  regimePreferences: string[] | null = null,
  allergenPreferences: string[] | null = null,
  title: string = '',
  search?: any
): UseRecipesLastResult => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const params: Record<string, any> = {};

        if (regimePreferences) params.regimePreferences = regimePreferences;
        if (allergenPreferences) params.allergenPreferences = allergenPreferences;
        if (title) params.title = title;

        const response = await axios.get('/api/recipe/last', { params });
        const data = response.data ? Object.values(response.data) as Recipe[] : [];

        setRecipes(data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Une erreur est survenue');
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [regimePreferences, allergenPreferences, title, search]);

  return { recipes, loading, error };
};

export default useRecipesLast;
