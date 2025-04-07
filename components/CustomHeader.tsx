// components/CustomHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  color?: string;
};

const CustomHeader = ({ title, color = '#fff' }: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default CustomHeader;
