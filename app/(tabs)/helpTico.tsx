import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  Share,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");

const HelpTiCO = () => {
  const handleShare = async () => {
    await Share.share({
      title: "TiCO App",
      message:
        "Découvrez l'application TiCO et partagez-la avec votre entourage ! https://ton-backend.com/tico/helptico",
    });
  };

  const openSite = () => {
    Linking.openURL("https://www.onparticipe.fr/c/tico_scan");
  };

  return (
    <SafeAreaView style={styles.root}><View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
          <View style={styles.headerImageContainer}>
            <Text style={styles.headerText}>Vous avez le pouvoir de changer les choses</Text>
            <Image
              source={require("@/assets/images/helpHands.png")}
              style={styles.handsImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.introText}>
              Ensemble, <Text style={styles.boldText}>faisons grandir la transparence</Text> !
            </Text>

            <View style={styles.buttonContainer}>
              <Image source={require("@/assets/images/leftFlech.png")} style={styles.leftArrow} />
              <TouchableOpacity style={styles.button} onPress={handleShare}>
                <Text style={styles.buttonText}>
                  <Text style={styles.archivoBold}>Partager </Text>
                  <Text style={styles.pallyBold}>Ti</Text>
                  <Text style={styles.trackingTight}>CO</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.supportText}>
              Soutenir le développement de{" "}
              <Text style={styles.pallyBold}>
                Ti<Text style={styles.trackingTight}>CO</Text>
              </Text>{" "}
              et découvrir comment{" "}
              <Text style={styles.boldText}>obtenir le guide de décryptage et le calendrier</Text> des fruits, légumes, conseils et recettes de saison.
            </Text>

            <View style={styles.buttonContainer}>
              <Image source={require("@/assets/images/rightFlech.png")} style={styles.rightArrow} />
              <TouchableOpacity style={styles.button} onPress={openSite}>
                <Text style={styles.buttonText}>Faire un don</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.thanksText}>Merci d'être acteur du changement !</Text>
          </View>
        
      </ScrollView></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#e1f5f5',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    marginTop: height * 0.01,
    paddingHorizontal: width * 0.05,
  },
  headerText: {
    textAlign: "center",
    fontSize: Math.min(width * 0.05, 20),
    color: "#004080",
    fontWeight: "700",
    marginBottom: height * 0.01,
    paddingHorizontal: width * 0.02,
  },
  handsImage: {
    width: width * 0.35,
    height: width * 0.35,
    maxWidth: 150,
    maxHeight: 150,
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  introText: {
    textAlign: "center",
    color: "#004080",
    fontSize: Math.min(width * 0.04, 16),
    marginBottom: height * 0.02,
  },
  boldText: {
    fontWeight: "700",
  },
  buttonContainer: {
    position: "relative",
    alignItems: "center",
    marginVertical: height * 0.015,
    width: '100%',
  },
  button: {
    backgroundColor: "#004080",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 12,
    alignItems: "center",
    width: '70%',
    maxWidth: 250,
  },
  buttonText: {
    color: "white",
    fontSize: Math.min(width * 0.04, 16),
  },
  archivoBold: {
    fontWeight: "700",
  },
  pallyBold: {
    fontWeight: "700",
  },
  trackingTight: {
    letterSpacing: -1,
  },
  leftArrow: {
    position: "absolute",
    top: '50%',
    left: '10%',
    width: width * 0.07,
    height: width * 0.07,
    maxWidth: 30,
    maxHeight: 30,
    transform: [{ translateY: -15 }],
  },
  rightArrow: {
    position: "absolute",
    top: '50%',
    right: '10%',
    width: width * 0.07,
    height: width * 0.07,
    maxWidth: 30,
    maxHeight: 30,
    transform: [{ translateY: -15 }],
  },
  supportText: {
    color: "#004080",
    textAlign: "center",
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    fontSize: Math.min(width * 0.035, 14),
    paddingHorizontal: width * 0.02,
  },
  thanksText: {
    color: "#004080",
    textAlign: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    fontSize: Math.min(width * 0.04, 16),
  },
});

export default HelpTiCO;