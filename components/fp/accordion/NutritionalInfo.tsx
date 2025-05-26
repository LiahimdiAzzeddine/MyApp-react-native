import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import NutritionTable from "./NutritionTable";
import Scores from "./Scores";
import { Product } from "@/types/product";

const FICHETOP = require("@/assets/images/fp/FICHETOP.png");

type Props = {
  product: Product;
  onToggle:any;
};

const NutritionalInfo: React.FC<Props> = ({ product,onToggle }) => {
  const portion = product?.portion || "Non spécifiée";
  const unit = product?.unit || "unités";
  const portioneq = product?.portioneq || "Non spécifiée";
  const nutriscore = product?.nutriscore;
  const linesSize = Object.keys(product?.lines || {}).length || 0;

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
        <View style={{ paddingBottom: 45 }}>
          <Text className="text-sm text-custom-blue font-normal Archivo">
            Portion indiquée :{" "}
            <Text className="ArchivoBold">
              {portion && portion !== "0" && unit && unit !== ""
                ? `${portion} ${unit} ${
                    portioneq && portioneq.trim() !== ""
                      ? "ou " + portioneq
                      : ""
                  }`
                : "Non disponible"}
            </Text>
          </Text>
          <Text
            className="text-xl text-custom-blue ArchivoBold "
            style={{ paddingVertical: 5 }}
          >
            <Text className="text-custom-blue ArchivoBold">
              Profil nutritionnel
            </Text>
          </Text>

          {linesSize > 0 ? (
            <NutritionTable product={product} portion={portion} />
          ) : (
            <Text className="text-center text-red-500 pt-3">
              Aucune donnée nutritionnelle disponible
            </Text>
          )}

          {nutriscore ? (
            <Scores nutriscore={nutriscore} />
          ) : (
            <Text className="text-center text-red-500">
              Nutriscore non disponible
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.imageWrapper} onPress={()=>onToggle()}>
          <Image source={FICHETOP} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NutritionalInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6F6EF",
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    position: "relative",
    width: "97%",
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
