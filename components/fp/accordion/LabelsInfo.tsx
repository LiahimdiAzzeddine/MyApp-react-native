import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";


interface Engagement {
  _generic?: {
    _label: string;
    _image: string;
    _details: string;
    _labeltype: "L" | "M";
  };
}

interface LabelsInfoProps {
  togglePanel: (index: number) => void;
  engagements: Record<string, Engagement>;
}

interface Label {
  _label: string;
  _image: string;
  _details: string;
}

const VITE_LABEL_IMAGES = "https://p.foodhea.com/public/images/label/";

const LabelsInfo: React.FC<LabelsInfoProps> = ({ togglePanel, engagements }) => {
  const labels: Label[] = [];
  const mentions: Label[] = [];

  Object.values(engagements || {}).forEach(e => {
    const generic = e._generic;
    if (!generic) return;

    const item: Label = {
      _label: generic._label,
      _image: `${VITE_LABEL_IMAGES}${generic._image}`,
      _details: generic._details
    };

    if (generic._labeltype === "L") labels.push(item);
    else if (generic._labeltype === "M") mentions.push(item);
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Labels</Text>
      <Text style={styles.subtitle}>
        Les labels sont des certifications qui engagent les marques à respecter des cahiers des charges.
      </Text>
      {labels.map((label, index) => (
        <LabelCard key={index} label={label} />
      ))}

      <Text style={[styles.title, { marginTop: 20 }]}>Mentions</Text>
      <Text style={styles.subtitle}>
        Les mentions sont des allégations faites par les marques selon des critères légaux ou propres à la marque.
      </Text>
      {mentions.map((label, index) => (
        <LabelCard key={index} label={label} />
      ))}

      <TouchableOpacity onPress={() => togglePanel(5)} style={styles.iconContainer}>
        <Image  source={require('@/assets/images/fp/FICHETOP.png')} style={styles.icon} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const LabelCard: React.FC<{ label: Label }> = ({ label }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const isLongText = label._details.length > maxLength;

  return (
    <View style={styles.card}>
      <Image source={{ uri: label._image }} style={styles.cardImage} />
      <View style={styles.cardText}>
        <Text style={styles.cardLabel}>
          <Text style={{ fontWeight: "bold" }}>{label._label}</Text> –{" "}
          {isExpanded || !isLongText
            ? label._details
            : `${label._details.slice(0, maxLength)}...`}
        </Text>
        {isLongText && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.readMore}>
              {isExpanded ? "Voir moins" : "Lire plus"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: "#E6F3EF", // custom-green-clear
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c6b66",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#2c6b66",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  cardImage: {
    width: 72,
    height: 72,
    resizeMode: "contain",
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: "#2c6b66",
  },
  readMore: {
    fontSize: 12,
    color: "#2c6b66",
    textDecorationLine: "underline",
    marginTop: 4,
  },
  iconContainer: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
});

export default LabelsInfo;
