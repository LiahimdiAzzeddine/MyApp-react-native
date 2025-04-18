import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

type Recipe = {
  title: string;
  image?: string;
  difficulte?: string;
  timecook?: string;
  timerest?: string;
  timebake?: string;
  totalTime?: string;
};

type Props = {
  recipe: Recipe;
  index: number;
  length: number;
  OpenFb: (recipe: Recipe) => void;
};

const Item: React.FC<Props> = ({ recipe, index, length, OpenFb }) => {
  if (!recipe) return null;

  return (
    <View key={index}>
      <TouchableOpacity style={styles.container} onPress={() => OpenFb(recipe)}>
        {/* Image produit avec fond */}
        <ImageBackground
          source={require('@/assets/images/recipes/productBg.png')}
          style={styles.imageBg}
          imageStyle={styles.imageBgStyle}
        >
          <Image
            source={{ uri: recipe.image || '' }}
            defaultSource={require('@/assets/images/recipes/64.png')}
            style={styles.image}
            onError={() => {
              // handle image fallback manually if needed
            }}
          />
        </ImageBackground>

        {/* Détails */}
        <View style={styles.details}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.subtitle}>
            {recipe.difficulte && `${recipe.difficulte} | `}
            {(recipe.timecook || recipe.timerest || recipe.timebake) &&
              `Temps total : ${recipe.totalTime}`}
          </Text>
        </View>

        {/* Bouton flèche */}
        <Image source={require('@/assets/images/recipes/recipeFlecheold.png')} style={styles.arrow} />
      </TouchableOpacity>

      {/* Séparateur */}
      {index < length - 1 && <View style={styles.separator} />}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  imageBg: {
    width: 80,
    height: 80,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBgStyle: {
    resizeMode: 'contain',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    color: '#D72638',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#D72638',
    fontSize: 14,
    marginTop: 4,
  },
  arrow: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    backgroundColor: '#fceae8',
    width: '100%',
  },
});
