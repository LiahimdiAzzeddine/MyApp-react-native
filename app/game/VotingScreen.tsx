// VotingScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#F7E9AE",
  white: "#FFFFFF",
  card: "#FFF8E5",
  cardBorder: "#F0E1B8",
  title: "#0E0E0E",
  sub: "#6B7280",
  purple: "#7B3FE4",
  purpleSoft: "#E8DAFF",
  grayBar: "#ECE7DA",
  grayBarEdge: "#C9C1A9",
  red: "#F24A4A",
  green: "#15B676",
  greenDark: "#0A8C5A",
  blue: "#0F548D",
  shadow: "#000",
};

const VOTE_SECONDS = 30;
const TOTAL_VOTERS = 4;

export default function VotingScreen() {
  const statement =
    "Le miel ne se périme pas et peut se conserver indéfiniment s’il est stocké correctement.";

  const [myVote, setMyVote] = React.useState<"info" | "pipeau" | null>(null);
  const [votedCount, setVotedCount] = React.useState(0);

  const onVote = (choice: "info" | "pipeau") => {
    if (myVote) return; // un seul vote
    setMyVote(choice);
    setVotedCount((c) => Math.min(TOTAL_VOTERS, c + 1));
  };

  const accuse = (type: "lobbyist" | "influencer") => {
    Alert.alert(
      "Accusation",
      type === "lobbyist"
        ? "Vous accusez un joueur d’avoir joué une carte LOBBYISTE."
        : "Vous accusez un joueur d’avoir joué une carte INFLUENCEUR."
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 22 }}>
        {/* Bandeau joueur en haut */}
        <View style={styles.turnStrip}>
          <View style={styles.turnLeft}>
            <View style={styles.avatar}><Text style={{ fontSize: 16 }}>🦊</Text></View>
            <Text style={styles.turnName}>PLAYER 2</Text>
          </View>
          <View style={styles.pointsBadge}>
            <Text style={{ fontSize: 16 }}>🏆</Text>
            <Text style={styles.pointsText}>0 POINT</Text>
          </View>
        </View>

        {/* Titre */}
        <Text style={styles.pageTitle}>VOTE</Text>

        {/* Carte Timer */}
        <View style={styles.timerCard}>
          <View style={styles.timerHeaderRow}>
            <Text style={styles.timerHeaderLeft}>⏰  Temps restant</Text>
            <CountdownMMSS seconds={VOTE_SECONDS} />
          </View>
          <CountdownBar seconds={VOTE_SECONDS} color={COLORS.red} />
        </View>

        {/* Progression du vote */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progression du vote</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>{votedCount}/{TOTAL_VOTERS}</Text>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <ProgressTrack ratio={votedCount / TOTAL_VOTERS} />
          </View>

          {/* Avatars (exemple) */}
          <View style={styles.iconsRow}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.iconBubble,
                  i < votedCount && { backgroundColor: "#D6F6E9", borderColor: "#A6E9D2" },
                ]}
              >
                <Text>{["🎮", "🚀", "🎯", "⚡"][i]}</Text>
              </View>
            ))}
          </View>

          {/* Affirmation */}
          <LinearGradient
            colors={["#F6F9FF", "#F8F6FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statementBox}
          >
            <Text style={styles.statementText} numberOfLines={5}>
              {statement}
            </Text>
          </LinearGradient>
        </View>

        {/* Bloc choix INFO / PIPEAU */}
        <View style={styles.choiceCard}>
          <Text style={styles.choiceTitle}>Cette affirmation est-elle vraie ou fausse ?</Text>

          <View style={styles.choiceRow}>
            <ChoiceButton
              labelTop="✓"
              label="INFO"
              labelBottom="Vrai"
              color={COLORS.green}
              active={myVote === "info"}
              onPress={() => onVote("info")}
            />
            <ChoiceButton
              labelTop="✕"
              label="PIPEAU"
              labelBottom="Faux"
              color={COLORS.red}
              active={myVote === "pipeau"}
              onPress={() => onVote("pipeau")}
              outlined
            />
          </View>
        </View>

        {/* Accusations spéciales */}
        <View style={styles.accuseCard}>
          <Text style={styles.accuseTitle}>⚠️  Accusations spéciales</Text>
          <Text style={styles.accuseText}>
            Vous pensez que quelqu’un a joué une carte <Text style={{ fontWeight: "800" }}>LOBBYISTE</Text> ou{" "}
            <Text style={{ fontWeight: "800" }}>INFLUENCEUR</Text> ? Faites une accusation pour gagner des points bonus !
          </Text>

          <View style={styles.accuseRow}>
            <OutlinePill text="Accuser un lobbyiste" onPress={() => accuse("lobbyist")} />
            <OutlinePill text="Accuser un influenceur" onPress={() => accuse("influencer")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===================== Sous-composants ===================== */

function CountdownMMSS({ seconds }: { seconds: number }) {
  const [remain, setRemain] = React.useState(seconds);

  React.useEffect(() => {
    const t = setInterval(() => {
      setRemain((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const mm = Math.floor(remain / 60).toString().padStart(2, "0");
  const ss = (remain % 60).toString().padStart(2, "0");
  return <Text style={styles.timerRight}>{mm}:{ss}</Text>;
}

function CountdownBar({ seconds, color }: { seconds: number; color: string }) {
  const anim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    anim.setValue(1);
    Animated.timing(anim, { toValue: 0, duration: seconds * 1000, useNativeDriver: false }).start();
  }, [seconds]);

  const widthInterpolate = anim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <View style={styles.barOuter}>
      <Animated.View style={[styles.barFill, { width: widthInterpolate, backgroundColor: color }]} />
    </View>
  );
}

function ProgressTrack({ ratio }: { ratio: number }) {
  return (
    <View style={styles.trackOuter}>
      <View style={[styles.trackFill, { width: `${Math.min(100, Math.max(0, ratio * 100))}%` }]} />
    </View>
  );
}

function ChoiceButton({
  labelTop,
  label,
  labelBottom,
  color,
  active,
  outlined,
  onPress,
}: {
  labelTop: string;
  label: string;
  labelBottom: string;
  color: string;
  active?: boolean;
  outlined?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{ flex: 1 }}>
      <View
        style={[
          styles.choiceBtn,
          outlined
            ? { borderColor: color, borderWidth: 2, backgroundColor: "#fff" }
            : { borderColor: color, borderWidth: 2, backgroundColor: "#F2FFF8" },
          active && { shadowColor: COLORS.shadow, shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
        ]}
      >
        <Text style={[styles.choiceTop, { color }]}>{labelTop}</Text>
        <Text style={[styles.choiceMid, { color }]}>{label}</Text>
        <Text style={[styles.choiceBot, { color }]}>{labelBottom}</Text>
      </View>
    </TouchableOpacity>
  );
}

function OutlinePill({ text, onPress }: { text: string; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.pillBtn}>
      <Text style={styles.pillTxt}>{text}</Text>
    </TouchableOpacity>
  );
}

/* =========================== Styles =========================== */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 12 },
  pageTitle: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 8,
    color: COLORS.title,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  /* top strip */
  turnStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  turnLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  avatar: {
    width: 28, height: 28, borderRadius: 8, backgroundColor: "#FFE2B2",
    alignItems: "center", justifyContent: "center",
  },
  turnName: { fontWeight: "900", color: COLORS.title },
  pointsBadge: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "#F4EAD3", paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: "#E3D3B2",
  },
  pointsText: { fontWeight: "900", color: COLORS.title },

  /* Timer card */
  timerCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    marginBottom: 12,
  },
  timerHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  timerHeaderLeft: { color: COLORS.purple, fontWeight: "800" },
  timerRight: { color: COLORS.purple, fontWeight: "900", fontSize: 18 },
  barOuter: {
    height: 10, backgroundColor: COLORS.grayBar, borderRadius: 8, borderWidth: 1,
    borderColor: COLORS.grayBarEdge, overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 8 },

  /* Progress card */
  progressCard: {
    backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 1,
    borderColor: COLORS.cardBorder, padding: 12, marginBottom: 12,
  },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  progressTitle: { color: COLORS.purple, fontWeight: "800" },
  badge: { backgroundColor: COLORS.purpleSoft, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  badgeTxt: { color: COLORS.purple, fontWeight: "900", fontSize: 12 },
  trackOuter: { height: 10, backgroundColor: "#F2F2F4", borderRadius: 8, overflow: "hidden", marginBottom: 10 },
  trackFill: { height: "100%", backgroundColor: "#C8B8FF" },
  iconsRow: { flexDirection: "row", alignSelf: "center", gap: 10, marginBottom: 10 },
  iconBubble: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: "#F3F3F5", borderWidth: 1, borderColor: "#E5E5EA",
    alignItems: "center", justifyContent: "center",
  },
  statementBox: { borderRadius: 12, paddingVertical: 16, paddingHorizontal: 12 },
  statementText: { color: COLORS.title, textAlign: "center", fontSize: 15, lineHeight: 21 },

  /* Choix */
  choiceCard: {
    backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 1,
    borderColor: COLORS.cardBorder, padding: 12, marginBottom: 12,
  },
  choiceTitle: { color: COLORS.purple, fontWeight: "800", marginBottom: 10, textAlign: "center" },
  choiceRow: { flexDirection: "row", gap: 10 },

  choiceBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  choiceTop: { fontSize: 16, fontWeight: "900" },
  choiceMid: { fontSize: 18, fontWeight: "900", letterSpacing: 0.4 },
  choiceBot: { fontSize: 12, fontWeight: "700" },

  /* Accusations */
  accuseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  accuseTitle: { color: "#B45309", fontWeight: "900", marginBottom: 8 },
  accuseText: { color: COLORS.sub, marginBottom: 12 },
  accuseRow: { flexDirection: "row", gap: 10 },
  pillBtn: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#F5C58B",
    backgroundColor: "#FFF4E6",
    paddingVertical: 12,
    alignItems: "center",
  },
  pillTxt: { color: "#B45309", fontWeight: "800" },
});
