import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ou 'react-native-vector-icons/Ionicons'

interface ErrorStateProps {
  message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Une erreur est survenue. Veuillez réessayer.",
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={64} color="#f44336" />

      <Text style={styles.title}>Erreur</Text>

      <Text style={styles.subtitle}>{message}</Text>
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151', // text-gray-700
    marginVertical: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280', // text-gray-500
    textAlign: 'center',
    maxWidth: 300,
  },
});
