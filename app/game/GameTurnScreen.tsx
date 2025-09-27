// GameTurnScreen.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Animated,
  ColorValue,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#F7E9AE",
  card: "#FFF8E5",
  cardBorder: "#F0E1B8",
  deepBlue: "#0F548D",
  deepBlueDark: "#083F6A",
  title: "#0E0E0E",
  sub: "#3b3b3b",
  shadow: "#000",
  green1: "#00C26D",
  green2: "#7FE38B",
  blueBtn: "#1463A5",
  red: "#FF3B2F",
  // cartes
  greenCard: ["#21B56A", "#1C9E5C"],
  orangeCard: ["#FF8A1F", "#F46B10"],
  blueCard: ["#1CA0E0", "#0D78C5"],
  white: "#FFFFFF",
};

type Player = { id: string; name: string; points: number; hp: number; emoji?: string };
type Card = {
  id: string;
  family: "green" | "orange" | "blue";
  title: string;
  answer: "Info" | "pipeau";
  bonusText: string;
  foot?: string;
  description: string;
};

const TARGET_POINTS = 21;
const TURN_SECONDS = 30;

/* ---------- mock data ---------- */
const PLAYERS: Player[] = [
  { id: "p1", name: "PLAYER 1", points: 0, hp: 0.6, emoji: "🧠" },
  { id: "p2", name: "PLAYER 2", points: 0, hp: 0.5, emoji: "🦊" },
];

const SAMPLE_CARDS: Card[] = [
  {
    id: "c1",
    family: "green",
    title: "Maltodextrine c’est du sucre",
    answer: "Info",
    bonusText: "+1",
    description:
      "La maltodextrine est un saccharide à IG élevé dérivé de l’amidon. Utilisée comme épaississant et pour l’énergie rapide.",
  },
  {
    id: "c2",
    family: "orange",
    title: "Lobbyiste",
    answer: "pipeau",
    bonusText: "+2",
    foot: "25",
    description: "Bonus +2 points pour le lecteur si la majorité vote incorrecte.",
  },
  {
    id: "c3",
    family: "blue",
    title: "“Riche en vitamines” = santé",
    answer: "pipeau",
    bonusText: "+1",
    description:
      "Une allégation ‘riche en’ ne garantit pas la qualité globale. Toujours lire l’étiquette.",
  },
  {
    id: "c4",
    family: "orange",
    title: "Influenceur",
    answer: "pipeau",
    bonusText: "+2",
    foot: "25",
    description: "Bonus +2 points pour le lecteur si vote comme majorité.",
  },
];

/* =============================================================== */

export default function GameTurnScreen() {
  const [players] = React.useState<Player[]>(PLAYERS);
  const [selectedCardId, setSelectedCardId] = React.useState<string | null>(SAMPLE_CARDS[0].id);
  const current = players[1];
  const navigation = useRouter();

  const onSeeDetails = () => {
    const card = SAMPLE_CARDS.find((c) => c.id === selectedCardId);
    if (!card) return Alert.alert("Choisissez une carte");
    Alert.alert(card.title, card.description);
  };

  const onStartTurn = () => {
    const card = SAMPLE_CARDS.find((c) => c.id === selectedCardId);
    if (!card) return;
    Alert.alert("Start Turn", `Card: ${card.title}`);
    // navigation.navigate("TurnPlay", { card })
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* --- Header with hourglass timer --- */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/game/tico_quiz.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.turnText}>VOTRE TOUR</Text>
          <HourglassTimer seconds={TURN_SECONDS} onExpire={() => Alert.alert("Temps écoulé")} />
        </View>

        {/* --- Current turn strip --- */}
        <ShadowWrap radius={16} width={width * 0.94}>
          <View style={styles.turnStrip}>
            <View style={styles.stripLeft}>
              <View style={styles.stripAvatar}>
                <Text style={{ fontSize: 22 }}>{current.emoji ?? "🎮"}</Text>
              </View>
              <Text style={styles.stripName}>{current.name}</Text>
            </View>
            <View style={styles.pointsBadge}>
              <Text style={{ fontSize: 18 }}>🏆</Text>
              <Text style={styles.pointsText}>{current.points} POINT</Text>
            </View>
          </View>
        </ShadowWrap>

        {/* --- Scoreboard --- */}
        <ShadowWrap radius={14} width={width * 0.94}>
          <View style={styles.scoreCard}>
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreTitle}>SCOREBOARD</Text>
              <View style={styles.targetPill}>
                <Text style={styles.targetPillText}>TARGET: {TARGET_POINTS} POINTS</Text>
              </View>
            </View>

            {players.map((p) => (
              <View key={p.id} style={styles.scoreRowWrap}>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreRowName}>{p.name}</Text>
                  <View style={styles.hpBox}>
                    <Text style={styles.hpLabel}></Text>
                    <View style={styles.hpBarOuter}>
                      <LinearGradient
                        colors={[COLORS.green2, COLORS.green1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ height: "100%", width: `${Math.round(p.hp * 100)}%`, borderRadius: 8 }}
                      />
                    </View>
                  </View>
                  <Text style={styles.scoreRowPoints}>{p.points} POINT</Text>
                </View>
              </View>
            ))}
          </View>
        </ShadowWrap>



        {/* --- Choose card (HORIZONTAL SCROLLER) --- */}
        <ShadowWrap radius={12} width={width * 0.94}>
          <View style={styles.chooseCard}>
            <Text style={styles.chooseTitle}>CHOISISSEZ VOTRE CARTE</Text>

            <View style={styles.horizontalFrame}>
              <FlatList
                data={SAMPLE_CARDS}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                snapToAlignment="start"
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + 12}
                renderItem={({ item }) => (
                  <CardTile
                    card={item}
                    width={CARD_WIDTH}
                    selected={selectedCardId === item.id}
                    onPress={() => setSelectedCardId(item.id)}
                  />
                )}
              />
            </View>

            <ShadowWrap radius={12} width={width * 0.88}>
              <TouchableOpacity activeOpacity={0.9} onPress={onSeeDetails}>
                <View style={styles.secondaryBtn}>
                  <Text style={styles.secondaryText}>VOIR LES DETAILS DE CARTE</Text>
                </View>
              </TouchableOpacity>
            </ShadowWrap>
          </View>
        </ShadowWrap>

        {/* --- CTA --- */}
        <ShadowWrap radius={18} width={width * 0.92}>
          <TouchableOpacity activeOpacity={0.95} onPress={()=>{navigation.push("/game/DebateTimeScreen")}} disabled={!selectedCardId}>
            <View style={[styles.primaryBtn, !selectedCardId && { opacity: 0.6 }]}>
              <Text style={{ fontSize: 18 }}>🎯</Text>
              <Text style={styles.primaryText}>START TURN WITH THIS CARD</Text>
            </View>
          </TouchableOpacity>
        </ShadowWrap>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ----------------- Hourglass Timer (text + progress) ----------------- */
function HourglassTimer({
  seconds,
  onExpire,
}: {
  seconds: number;
  onExpire?: () => void;
}) {
  const [remain, setRemain] = React.useState(seconds);
  const spin = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const t = setInterval(() => {
      setRemain((r) => {
        if (r <= 1) {
          clearInterval(t);
          onExpire && onExpire();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [seconds]);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 2000, useNativeDriver: true })
    ).start();
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const pct = remain / seconds;

  const mm = Math.floor(remain / 60)
    .toString()
    .padStart(2, "0");
  const ss = (remain % 60).toString().padStart(2, "0");

  return (
    <View style={{ alignItems: "flex-end" }}>
      <View style={styles.timerPill}>
        <Animated.Text style={[styles.timerIcon, { transform: [{ rotate }] }]}>⏳</Animated.Text>
        <Text style={styles.timerText}>{mm}:{ss}</Text>
      </View>
      <View style={styles.timerTrack}>
        <View style={[styles.timerFill, { width: `${Math.max(0, pct * 100)}%` }]} />
      </View>
    </View>
  );
}

/* ------------------------ Card Tile ------------------------ */
function CardTile({
  card,
  selected,
  onPress,
  width,
}: {
  card: Card;
  selected: boolean;
  onPress: () => void;
  width: number;
}) {
  const colors =
    card.family === "green"
      ? COLORS.greenCard
      : card.family === "orange"
      ? COLORS.orangeCard
      : COLORS.blueCard;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={colors  as [ColorValue, ColorValue, ...ColorValue[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.cardTile,
          { width },
          selected && { borderColor: COLORS.red, borderWidth: 2 },
        ]}
      >
        <Text style={styles.tileTitle} numberOfLines={2}>{card.title}</Text>

        <View style={styles.tileRow}>
          <View style={styles.answerPill}>
            <Text style={styles.answerLabel}>Réponse :</Text>
            <Text style={styles.answerValue}>
              {card.answer === "Info" ? " Info" : " pipeau"}
            </Text>
          </View>
          <View style={styles.bonusBubble}>
            <Text style={styles.bonusText}>{card.bonusText}</Text>
          </View>
        </View>

        <Text style={styles.tileDesc} numberOfLines={5}>{card.description}</Text>
        {!!card.foot && <Text style={styles.tileFoot}>{card.foot}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
}

/* ------------------------ Helpers ------------------------ */
function ShadowWrap({
  children,
  width,
  radius = 12,
}: {
  children: React.ReactNode;
  width?: number;
  radius?: number;
}) {
  return (
    <View
      style={{
        width,
        borderRadius: radius,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.16,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 5,
        backgroundColor: "transparent",
        alignSelf: "center",
        marginVertical: 8,
      }}
    >
      {children}
    </View>
  );
}

/* ----------------------------- Styles ----------------------------- */
const CARD_WIDTH = width * 0.74;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingBottom: 28 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 6,
  },
  logo: { width: 110, height: 54 },
  turnText: { color: "#E53935", fontWeight: "900", fontSize: 16 },

  timerPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E7DAC0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  timerIcon: { fontSize: 16, marginRight: 6 },
  timerText: { fontWeight: "900", color: COLORS.title },

  timerTrack: {
    marginTop: 6,
    height: 6,
    width: 110,
    backgroundColor: "#E8E2D1",
    borderRadius: 6,
    overflow: "hidden",
  },
  timerFill: { height: "100%", backgroundColor: "#32C07A" },

  turnStrip: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stripLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  stripAvatar: {
    width: 42, height: 42, borderRadius: 9,
    backgroundColor: "#FFE5B1", alignItems: "center", justifyContent: "center",
  },
  stripName: { fontSize: 16, fontWeight: "900", color: COLORS.title },
  pointsBadge: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#F2E7CF", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: "#DAC79E", gap: 6,
  },
  pointsText: { fontWeight: "900", color: COLORS.title },

  scoreCard: {
    backgroundColor: COLORS.card, borderRadius: 14, borderWidth: 1, borderColor: COLORS.cardBorder, padding: 12,
  },
  scoreHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  scoreTitle: { color: COLORS.title, fontSize: 20, fontWeight: "900" },
  targetPill: { backgroundColor: "#E7E0D1", borderRadius: 18, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "#C9C1A9" },
  targetPillText: { color: COLORS.title, fontWeight: "900", fontSize: 12 },

  scoreRowWrap: { backgroundColor: COLORS.white, borderRadius: 10, borderWidth: 1, borderColor: "#E7DFC8", marginVertical: 6, padding: 8 },
  scoreRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  scoreRowName: { color: COLORS.title, fontWeight: "900", width: 90 },
  hpBox: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  hpLabel: { fontWeight: "900", color: "#6B5C34" },
  hpBarOuter: { flex: 1, height: 14, borderRadius: 8, backgroundColor: "#E7E2D3", borderWidth: 1, borderColor: "#B7B0A0", overflow: "hidden" },
  scoreRowPoints: { width: 80, textAlign: "right", fontWeight: "900", color: COLORS.title },

  chooseCard: { backgroundColor: COLORS.white, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: COLORS.cardBorder },
  chooseTitle: { color: COLORS.deepBlueDark, fontSize: 18, fontWeight: "900", marginBottom: 8 },

  horizontalFrame: {
    borderWidth: 1, borderColor: "#E6D9BA", borderRadius: 12, backgroundColor: "#FFFDF6",
    paddingVertical: 12, marginBottom: 14,
  },

  cardTile: { borderRadius: 12, padding: 10, borderColor: "transparent" },
  tileTitle: { color: COLORS.white, fontWeight: "900", fontSize: 13, marginBottom: 6 },
  tileRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  answerPill: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  answerLabel: { color: COLORS.white, fontWeight: "700", fontSize: 11 },
  answerValue: { color: COLORS.white, fontWeight: "900", fontSize: 11 },
  bonusBubble: { backgroundColor: COLORS.white, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  bonusText: { color: "#111", fontWeight: "900", fontSize: 14 },
  tileDesc: { color: COLORS.white, opacity: 0.9, fontSize: 11, lineHeight: 14 },
  tileFoot: { color: COLORS.white, opacity: 0.95, fontWeight: "900", position: "absolute", bottom: 6, right: 10 },

  secondaryBtn: { backgroundColor: COLORS.deepBlue, borderRadius: 12, height: 50, alignItems: "center", justifyContent: "center" },
  secondaryText: { color: "#fff", fontWeight: "900", letterSpacing: 0.3 },

  primaryBtn: { backgroundColor: COLORS.blueBtn, borderRadius: 18, minHeight: 60, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "900", letterSpacing: 0.3 },
});
