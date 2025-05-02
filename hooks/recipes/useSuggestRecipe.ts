import { useState } from "react";
import Toast from "react-native-root-toast";
import api from '@/utils/axiosInstance';

interface RecipeFormValues {
  title: string;
  description: string;
  image?: string;
  [key: string]: any;
}

interface ApiError {
  [key: string]: string[];
}

const recipe_URL = "/api/recipe/store";

const useSuggestRecipe = () => {
  const privateClient = api;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const showToast = (message: string, type: "success" | "danger" | "info" = "info") => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      backgroundColor:
        type === "success"
          ? "green"
          : type === "danger"
          ? "red"
          : "gray",
      textColor: "white",
      shadow: true,
      animation: true,
      hideOnPress: true,
    });
  };

  const handleSubmit = async (formValues: RecipeFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await privateClient.post(recipe_URL, formValues);
      console.log("🚀 ~ handleSubmit ~ response:", response)
      showToast("Recette envoyée avec succès !", "success");
      setSuccess(true);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Une erreur est survenue";
      const errors: ApiError = err?.response?.data?.errors || {};

      setError(errors);
      showToast(errorMessage, "danger");

      console.error("Erreur lors de l'envoi de la recette:", err);
    } finally {
      setLoading(false);
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
