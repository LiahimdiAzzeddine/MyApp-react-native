import React from "react";
import { useRoute } from "@react-navigation/native";
import useDemandDetails from "@/hooks/demand/useDemandDetails";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import GreenLineWithPoint from "@/components/demands/GreenLineWithPoint";
import { Share } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const DemandDetail = () => {
  const { params } = useRoute();
  const { id }: any = params;
  const { demand, loading, error } = useDemandDetails(Number(id));
  const handleShare = async () => {
    const apiUrl = "https://tico.foodhea.com";
    try {
      const content = {
        title: "TiCO App",
        message:
          "J’ai demandé à cette marque de faire décrypter par des experts indépendants les informations sur son produit !\n\n" +
          "Si tu le fais aussi nous aurons plus de pouvoir pour obliger les marques à dire la vérité.\n\n" +
          "Plus on fait des demandes plus on est récompensé et ça c’est cool !\n\n" +
          "Essaye, demande à cette marque de s’engager ici:" +
          apiUrl +"/fp/" +demand?.gtin +"?search=true \n\n" +
          "Si tu n’as pas encore TiCO scan télécharge là et reviens sur mon message, clique sur le lien plus haut pour arriver directement sur la page produit.\n\n" +
          "📲 TiCO sur l'App Store : https://apps.apple.com/fr/app/tico-scan/id6739306595 \n" +
          "📲 TiCO sur le Play Store : https://play.google.com/store/apps/details?id=com.tico.foodhea.tico&hl=fr \n\n" +
          "À toi de jouer et n’hésite pas à partager ! 💥",
        subject: "Partager Demande",
      };
      const result = await Share.share(content);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Partagé via", result.activityType);
        } else {
          console.log("Partage effectué");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Partage annulé");
      }
    } catch (error) {
      console.error("Erreur de partage:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Titre avec fond */}
      <ImageBackground
        source={require("@/assets/images/headers/background.png")}
        resizeMode="contain"
        style={{
          minHeight: 70,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Text className="text-center text-custom-green-text text-[1.7rem] font-bold">
          Suivi de mes demandes
        </Text>
      
      </ImageBackground>

      {/* Contenu principal */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#4E986D" />
        ) : error ? (
          <Text style={styles.error}>Une erreur est survenue.</Text>
        ) : !demand ? (
          <Text style={styles.error}>Aucune demande trouvée.</Text>
        ) : (
          <>
            <Text style={styles.countText}>
              {demand.same_gtin_count} demande
              {demand.same_gtin_count > 1 ? "s" : ""} sur ce produit
            </Text>

            <View style={styles.lineContainer}>
              <GreenLineWithPoint demandesCount={demand.same_gtin_count} />
            </View>

            <Text style={styles.goalText}>Objectif 1000 demandes</Text>
            <Text style={styles.infoText}>
              À partir de <Text style={styles.bold}>50 demandes</Text>, nous
              entrons en contact avec les marques.{"\n"}À partir de{" "}
              <Text style={styles.bold}>1000 demandes</Text>, elles n’ont plus
              le choix, elles doivent agir.
            </Text>

            <Text style={styles.inviteText}>
              Pour plus d’impact, invitez votre entourage à solliciter cette
              marque.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleShare}>
              <Text style={styles.buttonText}>Partager</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    minHeight: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  headerCircle: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#E6F4EA", // Couleur de fond adaptée
    top: -70,
  },
  headerTitle: {
    fontSize: 28,
    color: "#4E986D",
    fontWeight: "bold",
    zIndex: 10,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
    paddingBottom: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  countText: {
    color: "#4E986D",
    fontSize: 18,
    fontFamily: "Archivo",
    textAlign: "center",
    marginBottom: 12,
  },
  lineContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  goalText: {
    color: "#4E986D",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    color: "#4E986D",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  inviteText: {
    color: "#0F548D",
    fontStyle: "italic",
    fontSize: 17,
    marginVertical: 12,
    textAlign: "center",
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#4E986D",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
});

export default DemandDetail;
