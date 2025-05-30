import { useState } from "react";
import axios from "../../api/axios"; // Assure-toi que ton axios fonctionne aussi dans un environnement React Native
import { useToast } from "../useToast";
const LOGIN_URL = "/api/send-registration-validation";

type UseSendValidationEmailProps = {
  to_email: string;
  setStatus: any;
};

const useSendValidationEmail = ({ to_email, setStatus }: UseSendValidationEmailProps) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { triggerToast } = useToast(); // Fonction de toast de ton contexte personnalisé

  const sendValidationEmail = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(LOGIN_URL, { to_email });

      if (response.status === 200) {
        setSuccess(true);
        triggerToast("Email de validation envoyé avec succès", "success");
        setStatus(false);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Une erreur est survenue";
      setError(message);
      triggerToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    sendValidationEmail,
  };
};

export default useSendValidationEmail;
