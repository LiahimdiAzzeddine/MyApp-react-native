
// Tip.tsx - Composant simplifié
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import TipDetails from '@/components/tips/TipDetails';
import ErrorMessage from '@/components/tips/ErrorMessage';
import useTipById from '@/hooks/tips/useTipById';

const Tip: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const tipId = String(id);

  // Le hook gère maintenant toute la logique de recherche
  const { tip, loading, error } = useTipById(tipId);

  useEffect(() => {
    if (!id) {
      router.replace('/(tabs)/tips');
    }
  }, [id]);

  // État de chargement
  if (!id || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  // Gestion des erreurs
  if (error || !tip) {
    return (
      <View style={styles.container}>
        <ErrorMessage
          message={error || 'Aucun conseil trouvé.'}
          icon={<Ionicons name="alert-circle" size={24} color="#FF6B35" />}
          onClose={() => router.replace('/(tabs)/tips')}
        />
      </View>
    );
  }

  // Affichage du tip
  return <TipDetails tip={tip} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
});

export default Tip;