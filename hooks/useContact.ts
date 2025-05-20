import { useState } from "react";
import axios from "../api/axios";
import { useToast } from "@/hooks/useToast";

const CONTACT_URL = "/api/auth/contact";

export interface FormValues {
  name: string;
  email: string;
  message: string;
}

const useContact = () => {
  const { triggerToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [sended, setSended] = useState<boolean | null>(null);

  const handleSubmit = async (formValues: FormValues) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(CONTACT_URL, formValues);
      triggerToast("Message envoyé avec succès !", "success");
      setSended(true);
    } catch (err: any) {
      const errors = err.response?.data?.errors || {};
      setError(errors);
      triggerToast("Erreur lors de l'envoi du message.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    error,
    sended,
  };
};

export default useContact;
