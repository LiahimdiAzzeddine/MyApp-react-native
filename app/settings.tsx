import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { AuthContext } from "@/context/AuthContext";

export default function SettingsPage() {
  const { userInfo, logout } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;
  const router = useRouter();

  const triggerHaptic = async () => {
    if (Platform.OS !== "web") {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // Haptics not supported
      }
    }
  };

  const handlePress = (action: () => void) => {
    triggerHaptic();
    action();
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {/** 
        <Text style={styles.title}>Mon compte</Text>*/}

        {isAuthenticated ? (
          <TouchableOpacity
            style={styles.button}
            className="bg-custom-text-orange w-3/4 rounded-xl"
            onPress={() =>
             router.push("/settingsPage/personalInfo")
            }
          >
            <Text style={styles.buttonText}>Mes informations</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            className="bg-custom-text-orange w-3/4 rounded-xl"
            onPress={() =>
              handlePress(() => {
                router.push("/(auth)/register")
              })
            }
          >
            <Text style={styles.buttonText}>Je crée mon compte</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          className="bg-custom-blue w-3/4 rounded-xl"
          onPress={() =>
            handlePress(() => {
              router.push("/settingsPage/contact")
            })
          }
        >
          <Text style={styles.buttonText}>Nous contacter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          className="bg-custom-blue w-3/4 rounded-xl"
          onPress={() =>
            handlePress(() => {
               router.push("/settingsPage/fqas")
            })
          }
        >
          <Text style={styles.buttonText}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          className="bg-custom-blue w-3/4 rounded-xl"
          onPress={() =>
            handlePress(() => {
              router.push("/settingsPage/inviteTico")
            })
          }
        >
          <Text style={styles.buttonText}>Faire connaître TiCO</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.authSection]}>
        {isAuthenticated ? (
          <TouchableOpacity
            style={styles.buttonLogout}
            className="bg-custom-text-orange w-2/4 rounded-xl"
            onPressIn={() => handlePress(() => logout())}
          >
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonLogin}
            className="bg-custom-text-orange w-2/4 rounded-xl"
            onPressIn={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() =>
            handlePress(() => {
             router.push("/settingsPage/CGUConfidentiality")
            })
          }
        >
          <Text style={styles.link}>CGU - Confidentialité</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffeda3",
    flexGrow: 1,
    justifyContent: "space-around",
  },
  section: {
    alignItems: "center",
    marginBottom: 20, // Réduit l'espace entre les sections
  },
  authSection: {
    marginTop: 10, // Réduit l'espace entre les sections
  },
  title: {
    fontSize: 24,
    color: "#007AFF",
    marginBottom: 12, // Espacement plus compact
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 6,
    alignItems: "center",
  },
  buttonLogout: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  buttonLogin: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Archivo",
  },
  link: {
    color: "#FF9500",
    textDecorationLine: "underline",
    marginTop: 12, // Espacement réduit pour le lien
  },
});
