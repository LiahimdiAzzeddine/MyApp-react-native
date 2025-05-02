import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type EmptyLaterProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  iconColor?: string;
  iconSize?: number;
  textColor?: string;
  descriptionColor?: string;
};

const EmptyLater: React.FC<EmptyLaterProps> = ({
  icon = 'bookmark-outline',
  title,
  description,
  iconColor = '#c7f0d9', // custom green background
  iconSize = 64, // equivalent to h-16
  textColor = '#4E986D', // custom green text
  descriptionColor = '#0F548D', // custom blue
}) => {
  return (
    <View style={styles.container} >
      <Ionicons name={icon} size={iconSize} color={iconColor} style={styles.icon} />
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.description, { color: descriptionColor }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:25,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal:16,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'ArchivoBold',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontStyle: 'italic',
    fontFamily: 'ArchivoItalic',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyLater;
