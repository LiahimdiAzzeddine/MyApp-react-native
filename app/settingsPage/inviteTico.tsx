import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Share,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";


const apiUrl = "https://tico.foodhea.com";
const InviteTico = () => {
  const handleShare = async () => {
    const content = {
            title: "TiCO App",
            message:
              "Découvrez l'application TiCO et partagez-la avec votre entourage !\n" +
              apiUrl,
            subject: "Partager TiCO",
          };
          await Share.share(content);
  };

  return (
    <KeyboardAvoidingView
      className="bg-white"
      style={{ flex: 1 }}
      behavior={"padding"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Image des mains */}
          <Image
            source={require("@/assets/images/settings/hands.png")}
            style={styles.handsImage}
          />

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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    position:"static"
  },
  handsImage: {
    position: "absolute",
    top: 120,
    width: 200,
    height: 150,
    resizeMode: "contain",
    zIndex: 10,
  },
  mainContent: {
    marginTop: 80,
    alignItems: "center",
    width: "100%",
  },
  imageBackground: {
    width: 350,
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
    fontSize: 25,
    color: "#004A9F",
    textAlign: "center",
    fontFamily:"ArchivoBold"
  },
  paragraph: {
    marginTop: 15,
    fontSize: 18,
    color: "#004A9F",
    textAlign: "center",
    fontFamily:"Archivo"
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
    letterSpacing: -1.5,
  },
});
