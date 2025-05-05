import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type EmptyStateProps = {
  title?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  textColor?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Aucun Recette pour le moment',
  iconName = 'search-circle',
  iconColor = '#f44336',
  textColor = '#f88379',
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={64} color={iconColor} />

      <Text style={[styles.title, { color: textColor }]}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {/* Message secondaire facultatif */}
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
    fontFamily: 'Archivo-Light',
    marginVertical: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7280',
    maxWidth: 300,
    textAlign: 'center',
  },
});
