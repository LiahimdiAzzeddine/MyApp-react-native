import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  GestureResponderEvent,
  Share,
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

const customInfo = [
  {
    id: 2,
    title: "Ti’Curieux",
    reward:
      "Débloquez les stories TiCO stylées et engagées pour faire bouger les marques.​",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 3,
    title: "Ti’Défricheur",
    reward:
      "Débloquez vos 3 Ti’conseils exclusifs mensuels si vous avez appris quelque chose d’intéressant dites-le ! ​",
    route: "/hometab/story",
    btnText: "Débloquer les Ti’Conseils​",
  },
  {
    id: 4,
    title: "Ti’Conso engagé",
    reward: "Calendrier F&L",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 5,
    title: "Ti’Décrypteur",
    reward: "Guide de décryptage",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 6,
    title: "Ti’Veilleur",
    reward: "Jeu Info ou Pipeau",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 7,
    title: "Ti’Héro de la transparence",
    reward:
      "10% de réduction sur votre première séance personnalisée avec Marion Honoré, coach en alimentation santé durable (ou la première séance au prix de la séance de suivi)",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 8,
    title: "Tit’Légende TiCO",
    reward:
      "1 séance de suivi alimentation santé durable avec Marion Honoré, offerte.",
    route: "/hometab/story",
    btnText: "Débloquer les stories​",
  },
  {
    id: 9,
    title: "Ti’Champion de la transparence",
    reward:
      "Box surprise avec des produits sélectionnés pour leurs engagements dans la transparence",
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
    createdUserLevel,
    loading: createLoading,
    error: createError,
  } = useCreateUserLevel();

  const [nextEligibleLevel, setNextEligibleLevel] = useState<Level | null>(
    null
  );
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

    if (!currentLevel) {
      // Pas encore de niveau => commencer par le premier niveau réel
      const firstLevel = levels[0]; // Assumer que levels[0] est une base neutre
      if (totalRequests >= firstLevel.goal) {
        setNextEligibleLevel(firstLevel);
      } else {
        setNextEligibleLevel(null);
      }
    } else {
      // Si un niveau actuel existe
      nextLevel =
        levels.find((lvl) => lvl.id === currentLevel.next_goal) || null;
      if (nextLevel && totalRequests >= nextLevel.goal) {
        setNextEligibleLevel(nextLevel);
      } else {
        setNextEligibleLevel(null);
      }
    }
  }, [levels, totalRequests, currentLevel]);

  const handleAssignLevel = async (): Promise<void> => {
    if (!nextEligibleLevel || !userId) return;

    const result = await createUserLevel({
      user_id: userId,
      level_id: nextEligibleLevel.id,
    });

    router.push(
      customInfo[currentLevel?.id ? currentLevel?.id - 2 : 0].route as Route
    );
    if (result) {
      fetchTotalRequests();
    }
  };

  const getNextLockedLevel = (): Level | null => {
    if (!levels || levels.length === 0) return null;
    if (!currentLevel) return levels[0] || null;
    return levels.find((lvl) => lvl.id === currentLevel.next_goal) || null;
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
          minHeight: 140,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 25,
          marginTop: 15,
        }}
      >
        <Text className="text-center text-custom-green-text text-2xl ClashDisplayBold">
          Profil
        </Text>
      </ImageBackground>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      ) : error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <View className="flex-1 mt-4" style={{ paddingHorizontal: 16 }}>
          <View className="flex-1">
            {(currentLevel || nextEligibleLevel) && (
              <>
                <Text className="text-xl text-center text-custom-green-text ClashDisplayBold mb-6 mt-2">
                  {currentLevel?.title ? currentLevel.title : "Ti’Curieux​"}
                </Text>
                <Text className="text-center text-custom-blue text-base Archivo mb-4">
                  Déjà {totalRequests} demandes aux marques, bravo !
                </Text>
              </>
            )}
            {nextEligibleLevel ? (
              <>
                <Text className="text-center text-custom-blue text-base Archivo leading-archivo">
                  {
                    customInfo[currentLevel?.id ? currentLevel?.id - 2 : 0]
                      .reward
                  }
                </Text>
                {/* Bouton débloquer si applicable */}
                <View className="py-6">
                  <CustomButton
                    title={
                      customInfo[currentLevel?.id ? currentLevel?.id - 2 : 0]
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
                      if (
                        customInfo[currentLevel?.id ? currentLevel?.id - 2 : 0]
                          .route
                      ) {
                        handleAssignLevel();
                      } else {
                        console.log("a ajouter");
                      }
                    }}
                  />
                </View>

                {nextEligibleLevel.goal - (totalRequests ? totalRequests : 0) <=
                  0 && (
                  <Text className="text-center text-custom-blue text-base Archivo leading-archivo mb-12">
                    Clique sur le bouton{" "}
                    {
                      customInfo[currentLevel?.id ? currentLevel?.id - 2 : 0]
                        .btnText
                    }{" "}
                    pour passer au profil suivant et{" "}
                    {
                      customInfo[currentLevel?.id ? currentLevel?.id - 2 : 0]
                        .reward
                    }
                    {nextEligibleLevel.title}.
                  </Text>
                )}
              </>
            ) : (
              (() => {
                const nextLocked = getNextLockedLevel();
                if (nextLocked) {
                  const remaining = getRemainingRequests(nextLocked.goal);
                  return (
                    <View className="flex-1">
                      {currentLevel ? (
                        <Text className="text-center text-custom-blue text-base Archivo leading-archivo mb-12">
                          Plus que {remaining} demandes pour passer au profil
                          suivant et recevoir 3 Ti’Conseils exclusifs pour
                          briller à l’apéro !​
                        </Text>
                      ) : (
                        <View className="flex-1">
                          <View style={{ flex: 1 }}>
                            <Text className="text-center text-custom-blue text-base Archivo leading-archivo mb-8">
                              Pas encore de demandes de transparence, vous devez
                              scanner et encourager les marques pour vous lancer
                              dans l’aventure !
                            </Text>
                            <Text className="text-center text-custom-blue text-base Archivo leading-archivo">
                              Plus que {remaining} demandes pour débloquer les
                              stories TiCO et passer au profil de :
                            </Text>
                          </View>
                          <Text
                            className="text-xl text-center text-custom-green-text ArchivoExtraBold "
                            style={{
                              paddingBottom: 60,
                              paddingTop: 30,
                              flex: 1,
                            }}
                          >
                            {nextLocked.title}
                          </Text>
                          <Text
                            className="text-center text-custom-blue text-base Archivo leading-archivo"
                            style={{ flex: 1 }}
                          >
                            À vos scans, prêt partez !​
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                } else {
                  return (
                    <Text className="text-center text-base">
                      Vous avez atteint le niveau le plus élevé !
                    </Text>
                  );
                }
              })()
            )}
          </View>
          {/* Section partage */}
          {(currentLevel || nextEligibleLevel) && (
            <View className="items-center">
              <Text className="text-center text-custom-blue text-base Archivo leading-archivo">
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
      )}
    </SafeAreaView>
  );
}
