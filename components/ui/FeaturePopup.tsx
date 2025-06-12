import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FeaturePopupProps {
  open: boolean;
}

const FeaturePopup: React.FC<FeaturePopupProps> = ({ open }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const close = async () => {
    await AsyncStorage.setItem("tooltipSeen", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("@/assets/images/popup/background2.png")}
        style={styles.backgroundImage}
      />

      {/* Arrow */}
      <Image
        source={require("@/assets/images/popup/flechestory.png")}
        style={styles.arrow}
      />

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={close}>
        <Image
          source={require("@/assets/images/popup/fermeturetutostory.png")}
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      {/* Text */}
      <Text style={styles.text} className="leading-archivo">
        Nouvelle fonctionnalité{"\n"}débloquée
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 105,
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  backgroundImage: {
    position: "absolute",
    width: 115,
    height: 115,
    resizeMode: "contain",
  },
  arrow: {
    position: "absolute",
    top: -8,
    right: 5,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 2,
    left: 5,
    width: 40,
    height: 40,
    zIndex: 10,
  },
  closeIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
    color: "#F48C06",
    fontFamily: "ArchivoBold",
    fontSize: 14,
    marginTop: 5,
  },
});

export default FeaturePopup;
