import React from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const LoadingState: React.FC = () => {
  const loadingItems = Array.from({ length: 5 });

  return (
    <View style={styles.container}>
      {loadingItems.map((_, index) => (
        <View key={index} style={styles.item}>
          {/* Skeleton image */}
          <View style={styles.imagePlaceholder} />

          {/* Skeleton text blocks */}
          <View style={styles.textContainer}>
            <View style={styles.titlePlaceholder} />
            <View style={styles.subtitlePlaceholder} />
          </View>

          {/* Skeleton button */}
          <View style={styles.buttonPlaceholder} />
        </View>
      ))}
    </View>
  );
};

export default LoadingState;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E5E7EB', // Tailwind bg-gray-200
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#A0AEC0', // Tailwind border-gray-500
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titlePlaceholder: {
    height: 24,
    width: screenWidth * 0.6,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  subtitlePlaceholder: {
    height: 16,
    width: screenWidth * 0.4,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  buttonPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 12,
  },
});
