import { MenuButton } from "@/components/game/MenuButton";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ColorValue,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "@/constants/Colors";
import { ModernShadowWrap } from "@/components/game/ModernShadowWrap";
import { ModernButton, ModernChip } from "@/components/game/ModernButton";
import { useRooms } from "@/hooks/game/useRooms";

const { width, height } = Dimensions.get("window");


const MIN = 2;
const MAX = 6;

export default function PlayersNumberScreen() {
  const [count, setCount] = React.useState<number>(3);
  const navigation = useRouter();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const { createRoom, loading, error } = useRooms();

  const inc = () => {
    if (count < MAX) {
      animateButton();
      setCount(count + 1);
    }
  };

  const dec = () => {
    if (count > MIN) {
      animateButton();
      setCount(count - 1);
    }
  };

  const animateButton = () => {
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
  };

  // Fenêtre glissante de 3 nombres
  const start = Math.min(Math.max(count - 1, MIN), MAX - 2);
  const window3 = [start, start + 1, start + 2];
  const selectedIndex = count - start;

  const getPlayerText = (num: number) => {
    return num === 1 ? "joueur" : "joueurs";
  };

  return (
    <LinearGradient colors={Colors.page.bgGradient as [ColorValue, ColorValue]} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
        <View style={styles.container}>
          {/* En-tête avec logo */}
          <View style={styles.header}>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>Nombre de Joueurs</Text>
              <Text style={styles.subtitle}>
                Choisissez entre 2 et 10 joueurs pour commencer la partie
              </Text>
            </View>
          </View>

          {/* Carte principale */}
          <View style={styles.mainCard}>
            <ModernShadowWrap>
              <View style={styles.card}>
                {/* Indicateur de sélection actuelle */}
                <View style={styles.currentSelection}>
                  <Text style={styles.currentLabel}>Sélection actuelle</Text>
                  <Animated.View
                    style={[styles.currentValue, { transform: [{ scale: scaleAnim }] }]}
                  >
                    <Text style={styles.currentNumber}>{count}</Text>
                    <Text style={styles.currentUnit}>{getPlayerText(count)}</Text>
                  </Animated.View>
                </View>

                {/* Contrôles +/- */}
                <View style={styles.controlsRow}>
                  <ModernShadowWrap radius={16}>
                    <ModernButton
                      icon="-"
                      disabled={count <= MIN}
                      onPress={dec}
                      type="primary"
                    />
                  </ModernShadowWrap>

                  <View style={styles.rangeContainer}>
                    <Text style={styles.rangeText}>
                      {MIN} - {MAX} joueurs
                    </Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${((count - MIN) / (MAX - MIN)) * 100}%` }
                        ]}
                      />
                    </View>
                  </View>

                  <ModernShadowWrap radius={16}>
                    <ModernButton
                      icon="+"
                      disabled={count >= MAX}
                      onPress={inc}
                      type="primary"
                    />
                  </ModernShadowWrap>
                </View>

                {/* Sélection rapide */}
                <View style={styles.quickSelect}>
                  <Text style={styles.quickSelectLabel}>Sélection rapide</Text>
                  <View style={styles.chipsContainer}>
                    {window3.map((n, i) => (
                      <ModernChip
                        key={n}
                        value={n}
                        active={i === selectedIndex}
                        onPress={() => setCount(n)}
                      />
                    ))}
                  </View>
                </View>

                {/* Recommandations */}
                <View style={styles.recommendations}>
                  <View style={styles.recommendationItem}>
                    <View style={[styles.recIcon, { backgroundColor: Colors.page.success + '20' }]}>
                      <Text style={styles.recIconText}>👥</Text>
                    </View>
                    <Text style={styles.recText}>
                      {count <= 4 ? "Idéal pour une partie rapide" :
                        count <= 7 ? "Parfait pour s'amuser entre amis" :
                          "Génial pour une grande fête !"}
                    </Text>
                  </View>
                </View>
              </View>
            </ModernShadowWrap>
          </View>

          {/* Bouton d'action */}
          <View style={styles.actionContainer}>
            <MenuButton
              label={`Commencer la partie à ${count} ${getPlayerText(count)}`}
              onPress={async () => {
                const room = await createRoom("Azzeddine", count);
                if (room) {
                  // ⚡ Passe l'id de la room au LobbyScreen
                  navigation.push({
                    pathname: "/game/lobby/[roomId]",
                    params: { roomId: room.code }
                  });
                }
              }}
              large={true}
              disabled={loading}
            />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
          </View>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}


/* -------------------------- Styles -------------------------- */

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.18,
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: Colors.page.text.primary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.page.text.secondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  mainCard: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
  },

  card: {
    backgroundColor: Colors.page.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.page.border,
  },

  currentSelection: {
    alignItems: "center",
    marginBottom: 32,
  },
  currentLabel: {
    fontSize: 14,
    color: Colors.page.textMuted,
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  currentValue: {
    alignItems: "center",
  },
  currentNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: Colors.page.primary,
    lineHeight: 50,
  },
  currentUnit: {
    fontSize: 16,
    color: Colors.page.text.secondary,
    fontWeight: "600",
    marginTop: 4,
  },

  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  rangeContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  rangeText: {
    fontSize: 14,
    color: Colors.page.textMuted,
    fontWeight: "600",
    marginBottom: 8,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: Colors.page.surfaceDark,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.page.primary,
    borderRadius: 3,
  },

  quickSelect: {
    marginBottom: 24,
  },
  quickSelectLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.page.text.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  chipsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },

  recommendations: {
    borderTopWidth: 1,
    borderTopColor: Colors.page.border,
    paddingTop: 20,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  recIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  recIconText: {
    fontSize: 18,
  },
  recText: {
    flex: 1,
    fontSize: 14,
    color: Colors.page.text.secondary,
    fontWeight: "500",
    lineHeight: 20,
  },

  actionContainer: {
    paddingBottom: 20,
    paddingHorizontal: 4,
  },
});