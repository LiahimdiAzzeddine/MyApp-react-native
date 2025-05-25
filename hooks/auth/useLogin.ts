import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { useToast } from "../useToast";
import { useSpinner } from "@/context/LoadingContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any | null>(null);
  const { login } = useContext(AuthContext);
  const [status, setStatus] = useState(null);
  const { setSpinner  } = useSpinner();


  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { triggerToast } = useToast();

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    setLoading(true);
    setSpinner(true)
    setErrorMessage(null);
    try {
      const response = await axios.post(apiUrl + "/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { access_token, user } = response.data;
        await login(access_token, user);
        triggerToast(
          "Connexion réussie. Vous êtes maintenant connecté.",
          "success"
        );
        return true;
      } else {
        setErrorMessage("Échec de la connexion");
        triggerToast("Erreur de connexion. Échec de la connexion.", "error");

        return false;
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Erreur lors de la connexion";
      const errorDetails = error.response?.data?.errors || null;
      console.log("🚀 ~ useLogin ~ errorDetails:", errorDetails);
      if (error?.status) {
        setStatus(error.status);
      }
      triggerToast(message, "error");
      setErrorMessage(errorDetails);
      return false;
    } finally {
      setLoading(false);
      setSpinner(false)
    }
  };

  return {
    handleSubmit,
    loading,
    errorMessage,
    status,
    setStatus,
  };
};
