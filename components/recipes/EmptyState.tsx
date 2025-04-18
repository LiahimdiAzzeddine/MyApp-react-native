import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ou 'react-native-vector-icons/Ionicons'

const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-circle" size={64} color="#f44336" />

      <Text style={styles.title}>
        Aucun Recette pour le moment
      </Text>

      <Text style={styles.subtitle}>
        {/* Tu peux ajouter un message ici si besoin */}
      </Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f88379', // text-custom-red-clear
    fontFamily: 'Archivo-Light', // si tu utilises cette police
    marginVertical: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7280', // Tailwind text-gray-500
    maxWidth: 300,
    textAlign: 'center',
  },
});
