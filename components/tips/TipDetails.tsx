import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Share,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "@/utils/favoritesController";
import {  useAppContext } from "@/context/AppContext";



const apiUrl = Constants.expoConfig?.extra?.BACKEND_URL || "";

const TipDetails: React.FC<any> = ({ tip }:any) => {
  const { id, title, details } = tip;
  const [favorite, setFavorite] = useState(false);
  const {refreshFTips,lastUpdatedF} = useAppContext()
     

  // Méthode de partage avec deep link
  const shareTip = async () => {
    try {
      // Construisez votre deep link
      const deepLink = `${apiUrl}/tiptab/tip/${id}`;

      await Share.share({
        title: title,
        message: `J’ai découvert ce conseil sur TiCO, jette un œil ça pourrait t’intéresser !`,
        url: deepLink, // Le deep link sera utilisé comme URL
      });
    } catch (error) {
      console.error("Erreur lors du partage", error);
    }
  };
  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(id);
      setFavorite(false);
    } else {
      await addFavorite(tip);
      setFavorite(true); 
    } 
    refreshFTips()
    console.log("lastUpdatedF",lastUpdatedF)
  };

  useEffect(() => {
    const checkFavorite = async () => {
      const fav = await isFavorite(id);
      setFavorite(fav);
    };
    checkFavorite();
  }, [id]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      {/* Contenu principal */}
      <View style={styles.scrollView} id="partiesScorllable">
        <View style={styles.mainContent}>
          {/* Section Titre et Image */}
          <View style={styles.headerSection}>
            <ImageBackground
              source={require("@/assets/images/tips/bgImage.png")}
              resizeMode="contain"
              style={styles.imageContainer}
            >
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: tip?.category?.image }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              </View>
            </ImageBackground>
            <TouchableOpacity
              onPress={toggleFavorite}
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                padding: 6,
              }}
            >
              <Image
                source={
                  favorite
                    ? require("@/assets/images/tips/33.png")
                    : require("@/assets/images/tips/32.png")
                }
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Section Détails */}

          <ScrollView style={styles.detailsSection}>
            <Text style={styles.categoryTitle}>
              {tip?.category?.name || "Notre ti'conseil"}
            </Text>

            {/* Afficher le HTML comme un texte brut */}
            <Text style={styles.plainText}>{details}</Text>
          </ScrollView>
        </View>
      </View>

      {/* Section Bouton */}
      <View style={styles.buttonSection}>
        <TouchableOpacity onPress={shareTip} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Partager autour de moi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffeda3",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#ffeda3",
  },
  plainText: {
    color: "#0F548D",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 32,
  },
  headerSection: {
    backgroundColor: "#ffeda3", // custom-orange
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    width: "100%",
    minHeight: "35%",
    justifyContent: "flex-end",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 240,
  },
  title: {
    textAlign: "center",
    color: "#0F548D",
    fontSize: 22,
    fontFamily: "ClashDisplayBold",
  },

  titleWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 15,
  },

  imageWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10,
    paddingBottom: 10,
  },
  categoryImage: {
    width: 135,
    height: 135,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FF8200",
  },
  detailsSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  categoryTitle: {
    color: "#FF6B35", // custom-text-orange
    fontSize: 20,
    paddingBottom: 12,
    fontFamily: "ArchivoExtraBold",
  },
  webView: {
    width: "100%",
    height: 300, // Hauteur fixe ou dynamique selon vos besoins
    backgroundColor: "transparent",
  },
  buttonSection: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#ffeda3",
  },
  shareButton: {
    backgroundColor: "#FF6B35", // custom-text-orange
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  shareButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "ArchivoBold",
  },
});

export default TipDetails;
