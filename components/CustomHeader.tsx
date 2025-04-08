import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

type Props = {
  title: string;
  color?: string;
};

const CustomHeader = ({ title, color = '#fff' }: Props) => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: color }]}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
  },
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
