import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import CustomButton from "@/components/ui/CustomButton";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStories } from "@/hooks/useStories"; // chemin à adapter

const { width, height } = Dimensions.get("window");

export default function Story(): JSX.Element {
  const { stories, loading, error } = useStories();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const { colors } = useTheme();

  const getShareableImageUri = async (): Promise<string | null> => {
    try {
      const currentStory = stories[currentPage];
      const filename = `story_${currentStory.id}_${Date.now()}.png`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      const downloadedAsset = await FileSystem.downloadAsync(
        currentStory.image,
        fileUri
      );

      return downloadedAsset.uri;
    } catch (error) {
      console.error("Erreur téléchargement image:", error);
      return null;
    }
  };

  const shareStory = async (): Promise<void> => {
    if (isSharing) return;

    setIsSharing(true);

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          "Erreur",
          "Le partage n'est pas disponible sur cet appareil"
        );
        setIsSharing(false);
        return;
      }

      const imageUri = await getShareableImageUri();
      if (!imageUri) {
        Alert.alert("Erreur", "Impossible de préparer l'image pour le partage");
        setIsSharing(false);
        return;
      }

      await Sharing.shareAsync(imageUri, {
        mimeType: "image/png",
        dialogTitle: "Partager votre Story TiCO",
      });
    } catch (error) {
      console.error("Erreur partage:", error);
      Alert.alert("Erreur", "Impossible de partager la story");
    } finally {
      setIsSharing(false);
    }
  };

  const onPageSelected = (e: any): void => {
    setCurrentPage(e.nativeEvent.position);
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
          Stories TiCO
        </Text>
      </ImageBackground>

      <View className="flex-1 mt-2 justify-start px-4">
        <Text className="text-center text-custom-green-text text-base Archivo mb-6 leading-6">
          Choisissez une story et partagez-la directement sur vos réseaux sociaux !
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>
            Erreur : {error}
          </Text>
        ) : (
          <View className="flex-1 justify-around items-center">
            <PagerView
              style={{
                width: width - 60,
                height: height / 2.7,
                marginBottom: 10,
              }}
              initialPage={0}
              onPageSelected={onPageSelected}
            >
              {stories.map((story) => (
                <View key={story.id} style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                      position: "relative",
                    }}
                  >
                    <Image
                      source={{ uri: story.image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />

                    <View
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        opacity: 0.7,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#2D5A3D",
                          fontWeight: "bold",
                        }}
                      >
                        TiCO
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </PagerView>

            <View className="flex-row justify-center items-center mb-6">
              {stories.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor:
                      currentPage === index ? "#2D5A3D" : "#C0C0C0",
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>

            <CustomButton
              disabled={isSharing}
              title={isSharing ? "Partage en cours..." : "Partager"}
              onPress={shareStory}
              style={{
                maxWidth: 250,
                minWidth: 140,
                marginBottom: 10,
                backgroundColor: (colors as any)["custom-green-text"],
              }}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#666",
                marginHorizontal: 20,
              }}
            >
              Le partage ouvrira vos apps installées (Instagram, Facebook, WhatsApp, etc.)
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
