import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import useGetTotalRequests from "@/hooks/demand/useGetTotalRequests";
import { Link } from "expo-router";

type Profile = {
  level: number;
  title: string;
};

export default function InfoProfil() {
  const { loading, totalRequests, error, fetchTotalRequests } =
    useGetTotalRequests();
  useEffect(() => {
    fetchTotalRequests();
  }, []);

  const profiles: Profile[] = [
    { level: 30, title: "Ti'Curieux" },
    { level: 80, title: "Ti'Défricheur" },
    { level: 120, title: "Ti'Conso engagé" },
    { level: 250, title: "Ti'Décrypteur" },
    { level: 400, title: "Ti'Veilleur" },
    { level: 600, title: "Ti'Héros de la transparence" },
    { level: 800, title: "Ti'Légende de TiCO" },
    { level: 1000, title: "Ti'Champion de la transparence" },
  ];

  const levelPositions: Record<number, number> = {
    30: 20,
    80: 50,
    120: 90,
    250: 140,
    400: 200,
    600: 275,
    800: 360,
    1000: 445,
  };

  const calculateOrangePosition = (value: number): number => {
    if (value > 1000) {
      value = 1000;
    }
    if (levelPositions[value]) return levelPositions[value];

    const levels = Object.keys(levelPositions)
      .map(Number)
      .sort((a, b) => a - b);

    // Si la valeur est 0 ou inférieure au premier niveau, on commence au début
    if (value <= 0) return 0;

    // Si la valeur est inférieure au premier niveau mais > 0,
    // on interpole entre 0 et le premier niveau
    if (value < levels[0]) {
      const ratio = value / levels[0];
      return ratio * levelPositions[levels[0]];
    }

    for (let i = 0; i < levels.length - 1; i++) {
      const current = levels[i];
      const next = levels[i + 1];
      if (value >= current && value <= next) {
        const ratio = (value - current) / (next - current);
        return (
          levelPositions[current] +
          ratio * (levelPositions[next] - levelPositions[current])
        );
      }
    }

    if (value > levels[levels.length - 1])
      return levelPositions[levels[levels.length - 1]];

    return 0;
  };

  const getCurrentProfile = (value: number): string => {
    for (let i = profiles.length - 1; i >= 0; i--) {
      if (value >= profiles[i].level) return profiles[i].title;
    }
    return "Débutant";
  };

  const orangePositionTop = calculateOrangePosition(
    totalRequests ? totalRequests : 0
  );

  return (
    <View style={styles.container}>
      {/* En-tête avec image de fond */}
      <ImageBackground
        source={require("@/assets/images/profil/backgroundProfil.png")}
        resizeMode="contain"
        style={{
          minHeight: 140,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 25,
          marginTop: 1,
        }}
      >
        <Text className="text-center text-custom-green-text text-base Archivo">
          Les Profils dans TiCO dépendent du nombre de sollicitations faites aux
          marques via l'application. La transparence dépend de votre engagement,
          des récompenses vous attendent à chaque étape !
        </Text>
      </ImageBackground>
      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      {totalRequests !== null && !loading && (
        <View style={styles.timelineContainer}>
          {/* Completed portion of timeline (green) */}
          <View
            style={[
              styles.timelineLine,
              {
                height: 470,
                backgroundColor: "#c6f1d9",
                opacity: 0.8,
              },
            ]}
          />

          {/* Remaining portion of timeline (light green) */}
          <View
            style={[
              styles.timelineLine,
              {
                top: orangePositionTop + 25,
                height: 470 - orangePositionTop, // Total height minus current position minus bottom margin
                backgroundColor: "#16a34a",
              },
            ]}
          />
       

       
          <Image
         source={require("@/assets/images/profil/27.png")}
        resizeMode="contain"
        style={[
              styles.orangePoint,
              {
                top: orangePositionTop,
                opacity: 5,
              },
            ]}
        />

          {/* Rest of your existing code remains the same */}
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{totalRequests} demandes</Text>
          </View>

          {profiles.map((profile, index) => {
            const isCompleted = totalRequests >= profile.level;
            const profilePositionTop = calculateOrangePosition(profile.level);

            return (
              <View
                key={index}
                style={[styles.profileItem, { top: profilePositionTop }]}
              >
                <Text
                  style={[
                    styles.levelNumber,
                    {
                      color: isCompleted ? "#c6f1d9" : "#9ca3af",
                      opacity: isCompleted ? 0.8 : 1,
                    },
                  ]}
                >
                  {profile.level}
                </Text>
                <View
                  style={[
                    styles.profilePoint,
                    {
                      backgroundColor: isCompleted ? "#c6f1d9" : "#4e976d",
                      opacity: isCompleted ? 0.8 : 1,
                    },
                  ]}
                />
                <Link
                  href={{
                    pathname: "/hometab/level/[id]",
                    params: { id: index+1 },
                  }}
                  style={[
                    styles.profileTitle,
                    {
                      color: isCompleted ? "#c6f1d9" : "#4e976d",
                      fontWeight: isCompleted ? "600" : "400",
                    },
                    styles.dashedUnderline
                  ]}
                >
                  {profile.title}
                </Link>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
   dashedUnderline: {
    textDecorationLine: "underline",
    textDecorationStyle: "dashed",
    textDecorationColor: "#4e976d", 
  },

  timelineContainer: {
    flex: 1,
    position: "relative",
    marginLeft: 20,
    height: 450,
  },
  timelineLine: {
    position: "absolute",
    left: 60,
    top: 0,
    width: 2,
  },
  orangePoint: {
    position: "absolute",
    left: 44.5, // Ajusté pour s'aligner avec la nouvelle position de la ligne
    width: 33,
    height: 33,
    zIndex: 10,
  },

  labelContainer: {
    position: "absolute",
    left:-72,
    top: 200,
    transform: [{ rotate: "-90deg" }],
  },
  labelText: {
    color: "#15803d",
    fontSize: 18,
    fontFamily: "comicoFont",
  },
  profileItem: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    height: 24,
  },
  profilePoint: {
    position: "absolute",
    left: 53, // Ajusté pour s'aligner avec la ligne
    width: 16,
    height: 16,
    borderRadius: 10,
  },
  levelNumber: {
    fontSize: 16,
    fontWeight: "bold",
    width: 40,
    textAlign: "right", // Aligné à droite pour être proche de la timeline
    marginRight: 8, // Espace entre le numéro et le point
  },
  profileTitle: {
    fontSize: 16,
    marginLeft: 35, // Ajusté pour être à droite du point
    flex: 1,
  },
});
