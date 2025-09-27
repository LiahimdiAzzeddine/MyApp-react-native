// MultiplayerHomeScreen.tsx
import { MenuButton } from "@/components/game/MenuButton";
import ShadowWrap from "@/components/game/ShadowWrap";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const COLORS = {
  bg: "#F7E9AE",        // fond jaune pâle
  panel: "#FFF4DA",     // carte centrale
  primary: "#0F548D",   // bleu bouton
  primaryDark: "#083F6A",
  white: "#FFFFFF",
  shadow: "#000",
};

export default function MultiplayerHomeScreen() {
  const navigation = useRouter();
  const go = (route: any) => () => navigation?.navigate?.(route);

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      {/* --- Scoreboard --- */}

      <View style={styles.container}>
        {/* --- TOP: Logo --- */}
        <Image
          source={require("@/assets/images/game/tico_quiz.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* --- MIDDLE: Panel avec 2 boutons --- */}
        <ShadowWrap radius={14} width={width * 0.94}>
          <View style={styles.scoreCard}>

            <MenuButton label="Créer une salle" onPress={() => { navigation.push("/game/PlayersNumberScreen") }} large={true} />
            <MenuButton label="Rejoindre une salle" onPress={() => { navigation.push('/game/JoinGameScreen') }} large={true} />
          </View>
        </ShadowWrap>

        {/* --- BOTTOM: Rules --- */}
        <MenuButton
          label="📖  Rules / Tutorial"
          onPress={go("Rules")}
        />
      </View>
    </SafeAreaView>
  );
}


/* ------------------------------ Styles ------------------------------ */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between", // top / middle / bottom
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  logo: {
    width: width * 0.45,
    height: width * 0.22,
    marginTop: height * 0.02,
  },


  // Parent d’ombre pour les boutons
  shadowWrap: {
    width: width * 0.8,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.28,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  shadowWrapSmall: {
    width: width * 0.78,
    borderRadius: 14,
  },
  scoreCard: {
    backgroundColor: Colors.page.card, borderRadius: 14, borderWidth: 1, borderColor: Colors.page.cardBorder, padding: 12, alignItems: 'center'
  },
});

