import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useMemo } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import useGetDemandsByUserId from "@/hooks/demand/useGetDemandsByUserId";
import useIncrementInsistCount from "@/hooks/demand/useIncrementInsistCount";
import Demand from "@/components/demands/demand";
import { useRouter } from "expo-router";
import RenderHeader from "@/components/history/renderHeader";
import SkeletonLoader from "@/components/history/SkeletonLoader";
import { DemandType } from "@/types/Demand";
import EmptyLater from "@/components/later/EmptyLater";
import { Search, X } from "lucide-react-native";

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
  const [searchText, setSearchText] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  // Valeurs animées
  const searchBarHeight = useSharedValue(0);
  const searchBarOpacity = useSharedValue(0);
  const toggleButtonScale = useSharedValue(1);

  const handlePress = (idDemand: number) => {
    router.push({
      pathname: "/hometab/demandDetail",
      params: { id: idDemand.toString() },
    });
  };

  // Fonction pour afficher la barre de recherche avec animation
  const showSearch = () => {
    setShowSearchBar(true);
  
    searchBarHeight.value = withSpring(60, {
      damping: 25,     // amortissement un peu plus fort → moins de rebond
      stiffness: 300,  // plus raide → animation plus rapide
    });
  
    searchBarOpacity.value = withTiming(1, { duration: 70 }); // plus rapide (80ms)
  
    toggleButtonScale.value = withSpring(0, {
      damping: 25,
      stiffness: 300,
    });
  };
  

  // Fonction pour masquer la barre de recherche avec animation
  const hideSearch = () => {
    searchBarHeight.value = withTiming(0, { duration: 250 });
    searchBarOpacity.value = withTiming(0, { duration: 250 });
    toggleButtonScale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    
    // Masquer la barre et effacer le texte après l'animation
    setTimeout(() => {
      setShowSearchBar(false);
      setSearchText("");
    }, 100);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filtrage des demandes basé sur la recherche
  const filteredRequests = useMemo(() => {
    if (!searchText.trim() || !showSearchBar) {
      return requests;
    }
    
    const searchLower = searchText.toLowerCase().trim();
    return requests.filter((request) => {
      const titre = request.titre?.toLowerCase() || "";
      const marque = request.marque?.toLowerCase() || "";
      
      return titre.includes(searchLower) || marque.includes(searchLower);
    });
  }, [requests, searchText, showSearchBar]);

  // Styles animés
  const animatedSearchBarStyle = useAnimatedStyle(() => {
    return {
      height: searchBarHeight.value,
      opacity: searchBarOpacity.value,
      overflow: 'hidden',
    };
  });

  const animatedToggleButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: toggleButtonScale.value }],
    };
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <RenderHeader title="Suivi de mes demandes" />
        <SkeletonLoader />
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
      length={filteredRequests.length}
      incrementInsistCount={incrementInsistCount}
      press={handlePress}
    />
     {index < filteredRequests.length - 1 && (
            <View style={styles.separator} />
          )}
        </>
  );

  const renderSearchBar = () => (
    <Animated.View style={[styles.searchContainer, animatedSearchBarStyle]}>
      <View style={styles.searchInputContainer} >
        <Search size={20} color="#4E986D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          className="text-custom-green-text text-s ArchivoLight leading-archivo italic"
          placeholder="Rechercher par nom ou marque..."
          placeholderTextColor="#4E986D"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
        />
        <TouchableOpacity
          onPress={hideSearch}
          style={styles.closeSearchButton}
        >
          <X size={20} color="#4E986D" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderSearchToggle = () => (
    <Animated.View style={[styles.searchToggleContainer, animatedToggleButtonStyle]}>
      <TouchableOpacity
        onPress={showSearch}
        style={styles.searchToggleButton}
        activeOpacity={0.7}
      >
        <Search size={16} color="#42a199" />
      </TouchableOpacity>
    </Animated.View>
  );
  
  const renderEmptyState = () => {
    if (requests.length === 0) {
      return (
        <EmptyLater
          title="Aucune demande"
          description="Envoyez une demande de transparence pour consulter les demandes ici."
        />
      );
    }
    
    if (filteredRequests.length === 0 && searchText.trim() && showSearchBar) {
      return (
        <View style={styles.emptySearchContainer}>
          <Text style={styles.emptySearchText}>
            Aucune demande trouvée pour "{searchText}"
          </Text>
          <Text style={styles.emptySearchSubtext}>
            Essayez avec d'autres mots-clés
          </Text>
        </View>
      );
    }
    
    return null;
  };

  return (
    <View style={styles.container}>
      <RenderHeader title="Suivi de mes demandes" />
      
      {requests.length > 0 && renderSearchToggle()}
      {requests.length > 0 && renderSearchBar()}
      
      {renderEmptyState() || (
        <FlatList
          data={filteredRequests}
          keyExtractor={(item) => item.gtin}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

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
  searchContainer: {
    paddingHorizontal: 16,
    backgroundColor: "white",
    justifyContent: 'center',
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#c7f0d8",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#333",
  },
  emptySearchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptySearchText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "500",
  },
  emptySearchSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  searchToggleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "flex-end",
    position: 'absolute',
    top: 0,
    right: 0,
  },
  searchToggleButton: {
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  closeSearchButton: {
    padding: 4,
    marginLeft: 8,
  },
});