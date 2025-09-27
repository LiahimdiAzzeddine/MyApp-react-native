// PlayersSetupScreen.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const COLORS = {
  bgTop: "#F3F2FF",
  bgBottom: "#FFEFF7",
  card: "#FFFFFF",
  purple: "#7B3FE4",
  purpleSoft: "#D8C7FF",
  pink: "#FF4DA0",
  magenta: "#C44DFF",
  green1: "#00C86B",
  green2: "#00E08F",
  textDark: "#2A2A2A",
  shadow: "#000",
};

export default function PlayersSetupScreen({ navigation }: any) {
  const MIN = 3;
  const MAX = 10;
  const [players, setPlayers] = React.useState(3);

  const inc = () => setPlayers((n) => Math.min(MAX, n + 1));
  const dec = () => setPlayers((n) => Math.max(MIN, n - 1));

  const onCreate = () =>
    navigation?.navigate?.("CreateGame", { players }) ??
    console.log("Create with", players);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Background gradient */}
      <LinearGradient
        colors={[COLORS.bgTop, COLORS.bgBottom]}
        style={styles.bg}
      />

      <View style={styles.container}>
        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Number of Players</Text>
          <Text style={styles.subtitle}>Choose between 3–10 players</Text>

          <View style={styles.counterRow}>
            <OutlineIcon onPress={dec} disabled={players <= MIN}>
              {"−"}
            </OutlineIcon>

            <LinearGradient
              colors={[COLORS.magenta, COLORS.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.counterPill}
            >
              <Text style={styles.counterText}>{players}</Text>
            </LinearGradient>

            <OutlineIcon onPress={inc} disabled={players >= MAX}>
              {"+"}
            </OutlineIcon>
          </View>

          {/* Dots / steps */}
          <View style={styles.dotsRow}>
            <SmallDot label="1" active />
            <SmallDot label="2" />
            <SmallDot label="3" />
          </View>
        </View>

        {/* Primary CTA */}
        <ShadowWrap width={width * 0.9} radius={18}>
          <PrimaryButton label="🎯  Create Game" onPress={onCreate} />
        </ShadowWrap>
      </View>
    </SafeAreaView>
  );
}

/* ---------------------- Sub-components ---------------------- */

function OutlineIcon({
  children,
  onPress,
  disabled,
}: {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.outlineBtn,
        disabled && { opacity: 0.4, borderColor: "#E8DFFF" },
      ]}
    >
      <Text style={styles.outlineIcon}>{children}</Text>
    </TouchableOpacity>
  );
}

function SmallDot({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <LinearGradient
      colors={
        active ? [COLORS.magenta, COLORS.pink] : ["#F5E9FF", "#FCEBFA"]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.smallDot}
    >
      <Text style={[styles.smallDotText, active && { color: "#fff" }]}>{label}</Text>
    </LinearGradient>
  );
}

function ShadowWrap({
  children,
  width,
  radius,
}: {
  children: React.ReactNode;
  width: number;
  radius: number;
}) {
  return (
    <View
      style={{
        width,
        borderRadius: radius,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
        backgroundColor: "transparent",
      }}
    >
      {children}
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const inFn = () =>
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 6,
      tension: 150,
    }).start();
  const outFn = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 150,
    }).start();

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} onPressIn={inFn} onPressOut={outFn}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient
          colors={[COLORS.green1, COLORS.green2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryBtn}
        >
          <Text style={styles.primaryText}>{label}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

/* --------------------------- Styles --------------------------- */

const CARD_RADIUS = 18;

const styles = StyleSheet.create({
  bg: { ...StyleSheet.absoluteFillObject },
  container: {
    flex: 1,
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 28,
  },

  card: {
    width: width * 0.92,
    backgroundColor: COLORS.card,
    borderRadius: CARD_RADIUS,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: "center",
    // shadow
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },

  title: {
    color: COLORS.purple,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  subtitle: {
    color: "#9A7FDB",
    fontSize: 13,
    marginBottom: 18,
  },

  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.7,
    marginBottom: 16,
  },

  outlineBtn: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.purpleSoft,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  outlineIcon: {
    color: COLORS.purple,
    fontSize: 24,
    fontWeight: "700",
  },

  counterPill: {
    width: 72,
    height: 72,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    color: COLORS.textDark,
    fontSize: 28,
    fontWeight: "700",
  },

  dotsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  smallDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  smallDotText: {
    color: "#B080E8",
    fontSize: 12,
    fontWeight: "700",
  },

  primaryBtn: {
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
});
