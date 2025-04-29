import React from "react";
import { View, Text, Image, ScrollView, Button, StyleSheet, Share } from "react-native";
import  { SwiperFlatList } from 'react-native-swiper-flatlist'; 
const horloge = require('@/assets/images/recipes/horloge.png');
const recetteBg = require('@/assets/images/recipes/recetteBg.svg');
const badgeimage = require('@/assets/images/recipes/badge.svg');
const defaultImageRecette = require('@/assets/images/recipes/defaultImageRecette.png');

// Replace with the correct API URL
const apiUrl = "https://your-api-url.com";

// Function to group steps into batches of 3
const groupSteps = (steps: any[], groupSize: number) => {
  if (!Array.isArray(steps)) return [];
  const grouped: any[] = [];
  for (let i = 0; i < steps.length; i += groupSize) {
    grouped.push(steps.slice(i, i + groupSize));
  }
  return grouped;
};

interface RecipeDetailsProps {
  recipe: any;
  custom: boolean;
}

const RecipeDetails = ({ recipe = {}, custom = true }: RecipeDetailsProps) => {
  let {
    id,
    title = "Recette sans titre",
    timecook: preparation = "0 min",
    timebake: cuisson = "0 min",
    image = defaultImageRecette,
    difficulte,
    totalTime,
    regimes = [],
    ingredients = [],
    recette: steps = [],
  } = recipe;

  const shareRecipe = async () => {
    try {
      const deepLink = `${apiUrl}/tico/recipe/${id}`;
      await Share.share({
        message: `Découvre cette recette : ${title} - ${deepLink}`,
        title: `Partager la recette: ${title}`,
      });
    } catch (error) {
      console.error('Erreur lors du partage', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.recipeHeader}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image }} style={styles.recipeImage} />
          <Text style={styles.recipeTitle}>{title}</Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.difficultyWrapper}>
          {difficulte && (
            <Text style={styles.difficultyText}>{difficulte}</Text>
          )}
          {regimes &&
            regimes.map((filter, index) => (
              <Text key={index} style={styles.difficultyText}>{filter.trim()}</Text>
            ))}
        </View>
        <View style={styles.timeWrapper}>
          <Image source={horloge} style={styles.clockIcon} />
          <Text style={styles.totalTimeText}>Temps total: {totalTime}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingrédients</Text>
        <View style={styles.ingredientList}>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientText}>
                {ingredient.qt ? `${ingredient.qt} ` : ""}
                {ingredient.unit ? `${ingredient.unit} ` : ""}
                {ingredient.name}
              </Text>
            ))
          ) : (
            <Text style={styles.noIngredientsText}>
              Les ingrédients de cette recette, malheureusement, ne sont pas disponibles. Revisitez cette page ultérieurement pour l'avoir.
            </Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recette</Text>
        {steps.length > 0 ? (
          <SwiperFlatList
            data={groupSteps(steps, 3)}
            renderItem={({ item }) => (
              <View style={styles.stepGroup}>
                <View style={styles.stepList}>
                  {item.map((step, index) => (
                    <Text key={index} style={styles.stepText}>{step.description}</Text>
                  ))}
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showPagination
          />
        ) : (
          <Text style={styles.noStepsText}>
            Les étapes de cette recette, malheureusement, ne sont pas disponibles. Revisitez cette page ultérieurement pour l'avoir.
          </Text>
        )}
      </View>

      <View style={styles.shareButtonWrapper}>
        <Button title="Partager cette recette" onPress={shareRecipe} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  recipeHeader: {
    backgroundColor: '#ffcccc',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeImage: {
    width: '50%',
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  difficultyWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  difficultyText: {
    backgroundColor: '#ff0000',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 2,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  totalTimeText: {
    fontSize: 16,
    color: '#ff0000',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  ingredientList: {
    paddingTop: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#ff0000',
  },
  noIngredientsText: {
    fontSize: 16,
    color: '#ff0000',
    fontStyle: 'italic',
  },
  stepGroup: {
    paddingVertical: 10,
  },
  stepList: {
    paddingLeft: 20,
  },
  stepText: {
    fontSize: 16,
    color: '#ff0000',
  },
  noStepsText: {
    fontSize: 16,
    color: '#ff0000',
    fontStyle: 'italic',
  },
  shareButtonWrapper: {
    padding: 20,
    alignItems: 'center',
  },
});

export default RecipeDetails;
