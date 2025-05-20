import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export const EmptyStateFaq = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="help-circle-outline" size={64} color="#3b82f6" />
      <Text style={styles.title}>Aucune question disponible</Text>
      <Text style={styles.subtitle}>
        Il n'y a pas encore de questions à afficher. Revenez plus tard.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151', // Equivalent to Tailwind's text-gray-700
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280', // Equivalent to Tailwind's text-gray-500
    maxWidth: 300,
    textAlign: 'center',
  },
});
