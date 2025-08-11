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


const logo = require("@/assets/images/headers/tico.png");
// Pour l’icône info, assure-toi d’avoir un PNG ou utilise react-native-svg
const infoIcon = require("@/assets/images/headers/info.png");

export default function ScanHeader() {
  const router = useRouter();



  const goToSettings = () => {
    router.push('/settings');
  };

  const onInfoPress = () => {
    router.push('/settingsPage/fqas');
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
    paddingLeft:16,
    paddingRight:12,
   height:40,
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
