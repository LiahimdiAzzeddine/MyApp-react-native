// JoinGameScreen.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#F7E9AE",
  panel: "#FFF4DA",
  card: "#FFFFFF",
  border: "#E9DCC2",
  purple: "#7B3FE4",
  purpleSoft: "#E8DAFF",
  blue: "#0F548D",
  blueDark: "#083F6A",
  text: "#111111",
  sub: "#6B7280",
  shadow: "#000",
};

export default function JoinGameScreen({ navigation }: any) {
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");

  // formatage du code lobby: 6 chars alphanum en MAJ
  const onChangeCode = (t: string) => {
    const cleaned = t.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6);
    setCode(cleaned);
  };

  const isValid = code.length === 6 && name.trim().length >= 2;

  const onJoin = () => {
    if (!isValid) return;
    // branche ici ton appel réseau / navigation
    navigation?.navigate?.("Lobby", { code, name });
    // ou Alert.alert("Join", `code=${code}, name=${name}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={require("@/assets/images/game/tico_quiz.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Panel form */}
          <View style={styles.panel}>
            <Text style={styles.title}>Join a Game</Text>
            <Text style={styles.subtitle}>Enter the lobby code and your name</Text>

            {/* Lobby Code */}
            <Text style={styles.label}>Lobby Code</Text>
            <TextInput
              value={code}
              onChangeText={onChangeCode}
              style={[styles.input, { textAlign: "center" }]}
              placeholder="ABC123"
              placeholderTextColor="#B7AFC6"
              keyboardType={Platform.OS === "ios" ? "ascii-capable" : "visible-password"}
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={6}
              returnKeyType="next"
            />

            {/* Your Name */}
            <Text style={[styles.label, { marginTop: 12 }]}>Your Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#B7AFC6"
              autoCapitalize="words"
              returnKeyType="done"
            />

            {/* Player preview chip */}
            <LinearGradient
              colors={["#EEDBFF", "#FFE4F3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.previewChip}
            >
              <View style={styles.previewAvatar}>
                <Text style={{ fontSize: 20 }}>🎮</Text>
              </View>
              <Text style={styles.previewName} numberOfLines={1}>
                {name || "Player"}
              </Text>
            </LinearGradient>
          </View>

          {/* CTA */}
          <View style={{ height: 16 }} />
          <View style={styles.shadowWrap}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onJoin}
              disabled={!isValid}
            >
              <View style={[styles.primaryBtn, !isValid && { opacity: 0.5 }]}>
                <Text style={styles.primaryText}>Rejoindre le jeu</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------------------------- Styles ---------------------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  logo: {
    width: width * 0.45,
    height: width * 0.22,
    marginTop: 12,
    marginBottom: 8,
  },

  panel: {
    width: width * 0.94,
    backgroundColor: COLORS.panel,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
  },
  title: {
    textAlign: "center",
    color: COLORS.purple,
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    textAlign: "center",
    color: "#A08DD9",
    marginTop: 4,
    marginBottom: 10,
  },

  label: {
    color: COLORS.purple,
    fontWeight: "700",
    marginBottom: 6,
    marginLeft: 6,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.purpleSoft,
    backgroundColor: COLORS.card,
    paddingHorizontal: 14,
    color: COLORS.text,
  },

  previewChip: {
    marginTop: 14,
    alignSelf: "center",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  previewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D8B6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  previewName: {
    color: COLORS.purple,
    fontWeight: "800",
    maxWidth: width * 0.6,
  },

  shadowWrap: {
    width: width * 0.9,
    borderRadius: 14,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  primaryBtn: {
    backgroundColor: COLORS.blue,
    borderRadius: 14,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
