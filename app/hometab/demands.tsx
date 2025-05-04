import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useEffect } from "react";
import useGetDemandsByUserId from "@/hooks/demand/useGetDemandsByUserId";
import useIncrementInsistCount from "@/hooks/demand/useIncrementInsistCount";
import Demand from "@/components/demands/demand";
import { useRouter } from "expo-router";
import RenderHeader from "@/components/history/renderHeader";
import SkeletonLoader from "@/components/history/SkeletonLoader";
import { DemandType } from "@/types/Demand";
import EmptyLater from "@/components/later/EmptyLater";

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

export default function Demands() {
  const { loading, error, requests, fetchRequests } = useGetDemandsByUserId();
  const {
    incrementInsistCount,
    loading: loadingInsist,
    error: errorInsist,
  } = useIncrementInsistCount();
  const router = useRouter();

  const handlePress = (idDemand: number) => {
    router.push({
      pathname: "/hometab/demandDetail",
      params: { id: idDemand.toString() },
    });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <RenderHeader title="Suivi de mes demandes" />
        <SkeletonLoader />
      </View>
    );
  }
  // Afficher un message si aucun produit n'est sauvegardé
  if (requests.length === 0) {
    return (
      <View style={styles.container}>
        <RenderHeader title="Suivi de mes demandes" />
          <EmptyLater
                 title="Aucun demande"
                    description="Envoyez une demande de transparence pour consulter les demandes ici."
              />   
      </View>
    );
  }

  

  if (error) return <ErrorMessage message="error"/>;

  const renderItem = ({ item, index }: { item: DemandType; index: number }) => (
    <>
    <Demand
      key={item.id}
      demande={item}
      index={index}
      length={requests.length}
      incrementInsistCount={incrementInsistCount}
      press={handlePress}
    />
     {index < requests.length - 1 && (
            <View style={styles.separator} />
          )}
        </>
  );

  return (
    <View style={styles.container}>
      <RenderHeader title="Suivi de mes demandes" />

      <FlatList
        data={requests}
        keyExtractor={(item) => item.gtin}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {errorInsist && (
        <Text className="text-red-500 mt-2 text-center">{errorInsist}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
  listContent: {
    padding: 16,
  },
  message: {
    color: 'red',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#c7f0d8',
    marginHorizontal: 10,
  },
});
