import { Tip } from '@/types/tip';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';



interface ItemProps {
  tip: Tip;
  index: number;
  length: number;
  OpenTip: (tip: Tip) => void;
}

const Item = ({ tip, index, length, OpenTip }: ItemProps) => {
  if (!tip) {
    return null;
  }

  const imageSrc = tip.category.image_url ? { uri: 'https://'+tip.category.image_url } : require('@/assets/images/recipes/64.png');

  return (
    <View key={index} style={styles.itemContainer}>
      <TouchableOpacity style={styles.itemContent} onPress={() => OpenTip(tip)}>
        {/* Image du conseil */}
        <View style={styles.imageContainer}>
          <Image source={imageSrc} style={styles.image} />
        </View>

        {/* Détails du conseil */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{tip.titre}</Text>
          {/**
          <Text style={styles.details}>
            {tip.details ? tip.details.substring(0, 50) + '...' : ''}
          </Text> */}
        </View>

        {/* Flèche */}
        <TouchableOpacity onPress={() => OpenTip(tip)}>
          <Image source={require('@/assets/images/tips/elementFleche.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Séparateur */}
      {index < length - 1 && <View style={styles.separator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
  },
  itemContent: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f3f3',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    color: '#FF9E2C',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    color: '#4A90E2',
  },
  arrowIcon: {
    width: 40,
    height: 40,
    marginLeft: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#FF9E2C',
    marginTop: 16,
  },
});

export default Item;
