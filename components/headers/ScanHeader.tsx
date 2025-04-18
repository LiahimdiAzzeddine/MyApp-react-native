import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { showAlert } from "@/utils/alert";

const logo = require("@/assets/images/headers/tico.png");
// Pour l’icône info, assure-toi d’avoir un PNG ou utilise react-native-svg
const infoIcon = require("@/assets/images/headers/info.png");

export default function ScanHeader() {
  const [showFAQ, setShowFAQ] = useState(false);
  const router = useRouter();

  const triggerHaptic = async () => {
    if (Platform.OS !== "web") {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // pas supporté
      }
    }
  };

  const goToSettings = () => {
    triggerHaptic();
    router.push('/settings');
  };

  const onInfoPress = () => {
    triggerHaptic();
    setShowFAQ(true);
  };

  const onProductInfo = () => {
    showAlert(
      "Nous travaillons activement sur cette fonctionnalité. Elle sera bientôt disponible.",
      "Info",
      () => console.log("Alerte fermée"),
      "Compris",
      false
    );
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={goToSettings}
            accessibilityLabel="Aller aux paramètres"
          >
            <View style={styles.bullets}>
              <View style={[styles.bullet, { backgroundColor: "#0F548D" }]} />
              <View style={[styles.bullet, { backgroundColor: "#0F548D" }]} />
              <View style={[styles.bullet, { backgroundColor: "#0F548D" }]} />
            </View>
            <Image source={logo} style={styles.logo} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={onInfoPress}
            accessibilityLabel="Ouvrir la FAQ"
          >
            <Image source={infoIcon} style={styles.infoIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingTop:10,
    paddingBottom:8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bullets: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 8,
    height: 25,
  },
  bullet: {
    width: 6.5,
    height: 6.5,
    borderRadius: "100%",
  },
  logo: {
    width:60,
    height: 23,
    resizeMode: "stretch",
  },
  infoIcon: {
    width: 30,
    height: 31,
    resizeMode: "stretch",
  },
});
