import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import axiosInstance from '@/api/axios';
// Correction des imports d'icônes
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react-native';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { StatusMessage } from '@/components/ui/StatusMessage';

const { width } = Dimensions.get('window');

const ValidationEmail = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fadeValue = useSharedValue(0);
  const scaleValue = useSharedValue(0.8);
  const translateY = useSharedValue(50);

  useEffect(() => {
    fadeValue.value = withTiming(1, { duration: 800 });
    scaleValue.value = withSpring(1, { damping: 15, stiffness: 150 });
    translateY.value = withSpring(0, { damping: 20, stiffness: 100 });

    const validateEmail = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = await axiosInstance.get(`/api/validate-email/${token}`);
        setSuccessMessage(response.data.message || 'Votre adresse email a été validée avec succès !');
      } catch (err: any) {
        const errorMessage = err.response?.data?.message ||
          'Une erreur est survenue lors de la validation de votre email. Veuillez réessayer.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      validateEmail();
    } else {
      setError('Token de validation manquant.');
      setLoading(false);
    }
  }, [token]);

  const goToLogin = () => {
    router.replace('/login');
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeValue.value,
    transform: [
      { scale: scaleValue.value },
      { translateY: translateY.value }
    ]
  }));

  return (
    <View style={[styles.container, { backgroundColor: '#ffeda3' }]}>
      <Animated.View style={[styles.content, animatedStyle]}>
        {loading && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
            <Text style={styles.loadingText}>
              Validation de votre adresse email en cours...
            </Text>
            <Text style={styles.loadingSubtext}>
              Veuillez patienter quelques instants
            </Text>
          </View>
        )}

        {!loading && error && (
          <StatusMessage
            type="error"
            title="Échec de la validation"
            message={error}
            icon={<XCircle size={64} color="#ffffff" strokeWidth={2} />}
            onRetry={() => router.replace('/(tabs)')}
            retryText="Accueil"
          />
        )}

        {!loading && successMessage && (
          <StatusMessage
            type="success"
            title="Email validé avec succès !"
            message={successMessage}
            icon={<CheckCircle size={64} color="#ffffff" strokeWidth={2} />}
            onAction={goToLogin}
            actionText="Se connecter"
            actionIcon={<ArrowRight size={20} color="#ffffff" />}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default ValidationEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width:"100%",
    maxWidth: 400,
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width:"100%",
    height:"100%",
    justifyContent:'center',
    paddingHorizontal:16
    
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
});