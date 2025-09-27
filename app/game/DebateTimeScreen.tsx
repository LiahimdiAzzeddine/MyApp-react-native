// DebateTimeScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MenuButton } from "@/components/game/MenuButton";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#F7E9AE",
  white: "#FFFFFF",
  card: "#FFF8E5",
  cardBorder: "#F0E1B8",
  title: "#0E0E0E",
  sub: "#5E5E5E",
  purple: "#7B3FE4",
  purpleSoft: "#E8DAFF",
  grayBar: "#ECE7DA",
  grayBarEdge: "#C9C1A9",
  red: "#F24A4A",
  blue: "#0F548D",
  shadow: "#000",
};

const DEBATE_SECONDS = 30;

export default function DebateTimeScreen({ route }: any) {
      const navigation = useRouter();
    
  const statement =
    route?.params?.statement ??
    "Honey never spoils and can last indefinitely when stored properly.";

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      {/* Top strip: current player + points */}
      <View style={styles.turnStrip}>
        <View style={styles.turnLeft}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 16 }}>🦊</Text>
          </View>
          <Text style={styles.turnName}>PLAYER 2</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={{ fontSize: 16 }}>🏆</Text>
          <Text style={styles.pointsText}>0 POINT</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>DEBATE TIME</Text>

      {/* Timer card */}
      <View style={styles.timerCard}>
        <View style={styles.timerHeaderRow}>
          <Text style={styles.timerHeaderLeft}>🕒  Time Remaining</Text>
          <CountdownMMSS
            seconds={DEBATE_SECONDS}
            onExpire={() => {
              // go to voting step, or enable voting
              // navigation.navigate("VotingScreen")
            }}
          />
        </View>
        <CountdownBar seconds={DEBATE_SECONDS} />
      </View>

      {/* Statement card */}
      <View style={styles.statementCard}>
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

        <LinearGradient
          colors={["#EEE0FF", "#FFE0F3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.discussPill}
        >
          <Text style={styles.discussText}>
            💬  Discuss as a group: Is this statement true or false?
          </Text>
        </LinearGradient>

        <MenuButton label={"test"} onPress={function (): void {
                 navigation.push("/game/VotingScreen")
              } }/>
      </View>

      {/* Bottom notice */}
      <View style={styles.noticeWrap}>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>
            🚫  Voting is disabled during discussion time
          </Text>
          <Text style={styles.noticeSub}>
            Wait for the timer to end, then cast your vote
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

function CountdownMMSS({
  seconds,
  onExpire,
}: {
  seconds: number;
  onExpire?: () => void;
}) {
  const [remain, setRemain] = React.useState(seconds);

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

  const mm = Math.floor(remain / 60)
    .toString()
    .padStart(2, "0");
  const ss = (remain % 60).toString().padStart(2, "0");

  return <Text style={styles.timerHeaderRight}>{mm}:{ss}</Text>;
}

function CountdownBar({ seconds }: { seconds: number }) {
  const anim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    anim.setValue(1);
    Animated.timing(anim, {
      toValue: 0,
      duration: seconds * 1000,
      useNativeDriver: false, // width animation
    }).start();
  }, [seconds]);

  const widthInterpolate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.barOuter}>
      <Animated.View style={[styles.barFill, { width: widthInterpolate }]} />
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 12, paddingBottom: 12 },

  /* turn strip */
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

  title: {
    textAlign: "center",
    marginTop: 18,
    marginBottom: 8,
    color: COLORS.title,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  /* timer card */
  timerCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    marginBottom: 14,
  },
  timerHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  timerHeaderLeft: { color: COLORS.purple, fontWeight: "800" },
  timerHeaderRight: { color: COLORS.purple, fontWeight: "900", fontSize: 18 },
  barOuter: {
    height: 10,
    backgroundColor: COLORS.grayBar,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.grayBarEdge,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: COLORS.red,
    borderRadius: 8,
  },

  /* statement */
  statementCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    marginBottom: 16,
  },
  statementBox: {
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  statementText: {
    color: COLORS.title,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
  },
  discussPill: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  discussText: {
    textAlign: "center",
    color: COLORS.purple,
    fontWeight: "700",
  },

  /* notice */
  noticeWrap: { marginTop: "auto" },
  noticeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  noticeTitle: {
    color: "#C62828",
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },
  noticeSub: {
    color: COLORS.sub,
    textAlign: "center",
  },
});
