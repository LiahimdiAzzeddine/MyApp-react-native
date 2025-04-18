import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';

type Props = {
  title: string;
  color?: string;
};

const CustomHeader = ({ title, color = '#fff' }: Props) => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: color }]}>
      <StatusBar
        backgroundColor={color}
        barStyle="dark-content"
      />
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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