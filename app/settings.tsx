import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import NetInfo from "@react-native-community/netinfo"; // 👈 Import pour la connexion internet
import { AuthContext } from "@/context/AuthContext";
import * as Notifications from "expo-notifications";
import { Bell} from 'lucide-react-native';

export default function SettingsPage() {
  const { userInfo, logout } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const router = useRouter();
   const getBadgeCount = async () => {
      const count = await Notifications.getBadgeCountAsync();
      setBadgeCount(count);
      return count;
    
    return 0;
  };

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected === true);
    });

    return () => unsubscribe();
  }, []);
 

  useFocusEffect(
  useCallback(() => {
    getBadgeCount();
  }, [])
);
  

  const triggerHaptic = async () => {
    if (Platform.OS !== "web") {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // Haptics non supporté
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
        {isAuthenticated ? (
          <TouchableOpacity
            style={[
            styles.button,
            { backgroundColor: isOnline ? "#FF8200" : "#FF8200" }, // couleur différente si désactivé
          ]}
            className="w-3/4 rounded-xl"
            onPress={() => router.push("/settingsPage/personalInfo")}
          >
            <Text style={styles.buttonText}>Mes informations</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
            styles.button,
            { backgroundColor: isOnline ? "#FF8200" : "#c6c5b9" }, // couleur différente si désactivé
          ]}
          disabled={!isOnline} // désactive le bouton si offline
            className="w-3/4 rounded-xl"
            onPress={() =>
              handlePress(() => {
                router.push("/(auth)/register");
              })
            }
          >
            <Text style={styles.buttonText}>Je crée mon compte</Text>
          </TouchableOpacity>
        )}

        {/* ✅ Bouton notifications visible uniquement si connecté à Internet */}
      <TouchableOpacity
  style={[
    styles.button,
    { backgroundColor: isOnline ? "#0F548D" : "#0F548D" },
  ]}
  className="w-3/4 rounded-xl"
  onPress={() =>
    handlePress(() => {
      router.push("/settingsPage/UnreadNotificationsPage");
    })
  }
>
  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
    <Text style={styles.buttonText}>Notif. récentes</Text>

    {badgeCount > 0 && (
      <View style={styles.bellContainer}>
        <Bell size={20} color="#fff" />
        <View style={styles.redDot} />
      </View>
    )}
  </View>
</TouchableOpacity>

        <TouchableOpacity
         style={[
            styles.button,
            { backgroundColor: isOnline ? "#0F548D" : "#c6c5b9" }, // couleur différente si désactivé
          ]}
          disabled={!isOnline} // désactive le bouton si offline
          className="w-3/4 rounded-xl"
          onPress={() =>
            handlePress(() => {
              router.push("/settingsPage/contact");
            })
          }
        >
          <Text style={styles.buttonText}>Nous contacter</Text>
        </TouchableOpacity>

        <TouchableOpacity
           style={[
            styles.button,
            { backgroundColor: isOnline ? "#0F548D" : "#c6c5b9" }, // couleur différente si désactivé
          ]}
          disabled={!isOnline} // désactive le bouton si offline
          className="w-3/4 rounded-xl"
          onPress={() =>
            handlePress(() => {
              router.push("/settingsPage/fqas");
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
              router.push("/settingsPage/inviteTico");
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
             style={[
            styles.buttonLogin,
            { backgroundColor: isOnline ? "#FF8200" : "#c6c5b9" }, // couleur différente si désactivé
          ]}
          disabled={!isOnline} // désactive le bouton si offline
            className="w-2/4 rounded-xl"
            onPressIn={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() =>
            handlePress(() => {
              router.push("/settingsPage/CGUConfidentiality");
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
    marginBottom: 20,
  },
  authSection: {
    marginTop: 10,
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
    marginTop: 12,
  },
  badgeContainer: {
  marginLeft: 8,
  position: "relative",
},
badge: {
  position: "absolute",
  top: -6,
  right: -10,
  backgroundColor: "red",
  borderRadius: 8,
  paddingHorizontal: 5,
  paddingVertical: 1,
  minWidth: 16,
  alignItems: "center",
  justifyContent: "center",
},

bellContainer: {
  marginLeft: 8,
  position: "relative",
},
redDot: {
  position: "absolute",
  top: -2,
  right: -1,
  width: 9,
  height: 9,
  borderRadius: 4,
  backgroundColor: "red",
},


});
