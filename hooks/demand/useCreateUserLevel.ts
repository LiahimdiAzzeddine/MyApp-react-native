import { useContext, useState } from 'react';
import api from '@/utils/axiosInstance';
import { CreateUserLevelPayload, UserLevel } from '@/types/UserLevel';
import { AuthContext } from '@/context/AuthContext';
import { useSpinner } from '@/context/LoadingContext';
import { Alert } from 'react-native';

const useCreateUserLevel = () => {
  const [loading, setLoading] = useState(false);
  const [createdUserLevel, setCreatedUserLevel] = useState<UserLevel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { updateUserLevel } = useContext(AuthContext);
    const { setSpinner  } = useSpinner();
  

  const createUserLevel = async (payload: CreateUserLevelPayload): Promise<UserLevel | false> => {
    setLoading(true);
    setSpinner(true)
    setError(null);

    try {
      const response = await api.post<UserLevel>('/api/user-levels', payload);

      if (response.status === 201) {
        setCreatedUserLevel(response.data);
        updateUserLevel(response.data.user.levels)
        if (response.data.level.id === 4) {
  Alert.alert(
    "Mail envoyé !",
    "Vérifiez votre boîte mail, votre calendrier TiCO vous y attend !"
  );
} else if (response.data.level.id === 5) {
  Alert.alert(
    "Mail envoyé !",
    "Vérifiez votre boîte mail, votre guide TiCO vous y attend !"
  );
}

        return response.data;
      } else {
        setError("Échec lors de la création de la relation utilisateur-niveau.");
        return false;
      }
        
        
    } catch (err: any) {
      
      if (err.response?.status === 422) {
        setError("Validation échouée : user_id ou level_id invalide.");
      } else {
        setError("Une erreur est survenue lors de la création.");
      }
      return false;
    } finally {
      setLoading(false);
          setSpinner(false)

    }
  };

  return {
    loading,
    createdUserLevel,
    error,
    createUserLevel,
    setError,
  };
};

export default useCreateUserLevel;
