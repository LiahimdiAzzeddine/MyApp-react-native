import { calculateTotalTime, generateImageUrl } from "@/types/recipe";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  Share,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
const horloge = require("@/assets/images/recipes/horloge.png");

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
    difficulte,
    timecook,
    timerest,
    timebake,
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
      console.error("Erreur lors du partage", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.recipeHeader}>
        <ImageBackground
          source={require("@/assets/images/recipes/recipeBg.png")}
          resizeMode="contain"
          style={styles.imageContainer}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: generateImageUrl(recipe.id, recipe.image_name) || "",
              }}
              defaultSource={require("@/assets/images/recipes/64.png")}
              style={styles.categoryImage}
              resizeMode="cover"
            />
          </View>
        </ImageBackground>

        <View style={styles.infoRow}>
          <View style={styles.difficultyWrapper}>
            {difficulte && (
              <Text style={styles.difficultyText}>{difficulte}</Text>
            )}
            <View style={styles.timeWrapper}>
              <Image
                source={horloge}
                style={styles.clockIcon}
                resizeMode="contain"
              />
              <Text style={styles.totalTimeText}>
                Temps total: {calculateTotalTime(timecook, timerest, timebake)}
              </Text>
            </View>

            {/*
            {regimes &&
              regimes.map((filter, index) => (
                <Text key={index} style={styles.difficultyText}>
                  {filter.trim()}
                </Text>
              ))}*/}
          </View>
        </View>
      </View>
      <View style={styles.containerContent}>
        <ScrollView style={styles.recipeContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingrédients</Text>
            <View style={styles.ingredientList}>
              {ingredients.length > 0 ? (
                ingredients.map((ingredient: { qt: any; unit: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                  <Text key={index} style={styles.ingredientText}>
                    {ingredient.qt ? `${ingredient.qt} ` : ""}
                    {ingredient.unit ? `${ingredient.unit} ` : ""}
                    {ingredient.name}
                  </Text>
                ))
              ) : (
                <Text style={styles.noIngredientsText}>
                  Les ingrédients de cette recette, malheureusement, ne sont pas
                  disponibles. Revisitez cette page ultérieurement pour l'avoir.
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
                        <Text key={index} style={styles.stepText}>
                          {step.description}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                showPagination
              />
            ) : (
              <Text style={styles.noStepsText}>
                Les étapes de cette recette, malheureusement, ne sont pas
                disponibles. Revisitez cette page ultérieurement pour l'avoir.
              </Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            className="bg-custom-red rounded-xl py-3 px-4 p-2 m-auto "
            onPress={shareRecipe}
          >
            <Text className="text-base text-white">Proposer une recette</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerContent: {
    flex: 1,
    backgroundColor: "#fad4ce",
  },
  buttonSection: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: "#fad4ce",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 240,
  },
  title: {
    textAlign: "center",
    color: "#c32721",
    fontSize: 22,
    fontFamily: "ClashDisplayBold",
  },

  titleWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 15,
  },

  categoryImage: {
    width: 135,
    height: 135,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#c32721",
  },

  recipeHeader: {
    backgroundColor: "#fad4ce",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  recipeContent: {
    flex: 1,
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  difficultyWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  difficultyText: {
    backgroundColor: "#ff0000",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 2,
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  clockIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  totalTimeText: {
    fontSize: 16,
    color: "#ff0000",
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff0000",
  },
  ingredientList: {
    paddingTop: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: "#ff0000",
  },
  noIngredientsText: {
    fontSize: 16,
    color: "#ff0000",
    fontStyle: "italic",
  },
  stepGroup: {
    paddingVertical: 10,
  },
  stepList: {
    paddingLeft: 20,
  },
  stepText: {
    fontSize: 16,
    color: "#ff0000",
  },
  noStepsText: {
    fontSize: 16,
    color: "#ff0000",
    fontStyle: "italic",
  },
});

export default RecipeDetails;
