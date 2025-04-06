// components/CustomHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
};

const CustomHeader = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    margin:"auto"
  },
});

export default CustomHeader;
