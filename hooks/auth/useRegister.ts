// hooks/useRegister.ts
import { useState } from 'react';
import axios from '../../api/axios';
import { useToast } from '../useToast';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const { triggerToast } = useToast();
  const register = async ({
    username,
    email,
    password,
    password_confirmation,
    role_id,
  }: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    role_id: number;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
        password_confirmation,
        role_id,
      });

      triggerToast('Enregistrement réussi', 'success');
      navigation.navigate('login');

      Alert.alert(
        'Validation',
        'Nous avons envoyé un email de confirmation à votre boîte mail.'
      );

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de l'enregistrement.";
      Alert.alert('Erreur', errorMessage);
      throw error?.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export default useRegister;
