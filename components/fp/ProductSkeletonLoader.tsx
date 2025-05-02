import React, { useEffect } from 'react';
import { View, Animated, StyleSheet, ScrollView } from 'react-native';

// Composant de base pour les éléments de skeleton
const SkeletonPart: React.FC<{
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: object;
}> = ({ width = '100%', height = 20, borderRadius = 4, style = {} }) => {
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
        { 
          backgroundColor: '#E1E9EE', 
          width, 
          height, 
          borderRadius,
          opacity
        },
        style,
      ]}
    />
  );
};

const ProductSkeletonLoader: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Transparancy Scale Skeleton */}
      <View style={styles.transparencyContainer}>
        <SkeletonPart height={30} style={styles.transparencyBar} />
        <View style={styles.transparencyLabels}>
          <SkeletonPart width={80} height={16} />
          <SkeletonPart width={80} height={16} />
        </View>
      </View>

      {/* Global Info Skeleton */}
      <View style={styles.globalInfoContainer}>
        <View style={styles.imageContainer}>
          <SkeletonPart width={120} height={120} borderRadius={10} />
        </View>
        <View style={styles.infoContainer}>
          <SkeletonPart width="90%" height={20} style={styles.nameText} />
          <SkeletonPart width="70%" height={16} style={styles.brandText} />
          <SkeletonPart width="40%" height={16} style={styles.scoreText} />
        </View>
      </View>

      {/* Encourager Section Skeleton */}
      <SkeletonPart width="100%" height={100} style={styles.encourager} />

      {/* Info Section Skeleton */}
      <View style={styles.infoSection}>
        <SkeletonPart width="60%" height={24} style={styles.sectionTitle} />
        <View style={styles.infoGrid}>
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.infoItem}>
              <SkeletonPart width={40} height={40} borderRadius={20} style={styles.infoIcon} />
              <SkeletonPart width="80%" height={16} />
            </View>
          ))}
        </View>
      </View>

      {/* Accordion Skeleton */}
      <View style={styles.accordionContainer}>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.accordionItem}>
            <SkeletonPart width="100%" height={60} style={styles.accordionHeader} />
            {index === 0 && (
              <View style={styles.accordionContent}>
                <SkeletonPart width="100%" height={20} style={styles.contentItem} />
                <SkeletonPart width="90%" height={20} style={styles.contentItem} />
                <SkeletonPart width="95%" height={20} style={styles.contentItem} />
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  transparencyContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  transparencyBar: {
    marginBottom: 8,
  },
  transparencyLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  globalInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  imageContainer: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    marginBottom: 10,
  },
  brandText: {
    marginBottom: 10,
  },
  scoreText: {
    marginBottom: 5,
  },
  encourager: {
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 8,
  },
  infoSection: {
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginBottom: 8,
  },
  accordionContainer: {
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  accordionItem: {
    marginBottom: 10,
  },
  accordionHeader: {
    borderRadius: 8,
    marginBottom: 5,
  },
  accordionContent: {
    paddingHorizontal: 15,
  },
  contentItem: {
    marginVertical: 5,
  },
});

export default ProductSkeletonLoader;