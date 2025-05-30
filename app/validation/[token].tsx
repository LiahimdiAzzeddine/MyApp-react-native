import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axiosInstance from '@/api/axios';
import { Ionicons } from '@expo/vector-icons';

const ValidationEmail = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const validateEmail = async () => {
      try {
        const response = await axiosInstance.get(`/api/validate-email/${token}`);
        setSuccessMessage(response.data.message);
        setLoading(false);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Erreur de validation.';
        setError(errorMessage);
        setLoading(false);
      }
    };

    if (token) {
      validateEmail();
    }
  }, [token]);

  const goToLogin = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#00bfff" />
      )}

      {!loading && error && (
        <View style={[styles.messageBox, styles.error]}>
          <Ionicons name="alert-circle" size={48} color="#fff" />
          <Text style={styles.text}>{error}</Text>
        </View>
      )}

      {!loading && successMessage && (
        <View style={[styles.messageBox, styles.success]}>
          <Ionicons name="checkmark-circle" size={48} color="#fff" />
          <Text style={styles.text}>{successMessage}</Text>

          <Pressable onPress={goToLogin} style={styles.button}>
            <Text style={styles.buttonText}>Aller à la connexion</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ValidationEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  messageBox: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20
  },
  success: {
    backgroundColor: '#22c55e'
  },
  error: {
    backgroundColor: '#ef4444'
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1e40af',
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
