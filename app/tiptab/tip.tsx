import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Importation des hooks et composants personnalisés
import useTipById from '@/hooks/tips/useTipById';
import TipDetails from '@/components/tips/TipDetails';
import ErrorMessage from '@/components/tips/ErrorMessage';
import { createTip } from '@/utils/createTips';

// Définition des types pour la navigation
type RootStackParamList = {
  Tab3: undefined;
  TipScreen: { id: string };
  // Autres écrans de votre application...
};

type TipScreenRouteProp = RouteProp<RootStackParamList, 'TipScreen'>;
type TipScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tip: React.FC = () => {
  // Récupération des paramètres de route (équivalent à useParams)
  const route = useRoute<TipScreenRouteProp>();
  const id = route.params?.id;
  
  // Utilisation du hook personnalisé
  const { tip, loading, error } = useTipById(id);
  
  // Navigation (équivalent à useIonRouter)
  const navigation = useNavigation<TipScreenNavigationProp>();
  
  // Formatage du tip avec la fonction createTip
  const tipForme = tip ? createTip(tip) : {};

  // Fonction pour naviguer vers une autre page
  const goToPage = (path: keyof RootStackParamList) => {
    navigation.replace(path);
  };

  // Affichage du spinner pendant le chargement
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  // Affichage du message d'erreur
  if (error || !tip) {
    return (
      <View style={styles.container}>
        <ErrorMessage
          message={error || "Aucun conseil trouvé"}
          icon={<Ionicons name="alert-circle" size={24} color="#FF6B35" />}
          onClose={() => goToPage('Tab3')}
        />
      </View>
    );
  }

  // Affichage des détails du tip
  return (
    <TipDetails tip={tipForme} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
});

export default Tip;