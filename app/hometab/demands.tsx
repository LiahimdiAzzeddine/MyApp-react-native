import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useEffect } from 'react';
import useGetDemandsByUserId from '@/hooks/demand/useGetDemandsByUserId';
import useIncrementInsistCount from '@/hooks/demand/useIncrementInsistCount';
import Demand from '@/components/demands/demand';
import { useRouter } from 'expo-router';

export default function Demands() {
  const { loading, error, requests, fetchRequests } = useGetDemandsByUserId();
  const { incrementInsistCount, loading: loadingInsist, error: errorInsist } = useIncrementInsistCount();
  const router = useRouter();

  const handlePress = (idDemand:number) => {
    router.push({ pathname: '/hometab/demandDetail', params: { id: idDemand.toString() } });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView className="p-4">
      {requests.map((req, index) => (
        <Demand
          key={req.id}
          demande={req}
          index={index}
          length={requests.length}
          incrementInsistCount={incrementInsistCount}
          press={handlePress}
        />
      ))}

      {errorInsist && (
        <Text className="text-red-500 mt-2 text-center">{errorInsist}</Text>
      )}
    </ScrollView>
  );
}
