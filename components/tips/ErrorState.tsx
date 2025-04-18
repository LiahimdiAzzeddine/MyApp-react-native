import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ErrorState = ({ message = "Une erreur est survenue. Veuillez réessayer." }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={64} color="#DC2626" style={styles.icon} />
      <Text style={styles.title}>Erreur</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  message: {
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default ErrorState;
