import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { storePreferences, getPreferences } from "@/utils/storage";
import { AuthContext } from "@/context/AuthContext";

const DIET_OPTIONS = {
  ALL: "Aucun régime spécial",
  V: "Végétarien",
  VG: "Végan",
  GF: "Sans gluten",
  LF: "Sans lactose",
  EF: "Sans oeufs",
};

const ALLERGEN_OPTIONS = {
  AR: "Arachides",
  CE: "Céleri",
  CR: "Crustacés",
  FQ: "Fruits à coque",
  GL: "Gluten",
  LA: "Lait",
  LU: "Lupin",
  ML: "Mollusques",
  MT: "Moutarde",
  OE: "Oeufs",
  PO: "Poissons",
  SE: "Sésame",
  SJ: "Soja",
  SU: "Sulfites",
};



const RecipeSettings: React.FC = () => {
  const authUser = useContext(AuthContext);
  const userId = authUser.userInfo?.id;
  const [values, setValues] = useState({
    regime: [] as string[],
    allergen: [] as string[],
  });
  const [error, setError] = useState<{ regime?: string | null }>({});

  const addFilter = (category: "regime" | "allergen", key: string) => {
    setValues((prev) => {
      const currentValues = prev[category];

      if (category === "regime") {
        if (key === "ALL") {
          return { ...prev, [category]: ["ALL"] };
        } else {
          if (currentValues.includes("ALL")) {
            return { ...prev, [category]: [key] };
          }

          if (key === "V") {
            const updated = currentValues.includes("VG")
              ? currentValues.filter((item) => item !== "VG")
              : currentValues;
            return {
              ...prev,
              [category]: updated.includes("V")
                ? updated.filter((item) => item !== "V")
                : [...updated, "V"],
            };
          } else if (key === "VG") {
            const updated = currentValues.includes("V")
              ? currentValues.filter((item) => item !== "V")
              : currentValues;
            return {
              ...prev,
              [category]: updated.includes("VG")
                ? updated.filter((item) => item !== "VG")
                : [...updated, "VG"],
            };
          }

          const updated = currentValues.includes(key)
            ? currentValues.filter((item) => item !== key)
            : [...currentValues, key];

          return { ...prev, [category]: updated };
        }
      }

      const updated = currentValues.includes(key)
        ? currentValues.filter((item) => item !== key)
        : [...currentValues, key];
      return { ...prev, [category]: updated };
    });
  };

  const handleSubmit = async () => {
    try {
      if (!values.regime.length) {
        setError({ regime: "Veuillez sélectionner au moins un régime." });
        return;
      } else {
        setError({ regime: null });
      }

      await storePreferences(String(userId), values);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la sauvegarde des préférences. Veuillez réessayer."
      );
    } finally {
      
    }
  };
 
  useEffect(() => {
    const loadPreferences = async () => {
      const stored = await getPreferences(String(userId));
      if (stored) {
        setValues(stored);
      }
    };
    loadPreferences();
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
          <Text style={styles.subTitle} className="text-custom-text-orange">
            Sélectionner les conseils qui vous intéressent
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.section}>
            <Text style={styles.label}>Mon régime :</Text>
            <View style={styles.buttonGroup}>
              {Object.entries(DIET_OPTIONS).map(([key, label]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.optionButton,
                    values.regime.includes(key) && styles.selected,
                  ]}
                  onPress={() => addFilter("regime", key)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      values.regime.includes(key) && styles.selectedText,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {error.regime && <Text style={styles.error}>{error.regime}</Text>}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Allergènes à éviter :</Text>
            <View style={styles.buttonGroup}>
              {Object.entries(ALLERGEN_OPTIONS).map(([key, label]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.optionButton,
                    values.allergen.includes(key) && styles.selected,
                  ]}
                  onPress={() => addFilter("allergen", key)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      values.allergen.includes(key) && styles.selectedText,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Valider</Text>
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
    backgroundColor: "#fdf2f0",
  },
  title: {
    fontSize: 22,
    color: "#d0021b",
    fontFamily: "ClashDisplayBold",
    textAlign: "center",
  },
  Radius: {
    flex: 1,
    backgroundColor: "#fdf2f0",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  subTitle: {
    fontSize: 14,
    marginTop: 6,
    color: "#d0021b",
    fontFamily: "ArchivoLightItalic",
  },

  scroll: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#d0021b",
    marginBottom: 12,
    fontFamily: "ArchivoLight",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d0021b",
    backgroundColor: "#fff",
    margin: 1,
  },
  selected: {
    backgroundColor: "#d0021b",
    borderColor: "#d0021b",
  },
  optionText: {
    color: "#d0021b",
    fontSize: 14,
  },
  selectedText: {
    color: "#fff",
  },
  error: {
    color: "#d0021b",
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#d0021b",
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

export default RecipeSettings;
