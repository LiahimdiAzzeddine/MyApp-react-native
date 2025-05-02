import CustomButton from "@/components/ui/CustomButton";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  Linking,
  Share,
  ScrollView,
} from "react-native";
import {styles} from "./style"

const apiUrl = "https://tico.foodhea.com";

const HelpTico = () => {
  const { colors } = useTheme();

  const handleShare = async () => {
    try {
      const content = {
        title: "TiCO App",
        message:
          "Découvrez l'application TiCO et partagez-la avec votre entourage !\n" +
          apiUrl +
          "/tico/helptico",
        subject: "Partager TiCO",
      };
      await Share.share(content);
    } catch (error) {
      console.log("Erreur de partage :", error);
    }
  };

  const openSite = async () => {
    const url = "https://www.onparticipe.fr/c/tico_scan";
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Impossible d'ouvrir l'URL :", url);
      }
    } catch (error) {
      console.log("Erreur lors de l'ouverture de l'URL :", error);
    }
  };

  const handleDonation = () => {
    openSite();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-tab2-bg rounded-b-[40px] overflow-hidden px-6">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View
           style={styles.header}
          >
            <ImageBackground
              source={require("@/assets/images/tico_intro.png")}
              resizeMode="contain"
              style={styles.imageBackground}
            >
              <Text
             style={styles.greetinghelp}
             
                className="leading-clash text-2xl"
              >
                Vous avez le pouvoir{"\n"}de changer les choses
              </Text>
              <Image
                source={require("@/assets/images/helpHands.png")}
                style={{
                  position: "absolute",
                  bottom: 30,
                  width: 220,
                  height: 110,
                  top:110
                }}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>

          {/* Content Section */}
          <View style={styles.buttonsContainer} className="w-full">
            {/* Bloc 1 : Partage */}
            <View className="items-center w-full max-w-sm pb-6">
              <Text
                className="text-center mb-3 leading-archivo text-custom-blue text-base w-screen"
                style={{
                  fontFamily: "ArchivoLight",
                }}
              >
                Ensemble,{" "}
                <Text style={{ fontWeight: "bold" }}>
                  faisons grandir la transparence
                </Text>{" "}
                !
              </Text>
              <View className="items-center justify-center mt-2 w-full relative">
                <Image
                  source={require("@/assets/images/leftFlech.png")}
                  style={{
                    position: "absolute",
                    top: -8,
                    left: "10%",
                    width: 32,
                    height: 32,
                    resizeMode: "contain",
                  }}
                />
                <CustomButton
                  title="Partager TiCO"
                  onPress={handleShare}
                  accessibilityLabel="Bouton pour partager TiCO"
                  accessibilityHint="Ouvre les options de partage pour l'application TiCO"
                  style={{
                    width: "55%",
                    maxWidth: 200,
                    minWidth: 150,
                    backgroundColor: (colors as any)["custom-blue"],
                  }}
                />
              </View>
            </View>

            {/* Bloc 2 : Don */}
            <View className="items-center w-full max-w-sm pb-8">
              
              <Text
                className="text-center mb-3 leading-archivo text-custom-blue text-base w-screen"
                style={{ fontFamily: "ArchivoLight" }}
              >
                Soutenir le développement de
                <Text style={{ fontWeight: "bold" }}>
                  Ti<Text style={{ letterSpacing: -1 }}>CO</Text>
                </Text>{" "}
                et découvrir comment{" "}
                <Text style={{ fontWeight: "bold" }}>
                  obtenir le guide de décryptage et le calendrier
                </Text>{" "}
                des fruits, légumes, conseils et recettes de saison.
              </Text>
              <View className="items-center justify-center mt-2 w-full relative">
                <Image
                  source={require("@/assets/images/rightFlech.png")}
                  style={{
                    position: "absolute",
                    top: -8,
                    right: "10%",
                    width: 32,
                    height: 32,
                    resizeMode: "contain",
                  }}
                />
                <CustomButton
                  title="Faire un don"
                  onPress={handleDonation}
                  accessibilityLabel="Bouton pour faire un don"
                  accessibilityHint="Ouvre le site pour faire un don et soutenir TiCO"
                  style={{
                    width: "55%",
                    maxWidth: 200,
                    minWidth: 150,
                    backgroundColor: (colors as any)["custom-blue"],
                  }}
                />
              </View>
            </View>

            {/* Remerciement */}
            <Text 
            style={{
              fontFamily: "ArchivoLight",
            }}
            className="text-center leading-archivo text-custom-blue font-medium mt-4 mb-2 text-base w-screen">
              Merci d'être acteur du changement !
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HelpTico;
