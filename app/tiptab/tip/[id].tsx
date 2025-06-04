import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import TipDetails from '@/components/tips/TipDetails';
import ErrorMessage from '@/components/tips/ErrorMessage';
import { createTip } from '@/utils/createTips';
import { getFavorite } from '@/utils/favoritesController';
import useTipById from '@/hooks/tips/useTipById';
import { FormattedTip } from '@/types/tip';

const Tip: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const tipId = String(id);

  const [localTip, setLocalTip] = useState<FormattedTip | null>(null);
  const [checkingLocal, setCheckingLocal] = useState(true);

  const { tip, loading, error } = useTipById(tipId);
  const tipForme = tip ? createTip(tip) : null;

  useEffect(() => {
    if (!id) {
      router.replace('/(tabs)/tips');
      return;
    }

    const checkLocalFavorite = async () => {
      try {
        const favoriteTip = await getFavorite(tipId);
        if (favoriteTip) setLocalTip(favoriteTip);
      } catch {
        // Silently ignore error
      } finally {
        setCheckingLocal(false);
      }
    };

    checkLocalFavorite();
  }, [id]);

  if (!id || checkingLocal || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (!localTip && (error || !tipForme)) {
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
 const tipo=localTip || tipForme;
  return <TipDetails tip={tipo} />;
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
