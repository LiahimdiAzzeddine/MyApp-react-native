import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import useTipById from '@/hooks/tips/useTipById';
import TipDetails from '@/components/tips/TipDetails';
import ErrorMessage from '@/components/tips/ErrorMessage';
import { createTip } from '@/utils/createTips';

type RootStackParamList = {
  Tab3: undefined;
  TipScreen: { id: string };
};

type TipScreenRouteProp = RouteProp<RootStackParamList, 'TipScreen'>;
type TipScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tip: React.FC = () => {
  const route = useRoute<TipScreenRouteProp>();
  const navigation = useNavigation<TipScreenNavigationProp>();
  const id = route.params?.id;

  // Si l'id est manquant, redirection immédiate
  if (!id) {
    navigation.replace('Tab3');
    return null;
  }

  const { tip, loading, error } = useTipById(id);
  const tipForme = tip ? createTip(tip) : null;

  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (error || !tipForme) {
    return (
      <View style={styles.container}>
        <ErrorMessage
          message={error || "Aucun conseil trouvé."}
          icon={<Ionicons name="alert-circle" size={24} color="#FF6B35" />}
          onClose={() => navigation.replace('Tab3')}
        />
      </View>
    );
  }

  return <TipDetails tip={tipForme} />;
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
