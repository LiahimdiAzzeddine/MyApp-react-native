import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import NutritionTable from "./NutritionTable";
import Scores from "./Scores";
import { Product } from "@/types/product";

const FICHETOP =require('@/assets/images/fp/FICHETOP.png');

type Props = {
  product:Product
};

const NutritionalInfo: React.FC<Props> = ({
  product,
}) => {
  const portion = product?.portion || "Non spécifiée";
  const unit = product?.unit || "unités";
  const portioneq = product?.portioneq || "Non spécifiée";
  const nutriscore = product?.nutriscore;
  const linesSize = Object.keys(product?.lines || {}).length || 0;



  return (
    <View className="bg-custom-green-clear rounded-e-3xl relative pb-8 w-[calc(100%-16px)] min-h-[18rem]">
        <View className="px-2 py-6">
        <Text className="text-sm text-custom-blue font-normal">
          Portion indiquée :{" "}
          <Text className="font-bold">
            {portion && portion !== "0" && unit && unit !== ""
              ? `${portion} ${unit} ${
                  portioneq && portioneq.trim() !== "" ? "ou " + portioneq : ""
                }`
              : "Non disponible"}
          </Text>
        </Text>
        <Text className="text-xl text-custom-blue font-bold pt-3 px-2">
          <Text className="marker-effect-cyan">Profil nutritionnel</Text>
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
        
        <TouchableOpacity style={styles.imageWrapper}>
        <Image source={FICHETOP} style={styles.image} />
      </TouchableOpacity>
        </View>
    </View>
  );
};

export default NutritionalInfo;

const styles = StyleSheet.create({

  imageWrapper: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 48,
    height: 48,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
});

