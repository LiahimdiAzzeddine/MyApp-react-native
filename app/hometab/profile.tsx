import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Share,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import useGetTotalRequests from "@/hooks/demand/useGetTotalRequests";
import CustomButton from "@/components/ui/CustomButton";
import { useTheme } from "@react-navigation/native";
import { Route, useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import useCreateUserLevel from "@/hooks/demand/useCreateUserLevel";
import { Level } from "@/types/Level";
import { SafeAreaView } from "react-native-safe-area-context";
const illustrationOrigines = require("@/assets/images/profil/29.png");

const customInfo = [
  {
    id: 2,
    title: "Ti’Curieux",
    reward:
      "Débloquez les stories TiCO stylées et engagées pour faire bouger les marques.​",
    rewardNext: "3 Ti’Conseils exclusifs par mois pour briller à l’apéro !​​",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 3,
    title: "Ti’Défricheur",
    reward:
      "Débloquez vos 3 Ti'Conseils exclusifs mensuels si vous avez appris quelque chose d’intéressant dites-le !​",
    rewardNext:
      "votre calendrier perpétuel de fruits et légumes de saison. Ponctué d’astuces, de rappels et de recettes c’est un bel outil à garder à l’œil dans la cuisine.​",
    route: "/tips",
    btnText: "Débloquer les Ti’Conseils​​",
  },
  {
    id: 4,
    title: "Ti’Conso engagé",
    reward:
      "Recevez votre calendrier perpétuel de fruits et légumes de saison avec en bonus des astuces et recettes saines et gourmandes idéales à garder à l’œ",
    rewardNext:
      "votre guide de décryptage pour déjouer les piègessur les produits alimentaires​",
    btnText: "Recevoir mon calendrier​",
  },
  {
    id: 5,
    title: "Ti’Décrypteur",
    reward:
      "Recevez votre code de réduction pour votre première séance personnalisée avec Marion Honoré, coach en alimentation santé durable.​",
    rewardNext:
      "votre Guide de décryptage pour déjouer les pièges sur les produits alimentaires.​​​",
    btnText: "Recevoir le code​​",
  },
  {
    id: 6,
    title: "Ti’Veilleur",
    reward: "Jeu Info ou Pipeau",
    rewardNext: "recevoir 3 Ti’Conseils exclusifs pour briller à l’apéro !​​pp",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 7,
    title: "Ti’Héro de la transparence",
    reward:
      "10% de réduction sur votre première séance personnalisée avec Marion Honoré, coach en alimentation santé durable (ou la première séance au prix de la séance de suivi)",
    rewardNext: "recevoir 3 Ti’Conseils exclusifs pour briller à l’apéro !​​",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 8,
    title: "Tit’Légende TiCO",
    reward:
      "1 séance de suivi alimentation santé durable avec Marion Honoré, offerte.",
    rewardNext: "recevoir 3 Ti’Conseils exclusifs pour briller à l’apéro !​​",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 9,
    title: "Ti’Champion de la transparence",
    reward:
      "Box surprise avec des produits sélectionnés pour leurs engagements dans la transparence",
    rewardNext: "recevoir 3 Ti’Conseils exclusifs pour briller à l’apéro !​​",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
];

export default function Profile(): JSX.Element {
  const { colors } = useTheme();
  const router = useRouter();
  const { userInfo } = useContext(AuthContext);
  const userId: number | undefined = userInfo?.id;
  const apiUrl = "https://tico.foodhea.com";
  const [nextEligibleLevel, setNextEligibleLevel] = useState<Level | null>(
    null
  );
  const [CurrentEligibleLevel, setCurrentEligibleLevel] =
    useState<Level | null>(null);
  const [CurrentEligibleLevelIsActive, setCurrentEligibleLevelIsActive] =
    useState<boolean>(false);
  const {
    loading,
    totalRequests,
    error,
    fetchTotalRequests,
    currentLevel,
    levels,
  } = useGetTotalRequests();

  const {
    createUserLevel,
    loading: createLoading,
    error: createError,
  } = useCreateUserLevel();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `J’ai découvert une appli pour obliger les marques à dire toute la vérité sur les produits alimentaires !\n\nJ’ai déjà fait ${totalRequests} demandes, c’est hyper simple, il suffit de scanner les codes-barres et d’un clic tu peux demander aux marques de dévoiler toutes les infos sur leurs produits. Plus on demande plus elles sont obligées de répondre ! À toi de jouer ;) ${apiUrl}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log("Shared with activity type:", result.activityType);
        } else {
          // Shared
          console.log("Content shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log("Share dialog dismissed");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };
  useEffect(() => {
    fetchTotalRequests();
  }, []);

  useEffect(() => {
    if (!levels || totalRequests === null) return;

    let nextLevel: Level | undefined | null = null;
    let currentLevelgeted: Level | undefined | null = null;
    nextLevel =
      levels
        .filter((lvl) => lvl.goal > totalRequests)
        .sort((a, b) => a.goal - b.goal)[0] || null;

    currentLevelgeted =
      levels.find((lvl, index) => {
        const nextLevel = levels[index + 1];
        return (
          lvl.goal <= totalRequests &&
          (!nextLevel || nextLevel.goal > totalRequests)
        );
      }) || null;

    if (!currentLevel) {
      if (!currentLevelgeted) {
        setCurrentEligibleLevel(currentLevelgeted);
        setNextEligibleLevel(nextLevel);
        setCurrentEligibleLevelIsActive(false);
      } else {
        setCurrentEligibleLevel(currentLevelgeted);
        setNextEligibleLevel(nextLevel);
        //const LevelIndex =levels.findIndex(lvl => lvl === currentLevelgeted);
        setCurrentEligibleLevelIsActive(false);
      }
      console.log("🚀 ~ useEffect ~ nextLevel:", nextLevel);
    } else {
      console.log("🚀 ~ useEffect ~ currentLevel:", currentLevel);

      setCurrentEligibleLevel(currentLevelgeted);
      setNextEligibleLevel(nextLevel);
      setCurrentEligibleLevelIsActive(currentLevel.id == currentLevelgeted?.id);
    }
  }, [levels, totalRequests, currentLevel]);

  const handleAssignLevel = (): void => {
    if (!CurrentEligibleLevel || !userId) return;

    Alert.alert(
      "Confirmation",
      `Souhaitez-vous activer le niveau "${CurrentEligibleLevel.title}" ?`,
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
              level_id: CurrentEligibleLevel.id,
            });

            if (result) {
              fetchTotalRequests();
              if (customInfo[CurrentEligibleLevel.id - 2].route) {
                router.replace(
                  customInfo[CurrentEligibleLevel.id - 2].route as Route
                );
              }
            }
          },
        },
      ]
    );
  };

  const handleAssignLevel2 = async (): Promise<void> => {
    if (!CurrentEligibleLevel || !userId) return;

    const result = await createUserLevel({
      user_id: userId,
      level_id: levels[1].id,
    });

    //router.push(customInfo[1].route as Route);
    if (result) {
      fetchTotalRequests();
    }
  };

  const getRemainingRequests = (goal: number): number => {
    return goal - (totalRequests ?? 0);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white w-full"
      edges={["bottom", "left", "right"]}
    >
      <ImageBackground
        source={require("@/assets/images/profil/backgroundProfil.png")}
        resizeMode="contain"
        style={{
          minHeight: 135,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          marginTop: 15,
        }}
      >
        <Text className="text-center text-custom-green-text text-3xl ClashDisplayBold">
          Profil
        </Text>
      </ImageBackground>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      ) : error ? (
        <Text
          style={{
            color: "red",
            padding: 16,
            fontFamily: "ArchivoBold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            {Number(totalRequests) > 399 ? (
              <View className="flex-1 " style={{ padding: 16 }}>
                <Text className="text-base Archivo leading-archivo text-center text-custom-blue flex-1">
                  Malheureusement, pour le moment, nous ne traitons que les premiere quatre 
                  niveaux et 
                  Votre score actuel de{" "}
                  <Text className="font-bold">{totalRequests}</Text> est
                  supérieur à ces quatre niveaux. Ainsi, vous pouvez débloquer le
                  niveau le plus élevé possible :
                  <Text className="ArchivoBold text-custom-green-text">
                    {" "}
                    "Ti’Défricheur"
                  </Text>
                  .
                </Text>
                {!currentLevel ? (
                  <View style={{ flex: 2 }}>
                    <Text className="text-center text-custom-blue text-base Archivo leading-archivo">
                      {customInfo[3].reward}
                    </Text>
                    <View className="py-6 items-center">
                      <CustomButton
                        title={customInfo[3].btnText}
                        disabled={createLoading}
                        style={{
                          maxWidth: 280,
                          minWidth: 200,
                          backgroundColor: (colors as any)["custom-green-text"],
                        }}
                        onPress={() => {
                            handleAssignLevel2();
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={{ flex: 2 }} className="px-4">
                    <Text className="text-base Archivo leading-archivo text-center text-custom-blue flex-1">
                      Vous avez déjà activé le niveau{" "}
                      <Text className="ArchivoBold text-custom-green-text">
                        "Ti’Défricheur"
                      </Text>
                      .
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View className=" mt-4" style={{ paddingHorizontal: 16 }}>
                {CurrentEligibleLevel && (
                  <Text
                    className="text-center text-custom-green-text ClashDisplayBold mb-2 leading-archivo "
                    style={{ fontSize: 26 }}
                  >
                    {CurrentEligibleLevel?.title}
                  </Text>
                )}
                <Text
                  className="text-3xl text-center text-custom-green-text leading-archivo"
                  style={{
                    paddingBottom: 30,
                    fontFamily: "comicoFont",
                  }}
                >
                  {totalRequests} Demande{Number(totalRequests) > 1 && "s"}
                </Text>
                {CurrentEligibleLevel && (
                  <Text className="text-center text-custom-blue text-xl Archivo leading-archivo">
                    Déjà {totalRequests} demandes aux marques, bravo !
                  </Text>
                )}
                {CurrentEligibleLevel && !CurrentEligibleLevelIsActive && (
                  <View>
                    <Text className="text-center text-custom-blue text-xl Archivo leading-archivo">
                      {customInfo[Number(CurrentEligibleLevel.id - 2)].reward}
                    </Text>
                    <View className="py-6">
                      <CustomButton
                        title={
                          customInfo[Number(CurrentEligibleLevel.id - 2)]
                            .btnText
                        }
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
                  </View>
                )}
                {/*CurrentEligibleLevel && CurrentEligibleLevelIsActive && (
                <View className="flex-1">
                  <Text className="text-center text-custom-blue text-base Archivo leading-archivo mb-12">
                    Plus que{" "}
                    {getRemainingRequests(nextEligibleLevel?.goal ?? 0)}{" "}
                    demandes pour passer au profl suivant et{" "}
                    {customInfo[CurrentEligibleLevel?.id - 2].rewardNext}
                  </Text>
                </View>
              )*/}

                {/*CurrentEligibleLevel == null && ()*/}
                <View>
                  <View>
                    {Number(totalRequests) == 0 && (
                      <Text
                        className="text-center text-custom-blue text-xl Archivo leading-archivo "
                        style={{ marginBottom: 25 }}
                      >
                        Scannez des produits et demandez la transparence aux
                        marques pour démarrer votre aventure sur TiCO !​
                      </Text>
                    )}

                    {Number(totalRequests) > 0 && (
                      <Text className="text-center text-custom-blue text-xl Archivo leading-archivo">
                        Plus que{" "}
                        {getRemainingRequests(nextEligibleLevel?.goal ?? 0)}{" "}
                        demandes pour passer au profil suivant et recevoir{" "}
                        {
                          customInfo[
                            CurrentEligibleLevel
                              ? CurrentEligibleLevel.id - 2
                              : 0
                          ].rewardNext
                        }
                      </Text>
                    )}
                  </View>
                  {Number(totalRequests) == 0 && (
                    <Image
                      source={illustrationOrigines}
                      style={{ width: 260, height: 260, margin: "auto" }}
                      resizeMode="contain"
                    />
                  )}
                  {Number(totalRequests) > 0 && (
                    <>
                      {(CurrentEligibleLevelIsActive ||
                        Number(totalRequests) < 29) && (
                        <View style={{ paddingTop: 50, margin: "auto" }}>
                          <CustomButton
                            title={"En savoir plus​"}
                            style={{
                              maxWidth: 280,
                              minWidth: 180,
                              backgroundColor: (colors as any)[
                                "custom-green-text"
                              ],
                            }}
                            onPress={() => router.push("/hometab/infoProfil")}
                          />
                        </View>
                      )}
                    </>
                  )}
                </View>
              </View>
            )}
            {/* Partagez votre expérience */}
            {Number(totalRequests) > 0 && (
              <View
                style={{
                  marginTop: "auto",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingTop: 40,
                  justifyContent: "center",
                }}
              >
                <Text className="text-center text-custom-blue text-xl Archivo leading-archivo">
                  Partagez votre expérience sur TiCO
                </Text>
                <View className="py-6">
                  <CustomButton
                    title={"Partager"}
                    style={{
                      maxWidth: 280,
                      minWidth: 150,
                      backgroundColor: (colors as any)["custom-green-text"],
                    }}
                    onPress={handleShare}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
