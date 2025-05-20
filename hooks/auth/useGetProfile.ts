import { useState, useEffect } from 'react';
import api from '@/utils/axiosInstance';
import { User } from '@/types/user';


const useGetProfile = () => {

  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // pour éviter les updates après démontage du composant

    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile');
        if (isMounted) {
          setProfile(response.data.data); // adapte selon la structure réelle
        }
      } catch (err: any) {
        if (isMounted) {
          const message = err.response?.data?.error || 'An error occurred';
          setError(message);
          setProfile(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return { profile, setProfile, loading, error };
};

export default useGetProfile;
