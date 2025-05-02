// SkeletonLoader.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: object;
}

const SkeletonItem: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  style = {} 
}) => {
  const opacity = new Animated.Value(0.3);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, opacity },
        style,
      ]}
    />
  );
};

const SkeletonLoader = () => {
  // Créer un tableau de 5 éléments pour simuler une liste
  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, index) => (
        <View key={index} style={styles.rowFront}>
          {/* Image placeholder */}
          <View style={styles.imageContainer}>
            <SkeletonItem width={64} height={64} borderRadius={8} />
          </View>
          
          {/* Text placeholders */}
          <View style={styles.detailsContainer}>
            <SkeletonItem width="80%" height={16} style={styles.titleSkeleton} />
            <SkeletonItem width="60%" height={12} style={styles.subtitleSkeleton} />
          </View>
          
          {/* Arrow icon placeholder */}
          <SkeletonItem width={40} height={40} borderRadius={20} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  skeleton: {
    backgroundColor: '#E1E9EE',
  },
  rowFront: {
    backgroundColor: '#fff',
    borderBottomColor: '#c7f0d8',
    borderBottomWidth: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 5,
    height: 78, // Approximativement la même hauteur que vos items réels
  },
  imageContainer: {
    width: 64,
    height: 64,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleSkeleton: {
    marginBottom: 8,
  },
  subtitleSkeleton: {
    marginTop: 4,
  },
});

export default SkeletonLoader;