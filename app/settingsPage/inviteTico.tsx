import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share
} from "react-native";

const { width } = Dimensions.get("window");

const apiUrl = "https://your-api-url.com"; // Remplace par process.env si tu utilises un système d'env RN

const InviteTico = () => {
  const handleShare = async () => {
    const content = {
        title: "TiCO App",
        message:
          "Découvrez l'application TiCO et partagez-la avec votre entourage !\n" +
          apiUrl +
          "/tico/helptico",
        subject: "Partager TiCO",
      };
    await Share.share(content);
  };

  return (
    <View style={styles.container}>
      {/* Image des mains */}
      <Image source={require("@/assets/images/settings/hands.png")} style={styles.handsImage} />

      {/* Zone centrale avec fond et texte */}
      <View style={styles.mainContent}>
        <ImageBackground
          source={require("@/assets/images/settings/background.png")}
          resizeMode="contain"
          style={styles.imageBackground}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Faire connaître <TicoTitle />
            </Text>
            <Text style={styles.paragraph}>
              Envie de faire connaître <TicoTitle /> ?
            </Text>
          </View>
        </ImageBackground>

        {/* Bouton */}
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Je partage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TicoTitle = () => (
  <Text style={styles.ticoTitle}>
    Ti<Text style={styles.coPart}>CO</Text>
  </Text>
);

export default InviteTico;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  handsImage: {
    position: "absolute",
    top: -10,
    width: 180,
    height: 120,
    resizeMode: "contain",
    zIndex: 10,
  },
  mainContent: {
    marginTop: 80,
    alignItems: "center",
    width: "100%",
  },
  imageBackground: {
    width: width * 0.8,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: -30,
  },
  title: {
    fontSize: 22,
    color: "#004A9F", // équivalent de text-custom-blue
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    marginTop: 20,
    fontSize: 16,
    color: "#004A9F",
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  ticoTitle: {
    fontWeight: "bold",
    fontSize: 22,
  },
  coPart: {
    letterSpacing: -1,
  },
});
