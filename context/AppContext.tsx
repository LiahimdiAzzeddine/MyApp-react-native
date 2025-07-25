import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import NetInfo from "@react-native-community/netinfo";

// Définition du type du contexte
export interface AppContextType {
  refreshTips: () => void;
  lastUpdated: Date | null;
  refreshFTips: () => void;
  lastUpdatedF: Date | null;
  refreshRecipes: () => void;
  lastUpdatedR: Date | null;
  refreshFRecipes: () => void;
  lastUpdatedFR: Date | null;
  searchRecipes: boolean;
  setSearchRecipes: (value: boolean) => void;
  isOnline: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider du contexte
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [lastUpdatedF, setLastUpdatedF] = useState<Date | null>(null);
  const [lastUpdatedR, setLastUpdatedR] = useState<Date | null>(null);
  const [lastUpdatedFR, setLastUpdatedFR] = useState<Date | null>(null);
  const [searchRecipes, setSearchRecipes] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Suivi de l'état de connexion réseau
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false);
    });

    // Nettoyage de l'abonnement
    return () => {
      unsubscribe();
    };
  }, []);

  // Met à jour la date de rafraîchissement
  const refreshTips = useCallback(() => {
    setLastUpdated(new Date());
  }, []);
    const refreshFTips = useCallback(() => {
    setLastUpdatedF(new Date());
  }, []);
  const refreshRecipes = useCallback(() => {
    setLastUpdatedR(new Date());
  }, []);
  const refreshFRecipes = useCallback(() => {
    setLastUpdatedFR(new Date());
  }, []);

  return (
    <AppContext.Provider
      value={{
        refreshTips,
        lastUpdated,
        refreshFTips,
        lastUpdatedF,
        searchRecipes,
        setSearchRecipes,
        lastUpdatedR,
        refreshRecipes,
        lastUpdatedFR,
        refreshFRecipes,
        isOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
