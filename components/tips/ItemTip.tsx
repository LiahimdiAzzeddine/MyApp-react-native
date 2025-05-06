import { Tip } from '@/types/tip';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';



interface ItemProps {
  tip: Tip;
  index: number;
  length: number;
  OpenTip: (tip: Tip) => void;
}

const Item = ({ tip, index, length, OpenTip }: ItemProps) => {
  const stripHtml = (html:any) => {
    return html.replace(/<[^>]*>?/gm, '');
  };
  if (!tip) {
    return null;
  }

  const imageSrc = tip.category.image_url ? { uri: 'https://'+tip.category.image_url } : require('@/assets/images/recipes/64.png');
  const { width } = useWindowDimensions();

  return (
    <View key={index} >
      <TouchableOpacity style={styles.itemContainer} onPress={() => OpenTip(tip)}>
        {/* Image du conseil */}
        <View style={styles.imageContainer}>
          <Image source={imageSrc} style={styles.image} />
        </View>

        {/* Détails du conseil */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} className="leading-archivo ArchivoExtraBold" >{tip.titre}</Text>
          <Text style={styles.details} className='leading-archivo Archivo'>
          {tip.details ? stripHtml(tip.details).substring(0, 50) + '...' : ''}
          </Text>
        </View>

        {/* Flèche */}
        <TouchableOpacity onPress={() => OpenTip(tip)}
          >
          <Image source={require('@/assets/images/tips/elementFleche.png')} style={styles.arrowIcon}  resizeMode="contain" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Séparateur */}
      {index < length - 1 && <View style={styles.separator} />}
    </View>
  );
};

const styles = StyleSheet.create({

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom:10,
    paddingHorizontal: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f3f3',
    resizeMode: 'cover',
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
    fontSize: 14,
    marginBottom: 4,
  },
  details: {
    color: '#4A90E2',
    fontSize: 13,
  },
  arrowIcon: {
    width: 40,
    height: 40,
    marginLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#FF9E2C',
    marginHorizontal: 10,
  },
});

export default Item;
