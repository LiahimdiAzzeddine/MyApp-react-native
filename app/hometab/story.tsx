import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import CustomButton from "@/components/ui/CustomButton";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useStories } from "@/hooks/useStories";

const { width, height } = Dimensions.get("window");


export default function Story(): JSX.Element {
  const { stories, loading, error } = useStories();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

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
        Alert.alert("Erreur", "Le partage n'est pas disponible sur cet appareil");
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

  // Ouvre le modal fullscreen avec la story cliquée
  const openModal = (story: any) => {
    setSelectedStory(story);
    setModalVisible(true);
  };

  // Ferme le modal fullscreen
  const closeModal = () => {
    setModalVisible(false);
    setSelectedStory(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white w-full" edges={["bottom", "left", "right"]}>
      <ImageBackground
        source={require("@/assets/images/profil/backgroundProfil.png")}
        resizeMode="contain"
        style={{
          maxHeight:150,
          minHeight: height /7,
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
        <Text className="text-center text-custom-green-text text-base Archivo mb-2 leading-6">
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
                width: width - 80,
                height: height / 2.5,
                marginBottom: 0,
                borderRadius: 16,
                overflow: "hidden",
              }}
              initialPage={0}
              onPageSelected={onPageSelected}
            >
              {stories.map((story) => (
                <TouchableOpacity
                  key={story.id}
                  activeOpacity={0.8}
                  onPress={() => openModal(story)}
                  style={{ flex: 1, padding: 6 }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 16,
                      overflow: "hidden",
                      backgroundColor: "#f9f9f9",
                      elevation: 5,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 6,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: story.image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                        borderRadius: 16,
                      }}
                    />
                    {story.title && (
                      <Text
                        style={{
                          position: "absolute",
                          bottom: 12,
                          left: 12,
                          right: 12,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: "#fff",
                          padding: 8,
                          borderRadius: 8,
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        {story.title}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </PagerView>

            <View className="flex-row justify-center items-center mb-6">
              {stories.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: currentPage === index ? 20 : 10,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: currentPage === index ? "#2D5A3D" : "#C0C0C0",
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
                marginBottom: 5,
                backgroundColor: (colors as any)["custom-green-text"],
              }}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#666",
                marginHorizontal: 5,
              }}
            >
              Le partage ouvrira vos apps installées (Instagram, Facebook, WhatsApp, etc.)
            </Text>

            {/* Modal fullscreen pour l'image story */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
               style={{ paddingTop: insets.top }} 
            >
              <View style={styles.modalContainer} >
                <Pressable style={styles.modalBackground} onPress={closeModal} />
                {selectedStory && (
                  <Image
                    source={{ uri: selectedStory.image }}
                    style={styles.fullscreenImage}
                    resizeMode="contain"
                  />
                )}
                <Pressable style={[styles.closeButton,{top: insets.top}]} onPress={closeModal}>
                  <Text style={styles.closeText} className="leading-none">✕</Text>
                </Pressable>
              </View>
            </Modal>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  fullscreenImage: {
    width: width,
    height: height,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 20,
    backgroundColor: "#4E986D",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical:10.5,
  },
  closeText: {
    color: "#fff",
    fontSize: 28,
    fontFamily:"Archivo"
  },
});
