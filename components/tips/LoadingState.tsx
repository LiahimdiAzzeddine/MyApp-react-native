import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const LoadingState = () => {
  const loadingItems = Array.from({ length: 5 });

  return (
    <View style={styles.container}>
      {loadingItems.map((_, index) => (
        <View key={index} style={styles.item}>
          {/* Placeholder Image */}
          <View style={styles.imagePlaceholder} />

          {/* Placeholder Texts */}
          <View style={styles.details}>
            <View style={styles.lineLarge} />
            <View style={styles.lineSmall} />
          </View>

          {/* Placeholder Arrow/Button */}
          <View style={styles.circle} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#9ca3af',
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  lineLarge: {
    height: 24,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    width: '75%',
    marginBottom: 8,
  },
  lineSmall: {
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    width: '50%',
  },
  circle: {
    width: 32,
    height: 32,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    marginLeft: 16,
  },
});

export default LoadingState;
