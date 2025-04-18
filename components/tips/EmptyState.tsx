import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-circle" size={64} color="#FF9E2C" style={styles.icon} />
      <Text style={styles.title}>Aucun conseil pour le moment</Text>
      <Text style={styles.message}></Text>
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
    color: '#FF9E2C',
    marginBottom: 8,
  },
  message: {
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default EmptyState;
