import { useState } from 'react';
import axios from '@/api/axios';
import { useToast } from './useToast';
import { useBottomSheet } from '@/context/BottomSheetContext';

const TRANSPARENCY_REQUESTS_URL = '/api/transparency-requests/store';

interface FormValues {
  [key: string]: any; // ou tu peux définir les types exacts si connus
}

const useTransparencyRequests = () => {
  const { triggerToast } = useToast(); // Contexte pour les notifications
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sended, setSended] = useState<boolean>(false);
  const { setHasRequested } = useBottomSheet();

  const handleSubmit = async (formValues: FormValues): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(TRANSPARENCY_REQUESTS_URL, formValues);
      triggerToast('Demande envoyée avec succès !', 'success');
      setSended(true);
      setHasRequested(true);
    } catch (err) {
      setError('Erreur lors de l\'envoi.');
      triggerToast('Erreur lors de l\'envoi de la demande.', 'error');
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

export default useTransparencyRequests;
