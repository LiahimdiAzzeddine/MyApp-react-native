import { useState } from "react";
import axios from "../api/axios";
import { useToast } from "./useToast";

const PRODUCT_ISSUES_URL = "/api/product-issues/store";

interface FormValues {
  user_id?: number;
  message: string;
  gtin: string;
}

const useProductIssues = () => {
  const { triggerToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [sended, setSended] = useState<boolean | any>(false);

  const handleSubmit = async (formValues: FormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(PRODUCT_ISSUES_URL, formValues);
      triggerToast("Message envoyé avec succès !", "success");
      setSended(response?.data || true);
    } catch (err: any) {
      const errors = err.response?.data?.errors || "Erreur inconnue.";
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

export default useProductIssues;
