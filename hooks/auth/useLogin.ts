import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { useToast } from "../useToast";
import { useSpinner } from "@/context/LoadingContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any | null>(null);
  const { login } = useContext(AuthContext);
  const [status, setStatus] = useState(null);
  const { setSpinner  } = useSpinner();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { triggerToast } = useToast();

  // On récupère le token push et son état envoyé une fois au mount
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [pushTokenSent, setPushTokenSent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPushToken() {
      const token = await AsyncStorage.getItem('pushToken');
      const sent = await AsyncStorage.getItem('pushTokenSent');
      setPushToken(token);
      setPushTokenSent(sent);
    }
    fetchPushToken();
  }, []);

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    setLoading(true);
    setSpinner(true);
    setErrorMessage(null);

    try {
      let sendPushToken = false;

      if (pushToken && pushToken !== pushTokenSent) {
        sendPushToken = true;
      }

      const body: any = { email, password };
      if (sendPushToken) {
        body.push_token = pushToken;
      }

      const response = await axios.post(apiUrl + "/api/auth/login", body);

      if (response.status === 200) {
        const { access_token, user } = response.data;
        await login(access_token, user);

        // Marquer localement que le token a été envoyé
        if (sendPushToken && pushToken) {
          await AsyncStorage.setItem('pushTokenSent', pushToken);
          setPushTokenSent(pushToken);
        }

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
      if (error?.status) {
        setStatus(error.status);
      }
      triggerToast(message, "error");
      setErrorMessage(errorDetails);
      return false;
    } finally {
      setLoading(false);
      setSpinner(false);
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
