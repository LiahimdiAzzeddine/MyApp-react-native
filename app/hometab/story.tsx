import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import CustomButton from "@/components/ui/CustomButton";
import { useTheme } from "@react-navigation/native";

const { width } = Dimensions.get('window');

interface Story {
  id: number;
  title: string;
  image: any;
}

const STORIES: Story[] = [
  {
    id: 1,
    title: "Story 1",
    image: require("@/assets/images/storys/1.png"),
  },
  {
    id: 2,
    title: "Story 2",
    image: require("@/assets/images/storys/2.png"),
  },
  {
    id: 3,
    title: "Story 3",
    image: require("@/assets/images/storys/4.png"),
  },
  {
    id: 4,
    title: "Story 4",
    image: require("@/assets/images/storys/8.png"),
  }
];

export default function Story(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isSharing, setIsSharing] = useState<boolean>(false);
 const { colors } = useTheme();
  // Convert asset to shareable URI
  const getShareableImageUri = async (): Promise<string | null> => {
    try {
      const currentStory = STORIES[currentPage];
      
      // Get the asset
      const asset = Asset.fromModule(currentStory.image);
      await asset.downloadAsync();
      
      if (!asset.localUri) {
        throw new Error('Could not get local URI for asset');
      }

      // Copy to a temporary file with proper extension
      const filename = `story_${currentStory.id}_${Date.now()}.png`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: fileUri,
      });
      
      return fileUri;
    } catch (error) {
      console.error('Error converting asset:', error);
      return null;
    }
  };

  // Share the original story image directly
  const shareStory = async (): Promise<void> => {
    if (isSharing) return;
    
    setIsSharing(true);
    
    try {
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Erreur', 'Le partage n\'est pas disponible sur cet appareil');
        setIsSharing(false);
        return;
      }

      // Get shareable URI for the current image
      const imageUri = await getShareableImageUri();
      if (!imageUri) {
        Alert.alert('Erreur', 'Impossible de préparer l\'image pour le partage');
        setIsSharing(false);
        return;
      }

      // Share the image
      await Sharing.shareAsync(imageUri, {
        mimeType: 'image/png',
        dialogTitle: 'Partager votre Story TiCO',
      });

    } catch (error) {
      console.error('Erreur partage:', error);
      Alert.alert('Erreur', 'Impossible de partager la story');
    } finally {
      setIsSharing(false);
    }
  };

  const onPageSelected = (e: any): void => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <View className="flex-1 bg-white w-full">
      {/* Header with background image */}
      <ImageBackground
        source={require('@/assets/images/profil/backgroundProfil.png')}
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

      {/* Main content */}
      <View className="flex-1 mt-2 justify-start px-4">
        <Text className="text-center text-custom-green-text text-base Archivo mb-6 leading-6">
          Choisissez une story et partagez-la directement sur vos réseaux sociaux !
        </Text>

        {/* Story slider */}
        <View className="flex-1 justify-start items-center">
          <PagerView
            style={{
              width: width - 60,
              height: 360,
              marginBottom: 10,
            }}
            initialPage={0}
            onPageSelected={onPageSelected}
          >
            {STORIES.map((story, index) => (
              <View key={story.id} style={{ flex: 1, }}>
                <View
                  style={{
                    flex: 1,
                  
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    position: 'relative',
                  }}
                >
                  <Image
                    source={story.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
    
                  
                  {/* TiCO watermark */}
                  <View
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      opacity: 0.7,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#2D5A3D',
                        fontWeight: 'bold',
                      }}
                    >
                      TiCO
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </PagerView>

          {/* Pagination indicators */}
          <View className="flex-row justify-center items-center mb-6">
            {STORIES.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: currentPage === index ? '#2D5A3D' : '#C0C0C0',
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>

          {/* Share button */}
          
              <CustomButton
                          disabled={isSharing}

                title={isSharing ? 'Partage en cours...' : 'Partager'}
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
              textAlign: 'center',
              fontSize: 12,
              color: '#666',
              marginHorizontal: 20,
            }}
          >
            Le partage ouvrira vos apps installées (Instagram, Facebook, WhatsApp, etc.)
          </Text>
        </View>
      </View>
    </View>
  );
}