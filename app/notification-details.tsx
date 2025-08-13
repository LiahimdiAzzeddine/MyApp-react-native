import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');


export default function NotificationDetails() {
  const router = useRouter();
   const params = useLocalSearchParams();
  
  // Typage manuel des paramètres
  const pageTitre = params.pageTitre as string | undefined;
  const pageParagraphe = params.pageParagraphe as string | undefined;
  const pageDeeplink = params.pageDeeplink as string | undefined;

  const handleOpenDeeplink = () => {
    if (pageDeeplink) {
      Linking.openURL(pageDeeplink);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View style={styles.Radius}>
        <View style={styles.section}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>{pageTitre || "Notification"}</Text>
            <Text style={styles.paragraph}>
              {pageParagraphe || "Pas de contenu disponible."}
            </Text>
          </View>

          {pageDeeplink && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleOpenDeeplink}
              >
                <Text style={styles.submitText}>Continuer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.submitText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  Radius: {
    flex: 1,
    backgroundColor: "#ffeda3",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  section: {
    flex: 1,
    paddingHorizontal:16,
    paddingTop: 35,
  },

  contentWrapper: {
    flex: 1,
  },

  title: {
    fontSize: width < 350 ? 20 : 24, // Responsive font size
    textAlign: "center",
    fontFamily: "ClashDisplayBold",
    color: '#0F548D',
    marginBottom: height * 0.03, // 3% de la hauteur
  },

  paragraph: {
    fontSize: width < 350 ? 13 : 14, // Responsive font size
    fontFamily: "ArchivoLightItalic",
    color: '#0F548D',
    textAlign:'left',
    lineHeight: width < 350 ? 18 : 20,
    paddingHorizontal: 10,
  },

  buttonContainer: {
    alignItems: 'center',
    paddingBottom: height * 0.05, // 5% de la hauteur
  },

  footer: {
    paddingVertical: height * 0.02, // 2% de la hauteur
    paddingHorizontal: width * 0.06, // 6% de la largeur
    backgroundColor: "#fff",
    alignItems: "center",
  },

  submitButton: {
    backgroundColor: "#f97316",
    paddingVertical: height * 0.015, // 1.5% de la hauteur
    paddingHorizontal: width * 0.1, // 10% de la largeur
    borderRadius: 14,
    alignItems: "center",
    minWidth: width * 0.35, // Largeur minimale de 35%
  },

  backButton: {
    backgroundColor: "#0F548D", // Couleur grise pour le bouton retour
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 14,
    alignItems: "center",
    minWidth: width * 0.35,
  },

  submitText: {
    color: "#fff",
    fontFamily: "ArchivoBold",
    fontSize: width < 350 ? 14 : 16, // Responsive font size
  },
});