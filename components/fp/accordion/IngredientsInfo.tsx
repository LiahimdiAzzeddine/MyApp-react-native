import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Allergenes from "./Allergenes";
import Additifs from "./Additifs";

const FICHETOP = require("@/assets/images/fp/FICHETOP.png");

type SubIngredient = {
  label?: string;
  quantity?: string | number;
  details?: string;
  allergene?: string;
  children?: SubIngredient[];
};

type Ingredient = SubIngredient;

type Props = {
  ingredients?: Ingredient[];
  allergenesArray?: string[];
  additifsArray?: string[];
  onToggle:any
};

const IngredientsInfo: React.FC<Props> = ({
  ingredients = [],
  allergenesArray = [],
  additifsArray = [],
  onToggle
}) => {
  const formatSubIngredients = (
    subIngredients: SubIngredient[] = []
  ): React.ReactNode => {
    return subIngredients.map((sub, index) => {
      let subText = (
        <Text
          key={`sub-${index}`}
          style={sub.allergene ? styles.underline : undefined}
        >
          {sub.label || "Inconnu"}
        </Text>
      );

      if (sub.quantity) {
        subText = (
          <Text key={`sub-${index}`}>
            {subText} {sub.quantity}%
          </Text>
        );
      }

      if (sub.details) {
        subText = (
          <Text key={`sub-${index}`}>
            {subText}: {sub.details}
          </Text>
        );
      }

      if (sub.children && sub.children.length > 0) {
        subText = (
          <Text key={`sub-${index}`}>
            {subText} ({formatSubIngredients(sub.children)})
          </Text>
        );
      }

      const isLast = index === subIngredients.length - 1;

      return (
        <Text key={index}>
          {subText}
          {!isLast && ", "}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
      <View style={styles.innerContainer}>
        <Text
          className="text-xl text-custom-blue ArchivoBold "
          style={{ paddingVertical: 5 }}
        >
          <Text className="text-custom-blue ArchivoBold">Ingrédients</Text>
        </Text>
        <View style={styles.ingredientList}>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text
                  style={[
                    styles.ingredientTitle,
                    ingredient.allergene ? styles.underline : undefined,
                  ]}
                >
                  {ingredient.label || "Inconnu"}
                  {ingredient.quantity && ` ${ingredient.quantity}`}
                  {ingredient.children && ingredient.children.length > 0
                    ? ":"
                    : ""}
                </Text>
                {(ingredient.details || ingredient.children) && (
                  <Text style={styles.ingredientDetail}>
                    {ingredient.details || ""}
                    {ingredient.children && ingredient.children.length > 0 && (
                      <Text>{formatSubIngredients(ingredient.children)}</Text>
                    )}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noData}>
              Aucun ingrédient disponible ne revisite ce produit entièrement.
            </Text>
          )}
        </View>

        {allergenesArray.length > 0 && (
          <Allergenes allergenes={allergenesArray} />
        )}
        <Additifs additifs={additifsArray} />
      </View>

      <TouchableOpacity style={styles.imageWrapper} onPress={()=>onToggle()}>
        <Image source={FICHETOP} style={styles.image} />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientsInfo;

const styles = StyleSheet.create({
   container: {
    backgroundColor: "#E6F6EF",
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    position: "relative",
    width: "97%",
  },
  innerContainer: {
    paddingBottom:20
  },

  ingredientList: {
    marginTop: 5,
  },
  ingredientItem: {
    marginBottom: 5,
  },
  ingredientTitle: {
    fontFamily: "ArchivoBold",
    fontSize: 14,
    color: "#00425C",
  },
  underline: {
    textDecorationLine: "underline",
  },
  ingredientDetail: {
    fontSize: 14,
    color: "#00425C",
  },
  noData: {
    fontSize: 12,
    color: "#00425C",
    fontFamily: "ArchivoBold",
  },
imageWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 48,
    height: 48,
  },
  image: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});
