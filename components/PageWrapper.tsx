import React from 'react';
import { View, StyleSheet, ViewStyle, SafeAreaView } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const PageWrapper = ({ children, style }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex:100,
    backgroundColor: '#fff', // Fond blanc pour SafeAreaView
  },
  content: {
    flex: 1,
    marginBottom: 0,
    borderRadius: 40, // Garde les coins arrondis
    marginHorizontal: 5,
    borderCurve:"continuous",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: '#f0f0f0',
  },
});


export default PageWrapper;
