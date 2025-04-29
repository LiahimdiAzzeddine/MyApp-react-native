import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type PackagingInfoItemProps = {
  title: string;
  description: string;
  instruction: string;
  pictogram: string;
  isLast: boolean;
};

const PackagingInfoItem = ({
  title,
  description,
  instruction,
  pictogram,
  isLast,
}: PackagingInfoItemProps) => {
  const sortingInstructions: Record<string, string> = {
    J: "Recyclage -> poubelle jaune",
    V: "Recyclage -> conteneur à verre",
    I: "Pas de recyclage -> Poubelle classique",
    C: "Compostable",
    default: "Incertain",
  };

  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View>
        <Text style={styles.instructionTitle}>Consigne de tri</Text>
        <View style={styles.instructionContainer}>
          <Image source={{ uri: pictogram }} style={styles.pictogram} />
          <Text style={styles.instruction}>
            ➡ {sortingInstructions[instruction] || sortingInstructions.default}
          </Text>
        </View>
      </View>
      {/* Afficher la ligne horizontale sauf pour le dernier élément */}
      {!isLast && <View style={styles.hr} />}
    </View>
  );
};

type PackagingInfoProps = {
  togglePanel: (id: number) => void;
  pack: { _label: string; _instruction: string; _pictogram: string }[] | null;
};

const PackagingInfo = ({ togglePanel, pack }: PackagingInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>
          <Text style={styles.headerBold}>Composants</Text> et consignes de tri
        </Text>
        {pack && (
          <View style={styles.packList}>
            {pack.map((element, index) => (
              <PackagingInfoItem
                key={index}
                title={`Partie de l’emballage ${index + 1}`}
                description={element._label}
                instruction={element._instruction}
                pictogram={
                  element._pictogram ||
                  "https://creopack.com/wp-content/uploads/2024/10/mains.png"
                }
                isLast={index === pack.length - 1}
              />
            ))}
          </View>
        )}
        <Text style={styles.footerText}>
          Vérifiez les consignes de tri de votre commune. Elles peuvent varier
          selon la localité.
        </Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={(e) => {
            e.stopPropagation();
            togglePanel(9);
          }}
        >
          <Image source={require('@/assets/images/fp/FICHETOP.png')}
 style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9F6D0", // Custom green clear
    borderTopEndRadius: 32,
    minHeight: 288,
    paddingBottom: 32,
    width: "100%",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: "column",
    gap: 16,
  },
  header: {
    fontSize: 20,
    color: "#005587", // Custom blue
    fontWeight: "bold",
  },
  headerBold: {
    fontWeight: "bold",
    color: "#00C6C6", // Cyan marker effect
  },
  packList: {
    flexDirection: "column",
    gap: 8,
  },
  itemContainer: {
    color: "#2C6B66", // Text color
    flexDirection: "column",
    gap: 16,
  },
  title: {
    fontSize: 16,
    color: "#005587", // Custom blue
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    padding: 4,
  },
  instructionTitle: {
    fontSize: 14,
    color: "#005587", // Custom blue
    fontWeight: "bold",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    padding: 4,
  },
  pictogram: {
    width: "8%", // Adjust to the size you want
    height: "auto",
  },
  instruction: {
    fontSize: 14,
  },
  hr: {
    borderBottomColor: "#005587",
    borderBottomWidth: 1,
    marginVertical: 16,
    marginHorizontal: 32,
  },
  footerText: {
    fontSize: 12,
    color: "#2C6B66", // Text color
    textAlign: "center",
    paddingVertical: 16,
  },
  icon: {
    position: "absolute",
    bottom: 8,
    right: 0,
  },
  iconImage: {
    width: 48,
    height: 48,
    cursor: "pointer", // React Native does not use cursor, but this is for reference
  },
});

export default PackagingInfo;
