import { useState } from "react";
import api from '@/utils/axiosInstance';
import { RecipeValues } from "@/types/recipe";
import { useSpinner } from "@/context/LoadingContext";
import { useToast } from "../useToast";

interface ApiError {
  [key: string]: string[];
}

const recipe_URL = "/api/recipe/store";

const useSuggestRecipe = () => {
  const privateClient = api;
  const { setSpinner } = useSpinner();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { triggerToast } = useToast();

  const handleSubmit = async (formValues: RecipeValues) => {
    // console.log("🚀 ~ handleSubmit ~ formValues:", formValues)
    setLoading(true);
    setSpinner(true)
    setError(null);
    setSuccess(false);

    try {
      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      
      // Add all form fields to FormData
      formData.append('titre', formValues.titre);
      formData.append('nbperson', formValues.nbperson);
      formData.append('difficulty', formValues.difficulty);
      formData.append('prep_time', formValues.prep_time);
      formData.append('cook_time', formValues.cook_time);
      formData.append('rest_time', formValues.rest_time || '0');
      
      // Add arrays
      formValues.types.forEach((type, index) => {
        formData.append(`types[${index}]`, type);
      });
      
      formValues.filters.forEach((filter, index) => {
        formData.append(`filters[${index}]`, filter);
      });
      
      formValues.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][name]`, ingredient.name);
        formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
        formData.append(`ingredients[${index}][unit]`, ingredient.unit);
      });
      
      formValues.steps.forEach((step, index) => {
        formData.append(`steps[${index}]`, step);
      });
      
      // Add image file if present
      if (formValues.image && formValues.image.uri) {
        const imageUri = formValues.image.uri;
        const filename = imageUri.split('/').pop() || 'image.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';
        
        // Create file object for upload
        formData.append('image', {
          uri: imageUri,
          type: type,
          name: filename,
        } as any);
      }

      const response = await privateClient.post(recipe_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      triggerToast("Recette envoyée avec succès !", "success");
      setSuccess(true);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Une erreur est survenue";
      const errors: ApiError = err?.response?.data?.errors || {};
 console.log("🚀 ~ handleSubmit ~ errors:", errors)
      setError(errors);
      triggerToast(errorMessage, "error");
      console.error("Erreur lors de l'envoi de la recette:", err);
    } finally {
      setLoading(false);
      setSpinner(false)
    }
      
     
  };

  return {
    handleSubmit,
    loading,
    error,
    success,
  };
};

export default useSuggestRecipe;