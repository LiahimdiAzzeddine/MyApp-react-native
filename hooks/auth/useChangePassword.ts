import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import api from '@/utils/axiosInstance';
import { useToast } from '../useToast';
import { useSpinner } from '@/context/LoadingContext';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

interface ChangePasswordParams {
  currentPassword?: string;
  newPassword: string;
  newPasswordConfirmation: string;
  emailParam?: string|null;
  token?: string;
}

const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string[]> | null>(null);
  const { triggerToast } = useToast();
  const navigation = useNavigation<any>(); // adapt based on your navigator
  const { setSpinner  } = useSpinner();
  const router=useRouter();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const { logout } = useContext(AuthContext);
  const goToPage = (path: string) => {
    navigation.replace(path);
  };

  const changePassword = async ({
    currentPassword,
    newPassword,
    newPasswordConfirmation,
    emailParam,
    token,
  }: ChangePasswordParams) => {
      

    setLoading(true);
    setSpinner(true);
    setError(null);

    try {
      let response;
      if (emailParam) {
        // Changement de mot de passe via email/token
        response = await axios.post(apiUrl+'/api/auth/change-password', {
          email: emailParam,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
          token,
        });
        triggerToast(response.data.message || 'Mot de passe changé avec succès.', 'success');
        goToPage('Home'); // ou autre nom d'écran
      } else {
        // Utilisateur connecté

        response = await api.post('api/profile/change-password', {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        });
        triggerToast(response.data.message || 'Mot de passe changé avec succès.', 'success');
        logout()
        router.replace('/(auth)/login')
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
        triggerToast('Erreur de validation. Vérifiez les champs indiqués.', 'error');
      } else {
        triggerToast('Échec de la mise à jour du mot de passe.', 'error');
      }
    } finally {
      setLoading(false);
      setSpinner(false)
    }
  };

  return { changePassword, loading, error };
};

export default useChangePassword;
