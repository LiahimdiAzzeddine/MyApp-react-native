import {
  calculateTotalTime,
  generateImageUrl,
  convertRecetteToSteps,
  Step,
  groupSteps,
} from "@/types/recipe";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Share,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
const horloge = require("@/assets/images/recipes/horloge.png");
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import {
  addRFavorite,
  isRFavorite,
  removeRFavorite,
} from "@/utils/favoritesController";

// Replace with the correct API URL
const apiUrl = "https://tico.foodhea.com";

interface RecipeDetailsProps {
  recipe: any;
  custom: boolean;
}

const RecipeDetails = ({ recipe = {}, custom = false }: RecipeDetailsProps) => {
  let {
    id,
    title = "Recette sans titre",
    nbperson,
    difficulte,
    timecook,
    timerest,
    timebake,
    regimes = [],
    ingredients = [],
    recette,
  } = recipe;
  const steps: Step[] = convertRecetteToSteps(recette);
  const groupedSteps = groupSteps(steps, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: largeur } = Dimensions.get("window");
  const [favorite, setFavorite] = useState(false);
  const { refreshFRecipes } = useAppContext();

  const shareRecipe = async () => {
    try {
      const deepLink = `${apiUrl}/recipetab/recipe/${id}`;
      const content = {
            title: "TiCO App",
          message: `Découvre cette recette : ${title} - ${deepLink}`,
            subject: "Partager TiCO",
          };
          await Share.share(content);
    } catch (error) {
      console.error("Erreur lors du partage", error);
    }
  };
  const toggleFavorite = async () => {
    if (favorite) {
      await removeRFavorite(id);
      setFavorite(false);
    } else {
      await addRFavorite(recipe);
      setFavorite(true);
    }
    refreshFRecipes();
  };

  useEffect(() => {
    const checkFavorite = async () => {
      const fav = await isRFavorite(id);
      setFavorite(fav);
    };
    checkFavorite();
  }, [id]);
let imageDemo=recipe.image_name??require("@/assets/images/recipes/recettefondblanc.png");
  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      {/* Contenu principal */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "white",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
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
                {custom ? (
                  <Image
                    source={imageDemo}
                    defaultSource={require("@/assets/images/recipes/64.png")}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={{
                      uri: generateImageUrl(recipe.id, recipe.image_name) || "",
                    }}
                    defaultSource={require("@/assets/images/recipes/64.png")}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                )}
              </View>
            </ImageBackground>

            <View style={styles.infoRow}>
              <View style={styles.difficultyWrapper}>
                {!custom && (
                  <TouchableOpacity
                    onPress={toggleFavorite}
                    style={{
                      padding: 0,
                      flex: 1,
                    }}
                  >
                    <Image
                      source={
                        favorite
                          ? require("@/assets/images/recipes/34.png")
                          : require("@/assets/images/recipes/35.png")
                      }
                      style={{ width: 50, height: 50 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    flex: 1,
                    maxWidth: "50%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {difficulte && (
                    <Text style={styles.difficultyText}>{difficulte}</Text>
                  )}
                  {regimes &&
                    regimes.map(
                      (filter: string, index: React.Key | null | undefined) => (
                        <Text key={index} style={styles.difficultyText}>
                          {filter.trim()}
                        </Text>
                      )
                    )}
                </View>
                <View style={styles.timeWrapper}>
                <View style={styles.timeWrapper2}>
                  <Image
                    source={horloge}
                    style={styles.clockIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.totalTimeText} className="leading-archivo">
                    Temps total:{" "}
                    {calculateTotalTime(timecook, timerest, timebake)}
                  </Text>
                </View>
                {nbperson&&(
                  <Text style={styles.totalTimeText} className="leading-archivo">Pour {nbperson} personne{nbperson>1?"s":""}</Text>
                )}

                </View>
              </View>
            </View>
          </View>
          <View style={styles.recipeContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ingrédients</Text>
              <View style={styles.ingredientList}>
                {ingredients.length > 0 ? (
                  ingredients.map(
                    (
                      ingredient: {
                        qt: any;
                        unit: any;
                        name:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | null
                          | undefined;
                      },
                      index: React.Key | null | undefined
                    ) => (
                      <Text key={index} style={styles.ingredientText}>
                        {ingredient.qt ? `${ingredient.qt} ` : ""}
                        {ingredient.unit ? `${ingredient.unit} ` : ""}
                        {ingredient.name}
                      </Text>
                    )
                  )
                ) : (
                  <Text style={styles.noIngredientsText}>
                    Les ingrédients de cette recette, malheureusement, ne sont
                    pas disponibles. Revisitez cette page ultérieurement pour
                    l'avoir.
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recette</Text>
              {steps.length > 0 ? (
                <View style={{ flex: 1 }}>
                  <SwiperFlatList
                    data={groupedSteps}
                    onChangeIndex={({ index }) => setCurrentIndex(index)}
                    showPagination={false}
                    renderItem={({ item }) => (
                      <View
                        style={[styles.slideContainer, { width: largeur - 41 }]}
                      >
                        <View style={styles.bulletList}>
                          {item.map(
                            (step: {
                              id: React.Key | null | undefined;
                              description:
                                | string
                                | number
                                | boolean
                                | React.ReactElement<
                                    any,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | React.ReactPortal
                                | null
                                | undefined;
                            }) => (
                              <View key={step.id} style={styles.bulletItem}>
                                <Entypo
                                  name="dot-single"
                                  size={25}
                                  color="#c32721"
                                  style={{ padding: 0, margin: 0 }}
                                />

                                <Text style={styles.stepText}>
                                  {step.description}
                                </Text>
                              </View>
                            )
                          )}
                        </View>
                      </View>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    paginationStyle={styles.hidden}
                  />

                  <View style={styles.paginationContainer}>
                    {groupedSteps.map((_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.paginationDot,
                          currentIndex === i && styles.paginationDotActive,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              ) : (
                <Text style={styles.noStepsText}>
                  Les étapes de cette recette, malheureusement, ne sont pas
                  disponibles. Revisitez cette page ultérieurement pour l'avoir.
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      {!custom && (
        <View style={styles.buttonSection}>
          <TouchableOpacity
            className="bg-custom-red rounded-xl py-3 px-4 p-2 m-auto "
            onPress={shareRecipe}
          >
            <Text className="text-base text-white">Partager cette recette</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fad4ce",
  },
  scrollView: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  buttonSection: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fad4ce",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 240,
    minWidth: 200,
  },
  slideContainer: {
    paddingVertical: 10,
  },
  bulletList: {
    flexDirection: "column",
    maxWidth: "96%",
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },

  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "ArchivoLight",
    color: "#c32721",
    width:"100%"
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
    flex: 1,
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
    paddingBottom: 4,
    paddingTop: 15,
    flex: 1,
  },
  difficultyWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  difficultyText: {
    backgroundColor: "#c32721",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 1,
  },
  timeWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  timeWrapper2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  clockIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  totalTimeText: {
    fontSize: 13,
    color: "#c32721",
    fontFamily: "Archivo",
  },
  section: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#c32721",
    fontFamily: "ArchivoExtraBold",
  },
  ingredientList: {
    paddingTop: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: "#c32721",
    fontFamily: "ArchivoLight",
  },
  noIngredientsText: {
    fontSize: 16,
    color: "#ff0000",
    fontStyle: "italic",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 0, // Works only in newer RN, otherwise use margin
    marginTop: 8,
    marginBottom: 4,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fad4ce", // Red
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#d00000", // Darker red
  },
  hidden: {
    display: "none",
  },
  noStepsText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default RecipeDetails;
