import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  Share,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";

const apiUrl = "https://ton-api.com"; // Remplacez par votre vrai domaine
const { width, height } = Dimensions.get("window");

const HelpTico = () => {
  const handleShare = async () => {
    try {
      const content = {
        title: "TiCO App",
        message: "Découvrez l'application TiCO et partagez-la avec votre entourage !\n" + apiUrl + "/tico/helptico",
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
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#e1f5f5" barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header section */}
          <View style={styles.headerSection}>
            <ImageBackground
              source={require("@/assets/images/tico_intro.png")}
              resizeMode="contain"
              style={styles.backgroundImg}
            >
              <Text style={styles.titleBg}>
                Vous avez le pouvoir{"\n"}de changer les choses
              </Text>
              <Image
                source={require("@/assets/images/helpHands.png")}
                style={styles.hands}
              />
            </ImageBackground>
          </View>

          {/* Content section */}
          <View style={styles.actionsWrapper}>
            {/* Bloc 1 : Partage */}
            <View style={styles.block}>
              <Text style={styles.message}>
                Ensemble,{" "}
                <Text style={styles.bold}>faisons grandir la transparence</Text> !
              </Text>
              <View style={styles.btnContainer}>
                <Image
                  source={require("@/assets/images/leftFlech.png")}
                  style={styles.arrowLeft}
                  accessible={true}
                  accessibilityLabel="Flèche gauche décorative"
                />
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={handleShare}
                  activeOpacity={0.7}
                  accessibilityLabel="Bouton pour partager TiCO"
                  accessibilityHint="Ouvre les options de partage pour l'application TiCO"
                >
                  <Text style={styles.btnText}>
                    <Text style={styles.btnBold}>Partager </Text>
                    <Text style={styles.tico}>
                      Ti<Text style={styles.ticoTight}>CO</Text>
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bloc 2 : Don */}
            <View style={styles.block}>
              <Text style={styles.message}>
                Soutenir le développement de{" "}
                <Text style={styles.tico}>
                  Ti<Text style={styles.ticoTight}>CO</Text>
                </Text>{" "}
                et découvrir comment{" "}
                <Text style={styles.bold}>
                  obtenir le guide de décryptage et le calendrier
                </Text>{" "}
                des fruits, légumes, conseils et recettes de saison.
              </Text>
              <View style={styles.btnContainer}>
                <Image
                  source={require("@/assets/images/rightFlech.png")}
                  style={styles.arrowRight}
                  accessible={true}
                  accessibilityLabel="Flèche droite décorative"
                />
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={handleDonation}
                  activeOpacity={0.7}
                  accessibilityLabel="Bouton pour faire un don"
                  accessibilityHint="Ouvre le site pour faire un don et soutenir TiCO"
                >
                  <Text style={styles.btnText}>
                    <Text style={styles.btnBold}>Faire un don</Text>
                  </Text>
                </TouchableOpacity>
            
              </View>
            </View>

            {/* Remerciement */}
            <Text style={styles.thankYou}>Merci d'être acteur du changement !</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#e1f5f5",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden", // Important pour maintenir les bords arrondis visibles
  },
  headerSection: {
    width: '100%',
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    alignItems: "center",
  },
  backgroundImg: {
    width: width * 0.8,
    height: Math.min(height * 0.25, 240),
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  titleBg: {
    textAlign: "center",
    fontSize: Math.min(width * 0.055, 20),
    color: "#0033A0",
    fontWeight: "bold",
    position: "relative",
    top: 25,
    ...Platform.select({
      ios: {
        fontFamily: "Arial",
        fontWeight: "700",
      },
      android: {
        fontFamily: "Roboto",
        fontWeight: "700",
      },
    }),
  },
  hands: {
    position: "absolute",
    bottom: 10,
    width: width * 0.8,
    height: Math.min(height * 0.15, 130),
    resizeMode: "contain",
  },

  // --- Boutons et messages ---
  actionsWrapper: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  block: {
    width: "100%",
    maxWidth: Math.min(width * 0.9, 400),
    alignItems: "center",
    marginBottom: height * 0.035,
  },
  message: {
    color: "#0033A0",
    textAlign: "center",
    fontSize: Math.min(width * 0.042, 16),
    ...Platform.select({
      ios: {
        fontFamily: "Arial",
      },
      android: {
        fontFamily: "Roboto",
      },
      default: {
        fontFamily: "Archivo",
      }
    }),
    marginBottom: 16,
    paddingHorizontal: 10,
    lineHeight: Math.min(width * 0.06, 22),
  },
  bold: {
    fontWeight: "bold",
  },
  tico: {
    ...Platform.select({
      ios: {
        fontFamily: "Arial-BoldMT",
      },
      android: {
        fontFamily: "Roboto-Bold",
      },
      default: {
        fontFamily: "Pally",
      }
    }),
    fontWeight: "bold",
  },
  ticoTight: {
    letterSpacing: -1,
  },
  btnContainer: {
    width: Math.min(width * 0.55, 220),
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#0033A0",
    paddingVertical: Math.min(height * 0.018, 12),
    paddingHorizontal: Math.min(width * 0.05, 20),
    borderRadius: 12,
    width: Math.min(width * 0.5, 200),
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  btnText: {
    color: "white",
    fontSize: Math.min(width * 0.042, 16),
    textAlign: "center",
  },
  btnBold: {
    fontWeight: "bold",
  },
  arrowLeft: {
    position: "absolute",
    top: -10,
    left: -45,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  arrowRight: {
    position: "absolute",
    top: -10,
    right: -45,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  thankYou: {
    color: "#0033A0",
    textAlign: "center",
    fontSize: Math.min(width * 0.042, 16),
    marginTop: 15,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        fontFamily: "Arial",
      },
      android: {
        fontFamily: "Roboto",
      },
      default: {
        fontFamily: "Archivo",
      }
    }),
    fontWeight: "500",
  },
});

export default HelpTico;