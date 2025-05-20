import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { storeTipPreferences, getTipPreferences } from "@/utils/storage";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { AppContext } from "@/context/AppContext";


const tips = [
  {
    id: 1,
    label: "Astuces",
    image: require("@/assets/images/tips/VISUELS_Astuces_pratiques_blanc.png"),
    activeImage: require("@/assets/images/tips/VISUELS_Astuces_pratiques.png"),
  },
  {
    id: 2,
    label: "Antigaspi",
    image: require("@/assets/images/tips/VISUELS_Anti-gaspi_blanc.png"),
    activeImage: require("@/assets/images/tips/VISUELS_Anti-gaspi.png"),
  },
  {
    id: 4,
    label: "Cuisine durable",
    image: require("@/assets/images/tips/VISUELS_Cuisine_blanc.png"),
    activeImage: require("@/assets/images/tips/VISUELS_Cuisine.png"),
  },
  {
    id: 3,
    label: "Techniques culinaires",
    image: require("@/assets/images/tips/VISUELS_Techniques_culinaires_blanc.png"),
    activeImage: require("@/assets/images/tips/VISUELS_Techniques_culinaires.png"),
  },
  {
    id: 5,
    label: "Petits plaisirs",
    image: require("@/assets/images/tips/VISUELS_Petits_plaisirs_blanc.png"),
    activeImage: require("@/assets/images/tips/VISUELS_Petits_plaisirs.png"),
  },
  {
    id: 6,
    label: "Sous les étiquettes",
    image: require("@/assets/images/tips/tipsVISUELS_Etiquette_blanc.png"),
    activeImage: require("@/assets/images/tips/VISUELS_Etiquettes.png"),
  },
];

const TipSettings = () => {
  const [selectedTips, setSelectedTips] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const authUser = useContext(AuthContext);
  const userId = authUser.userInfo?.id;
  const router = useRouter();
    const context = useContext(AppContext);
     if (!context) {
    throw new Error('TipContext must be used within a TipProvider');
  }

  const { refreshTips } = context;


  const toggleTip = (tipId: number) => {
    setSelectedTips((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await storeTipPreferences(Number(userId), selectedTips);
      refreshTips();
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la sauvegarde des préférences. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
      router.back();
    }
  };

  useEffect(() => {
    const loadPreferences = async () => {
      const storedPreferences = await getTipPreferences(Number(userId));
      setSelectedTips(storedPreferences);
    };
    if (userId) {
      loadPreferences();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.Radius}>
        {/* Header */}
        <ImageBackground
          source={require("@/assets/images/recipes/recetteBg.png")} // converti en PNG pour simplicité
          style={styles.header}
          resizeMode="contain"
        >
          <Text style={styles.title} className="text-custom-text-orange">
            Sélectionner vos{"\n"}préférences
          </Text>
        </ImageBackground>
        <View className="items-center pb-6 w-full text-center">
          <Text style={styles.subtitle} className="text-custom-text-orange">
            Sélectionner les conseils qui vous intéressent
          </Text>
        </View>

        {/* Tips Grid */}
        <ScrollView contentContainerStyle={styles.tipsGrid}>
          <View style={styles.grid}>
            {tips.map((tip) => (
              <TouchableOpacity
                key={tip.id}
                onPress={() => toggleTip(tip.id)}
                style={styles.tipButton}
              >
                <Image
                  source={
                    selectedTips.has(tip.id) ? tip.activeImage : tip.image
                  }
                  style={[
                    styles.tipImage,
                    selectedTips.has(tip.id) && styles.tipImageSelected,
                  ]}
                  resizeMode="contain"
                />
                <Text style={styles.tipLabel}>{tip.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
        </ScrollView>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {!loading ? "Valider" : "Sauvegarde en cours..."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Exemple de custom-brown
  },
  header: {
    margin: 5,
    paddingVertical: 40,
    alignItems: "center",
    backgroundColor: "#ffeda3",
  },
  Radius: {
    flex: 1,
    backgroundColor: "#ffeda3",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "ClashDisplayBold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    fontFamily: "ArchivoLightItalic",
  },
  tipsGrid: {
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tipButton: {
    width: "45%",
    alignItems: "center",
    marginVertical: 10,
  },
  tipImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
  },
  tipImageSelected: {
    transform: [{ scale: 1.05 }],
  },
  tipLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#f19953",
    fontFamily: "ArchivoBold",
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#f97316",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontFamily: "ArchivoBold",
    fontSize: 16,
  },
});

export default TipSettings;
