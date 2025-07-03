import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { Link, Route, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/context/AuthContext";
import useCreateUserLevel from "@/hooks/demand/useCreateUserLevel";
import CustomButton from "@/components/ui/CustomButton";
import useGetTotalRequests from "@/hooks/demand/useGetTotalRequests";

const levels = [
  {
    id: 1,
    title: "Ti’Curieux",
    soubTitle: "À partir de 30 demandes",
    message: "Débloquez des stories TiCO à partager sur vos réseaux ",
    image: require("@/assets/images/storys/16.png"),
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
    goal: 30,
  },
  {
    id: 2,
    title: "Ti’Défricheur",
    soubTitle: "À partir de 80 demandes",
    message: "Débloquez 3 Ti’Conseils exclusifs par mois.",
    image: require("@/assets/images/storys/17.png"),
    route: "/tips",
    btnText: "Débloquer les Ti’Conseils​​",
    goal: 80,
  },
  {
    id: 3,
    title: "Ti’Conso engagé",
    soubTitle: "À partir de 150 demandes",
    message:
      "Recevez gratuitement votre calendrier perpétuel de fruits et légumes TiCO avec des recettes gourmandes et des astuces à essayer au quotidien.",
    image: require("@/assets/images/storys/18.png"),
    btnText: "Recevoir mon calendrier​",
    goal: 120,
  },
  {
    id: 4,
    title: "Ti’Décrypteur",
    soubTitle: "À partir de 250 demandes",
    message:
      "« La vérité si J’mange », le guide de décryptage TiCO pour apprendre facilement à déjouer les pièges sur les produits alimentaires.​",
    image: require("@/assets/images/storys/19.png"),
    btnText: "Recevoir le code​​",
    goal: 250,
  },
  {
    id: 5,
    title: "Ti’Veilleur",
    soubTitle: "À partir de 400 demandes",
    Text: "Pendant 1h30, cette consultation individuelle permet de faire le point sur vos habitudes actuelles pour enclencher des changements vers une alimentation saine et durable. Marion Honoré prend en compte vos envies, vos contraintes et votre contexte de santé pour vous proposer des conseils concrets et personnalisés tant sur le contenu de votre assiette que sur la répartition des repas sur la journée. Elle abordera également le reste de votre mode de vie, et vous proposera éventuellement un protocole de compléments alimentaires adapté à vos besoins.",
    image1: require("@/assets/images/storys/30.png"),
    image2: require("@/assets/images/storys/20.png"),
    btnText: "Débloquer les stories​",
    goal: 2000000000,
  },
  {
    id: 6,
    title: "Ti'Héros de la transparence",
    soubTitle: "À partir de 600 demandes",
    message:
      "Débloquer gratuitement le jeu Info ou Pipeau pour pimenter vos apéros tout en apprenant de manière ludique à déjouer les pièges sur l’alimentation.\n Prenez-vous au jeu, mettez vous dans la peau d’un influenceur, d’un lobbyiste ou d’un consommateur pour trouver la vérité sur les produits alimentaires !​",
    image: require("@/assets/images/storys/22.png"),
    btnText: "Débloquer les stories​",
    goal: 2000000000,
  },
  {
    id: 7,
    title: "Tit’Légende TiCO",
    soubTitle: "À partir de 800 demandes",
    Text: "Il est temps de faire le point sur les changements que vous avez opérés dans votre alimentation et votre mode de vie. Cette séance de 45min permet d'ajuster les recommandations en fonction de votre ressenti : identifier ce qui est facile à mettre en place et ce qui l'est moins, ajuster la stratégie avec des applications différentes des recommandations, approfondir les causes de vos éventuels désagréments (digestion, hormones, immunité, régulation de la glycémie...).",
    image1: require("@/assets/images/storys/30.png"),
    image2: require("@/assets/images/storys/21.png"),
    btnText: "Débloquer les stories​",
    goal: 2000000000,
  },
  {
    id: 8,
    title: "Ti’Champion de la transparence",
    soubTitle: "À partir de 1000 demandes",
    message:
      "Commandez gratuitement votre box surprise avec des produits sains et responsables à découvrir !​",
    image: require("@/assets/images/storys/25.png"),
    btnText: "Débloquer les stories​",
    goal: 2000000000,
  },
];

export default function Profile() {
  const { id } = useLocalSearchParams();
  const { userInfo } = useContext(AuthContext);
  const router = useRouter();
  const { colors } = useTheme();
  const { totalRequests, fetchTotalRequests } = useGetTotalRequests();
  useEffect(() => {
    fetchTotalRequests();
  }, [totalRequests]);
  const userId: number | undefined = userInfo?.id;
  const getLevel = (requests: number | undefined) =>
    levels.find((level) => level.id === requests);

  const level = getLevel(Number(id));
  const hasLevel = userInfo?.levels?.some((lv) => lv.id === Number(id) + 1);

  const unlockBtn =
    !hasLevel && Number(totalRequests) >= Number(level ? level.goal : 0);

  const {
    createUserLevel,
    createdUserLevel,
    loading: createLoading,
    error: createError,
  } = useCreateUserLevel();

  const handleAssignLevel = (): void => {
    if (!level || !userId) return;

    Alert.alert(
      "Confirmation",
      `Souhaitez-vous activer le niveau "${level.title}" ?`,
      [
        {
          text: "Non",
          style: "cancel",
          onPress: () => console.log("Activation annulée"),
        },
        {
          text: "Oui",
          style: "default",
          onPress: async () => {
            const result = await createUserLevel({
              user_id: userId,
              level_id: Number(id) + 1,
            });

            if (result) {
              if (level.route) {
                router.replace(level.route as Route);
              }
            }
          },
        },
      ]
    );
  };

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
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["bottom", "left", "right"]}
    >
      {/* En-tête avec image de fond */}
      <ImageBackground
        source={require("@/assets/images/profil/backgroundProfil.png")}
        resizeMode="contain"
        style={{
          minHeight: 140,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 25,
          marginTop: 1,
        }}
      >
        <Text className="text-center text-custom-green-text text-2xl ClashDisplayBold p-4">
          {level.title}
        </Text>
      </ImageBackground>

      {/* Contenu du niveau */}

      <View className="flex-1  justify-start" style={{ paddingHorizontal: 16 }}>
        {level?.soubTitle && (
          <Text className="text-center text-custom-green-text text-2xl ArchivoBold mb-4 leading-archivo">
            {level.soubTitle}
          </Text>
        )}

        {level.message && (
          <Text className="text-center text-custom-green-text text-lg Archivo  leading-archivo">
            {level.message}
          </Text>
        )}

        {level.image && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={level.image}
              style={{ width: 350, height: 335 }}
              resizeMode="contain"
            />
          </View>
        )}
        {level.image1 && level.image2 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingBottom: 5,
            }}
          >
            <Image
              source={level.image1}
              style={{ width: "50%", height: 120 }}
              resizeMode="contain"
            />
            <Image
              source={level.image2}
              style={{ width: "50%", height: 120 }}
              resizeMode="contain"
            />
          </View>
        )}

        {level.Text && (
          <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              className="text-start text-custom-green-text text-lg Archivo  leading-archivo"
              style={{ flex: 2, alignItems: "center", padding: 16 }}
            >
              {level.Text}
            </Text>
          </ScrollView>
          <Link href={'https://jalimente.fr/'} className="text-lg text-center archivoBold underline text-custom-green-text py-4">En savoir plus</Link>
          </>
        )}
        {unlockBtn && (
          <View className="py-2">
            <CustomButton
              title={level.btnText}
              disabled={createLoading}
              style={{
                maxWidth: 280,
                minWidth: 200,
                marginHorizontal: "auto",
                backgroundColor: (colors as any)["custom-green-text"],
              }}
              onPress={() => {
                handleAssignLevel();
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
