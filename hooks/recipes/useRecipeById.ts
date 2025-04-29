import { useState, useEffect } from 'react';
import axios from '@/api/axios';  // Importation d'axios selon votre configuration
import { Recipe } from '@/types/recipe';



const useRecipeById = (id: number) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recipe/${id}`);
        console.log('Recipe : ', response.data);
        setRecipe(response.data); // Assuming the API returns the recipe object directly
      } catch (err: any) {
        setError(err?.response?.data?.error || 'An error occurred');
        setRecipe(null); // Set to null if there's an error
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe(); // Fetch recipe only if id is provided
    }
  }, [id]);

  return { recipe, loading, error };
};

export default useRecipeById;
