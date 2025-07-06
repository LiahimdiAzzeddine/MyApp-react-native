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
    console.log("🚀 ~ handleSubmit ~ formValues:", formValues)
    setLoading(true);
    setSpinner(true)
    setError(null);
    setSuccess(false);

    try {
      const response = await privateClient.post(recipe_URL, formValues.image);
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
