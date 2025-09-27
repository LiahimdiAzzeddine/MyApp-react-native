// HomeScreen.tsx
import { MenuButton } from "@/components/game/MenuButton";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useRouter();
  const onGo = (route: any) => () => navigation?.push?.(route);

  return (
    <SafeAreaView className="flex-1 bg-[#F7E9AE]" edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo */}
        <Image
          source={require("@/assets/images/game/tico_quiz.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Sous-titre */}
        <Text style={styles.subtitle}>
          Testez vos connaissances{"\n"}et détectez la vérité !
        </Text>

        {/* Profil */}
        <View style={styles.profileWrap}>
          <View style={styles.profileShadow}>
            <View style={styles.profileRingOuter}>
              <View style={styles.profileRingInner}>
                <Image
                  source={require("@/assets/images/game/tico_quiz.png")} // ton icône renard
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View style={styles.profileLabelWrap}>
            <Text style={styles.profileLabel}>PROFIL</Text>
          </View>
        </View>

        {/* Boutons */}
        <MenuButton label="info ou pipeau" onPress={onGo("/game/MultiplayerHomeScreen")} />
        <MenuButton label="Ti'Quiz" onPress={onGo("TiQuiz")} />
        <MenuButton label="Daily Challenge" onPress={onGo("DailyChallenge")} />
        <MenuButton label="Rejoindre une salle" onPress={onGo("JoinRoom")} />
      </ScrollView>

      {/* bouton fixé en bas */}
      <View style={styles.bottomWrap}>
        <MenuButton label="📖  Rules / Tutorial" large onPress={onGo("Rules")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.32,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: Colors.page.subtitle,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
    textShadowColor: "rgba(255,255,255,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 12,
  },

  profileText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  profileWrap: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileShadow: {
    // ombre « douce »
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  profileRingOuter: {
    width: 68,
    height: 68,
    borderRadius: 999,
    backgroundColor: "#F2C66E",   // or
    borderWidth: 2,
    borderColor: "#B88733",       // ombre d’or
    alignItems: "center",
    justifyContent: "center",
  },
  profileRingInner: {
    width: 55,
    height: 55,
    borderRadius: 999,
    backgroundColor: "#FFD98A",
    borderWidth: 2,
    borderColor: "#FFF0C9",
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    width: 38,
    height: 38,
  },
  profileLabelWrap: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 10,
  },
  profileLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#1b1b1b",
  },
  bottomWrap: {
    paddingVertical: 12,
    alignItems: "center",
  },
});
