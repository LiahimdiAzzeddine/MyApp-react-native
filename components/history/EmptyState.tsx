import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-circle"
        size={64} // équivalent à w-16 h-16
        color="#c7f0d9" // text-custom-green-background
        style={styles.icon}
      />

      <Text style={styles.title}>Aucun scan pour le moment</Text>

      <Text style={styles.description}>
        Aucun produit scanné{'\n'}
        Commencer à scanner des produits
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
    textAlign: 'center',
    marginTop:25
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'ArchivoBold',
    color: '#4E986D', // text-custom-green-text
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontStyle: 'italic',
    fontFamily: 'ArchivoItalic',
    color: '#4E986D', // text-custom-green-text
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
});
