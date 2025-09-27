// LobbyScreen.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  Alert,
  ColorValue,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useRooms } from "@/hooks/game/useRooms";

const { width, height } = Dimensions.get("window");

const MAX = 6;

type Player = {
  id: string;
  name: string;
  isHost?: boolean;
  isSelf?: boolean;
  online?: boolean;
  emoji?: string;
  joinedAt?: string;
};

export default function LobbyScreen({ navigation }: any) {
  const router = useRouter();
    const { roomId } = useLocalSearchParams();
  const [code] = React.useState(String(roomId));
  const { getRoomById, loading, error } = useRooms();
  const [players] = React.useState<Player[]>([
    { 
      id: "1", 
      name: "Azzeddine", 
      isHost: true, 
      isSelf: true, 
      online: true, 
      emoji: "🎮",
      joinedAt: "Il y a 2 min"
    },
    { 
      id: "2", 
      name: "Marion", 
      online: true, 
      emoji: "🚀",
      joinedAt: "Il y a 1 min"
    },
    { 
      id: "3", 
      name: "Samuel", 
      online: true, 
      emoji: "🎯",
      joinedAt: "À l'instant"
    },
  ]);
  const [copied, setCopied] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const copyCode = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
    
    // Animation de feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => setCopied(false), 2000);
  };

  const shareCode = () => {
    Alert.alert(
      "Partager le code",
      "Comment voulez-vous partager le code de la partie ?",
      [
        { text: "Copier le code", onPress: copyCode },
        { text: "Partager par message", onPress: () => console.log("Share via message") },
        { text: "Annuler", style: "cancel" },
      ]
    );
  };

  const startGame = () => {
    if (players.length < 2) {
      Alert.alert("Pas assez de joueurs", "Il faut au moins 2 joueurs pour commencer la partie.");
      return;
    }
   router.push("/game/GameTurnScreen")
  };

  const goBack = () => {
    router.back();
  };

  const getStatusText = () => {
    if (players.length < 2) return "En attente de joueurs...";
    if (players.length < 4) return "Prêt à jouer !";
    if (players.length < 7) return "Partie parfaite !";
    return "Grande fête en vue !";
  };

  const getStatusIcon = () => {
    if (players.length < 2) return "⏳";
    if (players.length < 4) return "✅";
    if (players.length < 7) return "🎉";
    return "🚀";
  };

  return (
    <LinearGradient colors={Colors.page.bgGradient  as [ColorValue, ColorValue]} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            {/* En-tête avec titre */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Salon de Jeu</Text>
              <Text style={styles.headerSubtitle}>Partagez le code pour inviter vos amis</Text>
            </View>

            {/* Carte principale */}
            <View style={styles.mainContent}>
              <ShadowWrap radius={20} width={width * 0.94}>
                <View style={styles.card}>
                  
                  {/* Section code de lobby */}
                  <View style={styles.codeSection}>
                    <Text style={styles.codeLabel}>Code d'invitation</Text>
                    <View style={styles.codeContainer}>
                      <View style={styles.codeDisplay}>
                        <Text style={styles.codeText}>{code}</Text>
                      </View>
                      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <TouchableOpacity 
                          onPress={copyCode} 
                          activeOpacity={0.8} 
                          style={styles.copyButton}
                        >
                          <Text style={styles.copyIcon}>{copied ? "✅" : "📋"}</Text>
                        </TouchableOpacity>
                      </Animated.View>
                      <TouchableOpacity 
                        onPress={shareCode} 
                        activeOpacity={0.8} 
                        style={styles.shareButton}
                      >
                        <Text style={styles.shareIcon}>📤</Text>
                      </TouchableOpacity>
                    </View>
                    {copied && (
                      <Text style={styles.copiedFeedback}>Code copié dans le presse-papiers !</Text>
                    )}
                  </View>

                  {/* Section statut */}
                  <View style={styles.statusSection}>
                    <View style={styles.statusCard}>
                      <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
                      <View style={styles.statusInfo}>
                        <Text style={styles.statusText}>{getStatusText()}</Text>
                        <Text style={styles.statusCount}>
                          {players.length} joueur{players.length > 1 ? 's' : ''} connecté{players.length > 1 ? 's' : ''}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Panel des joueurs */}
                  <ShadowWrap radius={16}>
                    <View style={styles.playersPanel}>
                      <View style={styles.playersHeader}>
                        <Text style={styles.playersTitle}>Joueurs Connectés</Text>
                        <View style={styles.countPill}>
                          <Text style={styles.countPillText}>
                            {players.length}/{MAX}
                          </Text>
                        </View>
                      </View>

                      {/* Liste des joueurs */}
                      <View style={styles.playersListContainer}>
                        <ScrollView
                          style={styles.playersList}
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={{ paddingVertical: 4 }}
                          nestedScrollEnabled={true}
                        >
                          {players.map((player) => (
                            <PlayerRow key={player.id} player={player} />
                          ))}
                        </ScrollView>
                      </View>

                      {/* Zone d'attente */}
                      {players.length < MAX && (
                        <View style={styles.waitingArea}>
                          <View style={styles.waitingBox}>
                            <Text style={styles.waitingText}>
                              En attente d'autres joueurs...
                            </Text>
                            <View style={styles.loadingDots}>
                              <LoadingDot delay={0} />
                              <LoadingDot delay={200} />
                              <LoadingDot delay={400} />
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </ShadowWrap>
                </View>
              </ShadowWrap>
            </View>

            {/* Boutons d'action */}
            <View style={styles.actionButtons}>
              {players.length >= 2 && (
                <ShadowWrap radius={16} width={width * 0.94}>
                  <TouchableOpacity 
                    activeOpacity={0.9} 
                    onPress={startGame}
                    style={styles.startButton}
                  >
                    <LinearGradient
                      colors={[Colors.page.primary, Colors.page.primaryDark]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.startButtonGradient}
                    >
                      <Text style={styles.startButtonText} >🚀 Commencer la Partie</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </ShadowWrap>
              )}
              
              <ShadowWrap radius={16} width={width * 0.94}>
                <TouchableOpacity 
                  activeOpacity={0.9} 
                  onPress={goBack}
                  style={styles.backButton}
                >
                  <Text style={styles.backButtonText}>← Retour</Text>
                </TouchableOpacity>
              </ShadowWrap>
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ===================== Composants ===================== */

function PlayerRow({ player }: { player: Player }) {
  const isHost = player.isHost;
  const isSelf = player.isSelf;

  return (
    <View style={[styles.playerRow, isSelf && styles.playerRowSelf]}>
      <LinearGradient
        colors={isSelf ? [Colors.page.primary, Colors.page.primaryLight] : [Colors.page.accent, Colors.page.accentLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.playerAvatar}
      >
        <Text style={styles.playerEmoji}>{player.emoji ?? "🙂"}</Text>
      </LinearGradient>

      <View style={styles.playerInfo}>
        <View style={styles.playerNameRow}>
          <Text style={styles.playerName}>{player.name}</Text>
          {isHost && <Text style={styles.crownIcon}>👑</Text>}
        </View>
        <View style={styles.playerMetaRow}>
          {isSelf && <Text style={styles.playerSelfTag}>C'est vous !</Text>}
          {isHost && !isSelf && <Text style={styles.playerHostTag}>Organisateur</Text>}
          {player.joinedAt && (
            <Text style={styles.playerJoinTime}>{player.joinedAt}</Text>
          )}
        </View>
      </View>

      <View style={styles.playerStatus}>
        {isHost && (
          <View style={styles.hostBadge}>
            <Text style={styles.hostBadgeText}>HOST</Text>
          </View>
        )}
        <View style={[styles.onlineIndicator, { backgroundColor: player.online ? Colors.page.online : Colors.page.offline }]} />
      </View>
    </View>
  );
}

function LoadingDot({ delay }: { delay: number }) {
  const animation = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    setTimeout(animate, delay);
  }, [delay]);

  return (
    <Animated.View 
      style={[styles.loadingDot, { opacity: animation }]} 
    />
  );
}

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
      style={[
        styles.shadowContainer,
        {
          width,
          borderRadius: radius,
          shadowColor: Colors.page.shadow,
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        },
      ]}
    >
      {children}
    </View>
  );
}

/* =========================== Styles =========================== */

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.page.text.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.page.textLight,
    textAlign: "center",
    lineHeight: 20,
  },

  mainContent: {
    alignItems: "center",
    marginBottom: 20,
  },
  shadowContainer: {
    backgroundColor: "transparent",
  },
  card: {
    backgroundColor: Colors.page.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.page.border,
  },

  codeSection: {
    marginBottom: 24,
  },
  codeLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.page.textMuted,
    marginBottom: 12,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  codeDisplay: {
    backgroundColor: Colors.page.surface,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: Colors.page.primary,
  },
  codeText: {
    fontSize: 28,
    fontWeight: "900",
    color: Colors.page.primary,
    letterSpacing: 3,
  },
  copyButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.page.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.page.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  copyIcon: { fontSize: 20 },
  shareIcon: { fontSize: 20 },
  copiedFeedback: {
    textAlign: "center",
    color: Colors.page.success,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },

  statusSection: {
    marginBottom: 20,
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.page.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.page.border,
  },
  statusIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.page.text.primary,
    marginBottom: 4,
  },
  statusCount: {
    fontSize: 14,
    color: Colors.page.textLight,
    fontWeight: "500",
  },

  playersPanel: {
    backgroundColor: Colors.page.panel,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.page.panelBorder,
  },
  playersHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.page.text.primary,
  },
  countPill: {
    backgroundColor: Colors.page.primary + "20",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.page.primary + "40",
  },
  countPillText: {
    color: Colors.page.primary,
    fontSize: 12,
    fontWeight: "800",
  },

  playersListContainer: {
    backgroundColor: Colors.page.card,
    borderRadius: 12,
    marginBottom: 16,
  },
  playersList: {
    maxHeight: 240,
  },

  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.page.border,
  },
  playerRowSelf: {
    backgroundColor: Colors.page.primary + "08",
  },
  playerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  playerEmoji: { fontSize: 20 },
  playerInfo: {
    flex: 1,
  },
  playerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.page.text.primary,
    marginRight: 8,
  },
  crownIcon: { fontSize: 16 },
  playerMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  playerSelfTag: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.page.primary,
  },
  playerHostTag: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.page.warning,
  },
  playerJoinTime: {
    fontSize: 11,
    color: Colors.page.textMuted,
    fontWeight: "500",
  },
  playerStatus: {
    alignItems: "center",
    gap: 8,
  },
  hostBadge: {
    backgroundColor: Colors.page.hostBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.page.hostBorder,
  },
  hostBadgeText: {
    color: Colors.page.hostText,
    fontSize: 10,
    fontWeight: "800",
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  waitingArea: {
    borderTopWidth: 1,
    borderTopColor: Colors.page.border,
    paddingTop: 16,
  },
  waitingBox: {
    borderWidth: 2,
    borderColor: Colors.page.primary + "40",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  waitingText: {
    color: Colors.page.primary,
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  loadingDots: {
    flexDirection: "row",
    gap: 6,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.page.primary,
  },

  actionButtons: {
    gap: 12,
    alignItems: "center",
  },
  startButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  startButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  backButton: {
    backgroundColor: Colors.page.surface,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    borderWidth: 1,
    borderColor: Colors.page.border,
  },
  backButtonText: {
    color: Colors.page.text.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});