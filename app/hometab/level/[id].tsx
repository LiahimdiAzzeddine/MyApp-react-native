import {
  View,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

const levels = [
  {
    id: 1,
    title: "Ti’Curieux",
    message:
      "Déblocage des stories et posts pour les réseaux Insta, FB, LinkedIn",
    image: require("@/assets/images/storys/1.png"),
  },
  {
    id: 2,
    title: "Ti’Défricheur",
    message: "3 Ti’Conseils exclusifs tous les mois",
    image: require("@/assets/images/storys/2.png"),
  },
  {
    id: 3,
    title: "Ti’Conso engagé",
    message: "Calendrier F&L",
    image: require("@/assets/images/storys/4.png"),
  },
  {
    id: 4,
    title: "Ti’Décrypteur",
    message:
      "Pas encore de demandes de transparence, vous devez scanner et encourager les marques pour vous lancer dans l’aventure !​",
    image: require("@/assets/images/storys/8.png"),
  },
  {
    id: 5,
    title: "Ti’Veilleur",
    message:
      "Acteur engagé pour encourager les marques, recevez gratuitement notre guide de décryptage.\n\nGrâce à ce guide déjouez les pièges marketing sur les produits alimentaires.\n\nEn attendant que les marques dévoilent toutes les informations sur leurs produits dans TiCO, vous apprendrez à comprendre rapidement les étiquettes pour faire des choix rapides dans les rayons !​",
    image: require("@/assets/images/storys/1.png"),
  },
  {
    id: 6,
    title: "Ti’Héro de la transparence",
    message:
      "Pas encore de demandes de transparence, vous devez scanner et encourager les marques pour vous lancer dans l’aventure !​",
    image: require("@/assets/images/storys/2.png"),
  },
  {
    id: 7,
    title: "Tit’Légende TiCO",
    message:
      "Pas encore de demandes de transparence, vous devez scanner et encourager les marques pour vous lancer dans l’aventure !​",
    image: require("@/assets/images/storys/4.png"),
  },
  {
    id: 8,
    title: "Ti’Champion de la transparence",
    message:
      "Pas encore de demandes de transparence, vous devez scanner et encourager les marques pour vous lancer dans l’aventure !​",
    image: require("@/assets/images/storys/8.png"),
  },
];

export default function Profile() {
  const { id } = useLocalSearchParams();

  const getLevel = (requests: number | undefined) =>
    levels.find((level) => level.id === requests);



  const level = getLevel(Number(id));
  if (!level) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-4">
        <Text className="text-lg text-center text-gray-500">
          Aucun niveau trouvé pour ce nombre de requêtes.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white w-full">
      {/* En-tête avec image de fond */}
      <ImageBackground
        source={require('@/assets/images/profil/backgroundProfil.png')}
           resizeMode="contain"
        style={{
          minHeight: 140,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 25,
          marginTop: 1,
        }}
      >
        <Text className="text-center text-custom-green-text text-2xl ClashDisplayBold">
          {level.title}
        </Text>
      </ImageBackground>

      {/* Contenu du niveau */}
      <View className="flex-1 mt-4 justify-start px-4">
        <Text className="text-center text-custom-green-text text-base Archivo mb-6 leading-6">
          {level.message}
        </Text>

        <Image
          source={level.image}
          style={{ width: "100%", height: 200, borderRadius: 12 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
