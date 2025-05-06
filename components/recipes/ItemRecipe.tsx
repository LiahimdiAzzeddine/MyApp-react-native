import { calculateTotalTime, generateImageUrl, Recipe } from "@/types/recipe";
import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "../history/style";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  recipe: Recipe;
  index: number;
  length: number;
  onPress: (recipe: Recipe) => void;
};

const Item: React.FC<Props> = ({ recipe, index, length, onPress }) => {
  if (!recipe) return null;

  return (
    <View key={index}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onPress(recipe)}
      >
        {/* Image produit avec fond */}
        <View style={stylestest.imageBg}>
          <Image
            source={{
              uri: generateImageUrl(recipe.id, recipe.image_name) || "",
            }}
            defaultSource={require("@/assets/images/recipes/64.png")}
            style={stylestest.image}
          />
        </View>

        {/* Détails */}
        <View style={stylestest.details}>
          <Text
            style={stylestest.title}
            className="leading-archivo ArchivoExtraBold"
          >
            {recipe.title}
          </Text>
          <Text style={stylestest.subtitle}>
            {(recipe.timecook || recipe.timerest || recipe.timebake) &&
              `Temps total : ${calculateTotalTime(
                recipe.timecook,
                recipe.timerest,
                recipe.timebake
              )}`}
          </Text>
        </View>

        {/* Bouton flèche */}
        <TouchableOpacity onPress={() => console.log()}>
          <Image
            source={require("@/assets/images/recipes/recipeFleche.png")}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Séparateur */}
      {index < length - 1 && <View style={stylestest.separator} />}
    </View>
  );
};

export default Item;

const stylestest = StyleSheet.create({
  imageBg: {
    width: 80,
    height: 80,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    color: "#c32721",
    fontSize: 15,
  },
  subtitle: {
    color: "#D72638",
    fontSize: 14,
    marginTop: 4,
  },

  separator: {
    height: 1,
    backgroundColor: "#fceae8",
    marginHorizontal: 10,
  },
});
