import { Colors } from "@/constants/Colors";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

const { width } = Dimensions.get("window");

interface MenuButtonProps {
  label: string;
  onPress: () => void;
  large?: boolean;
  disabled?: boolean;
}

/** 
 * Bouton simple avec ombre - Version simplifiée
 */
export function MenuButton({
  label,
  onPress,
  large = false,
  disabled = false,
}: MenuButtonProps) {
  return (
    <View style={[
      styles.shadowContainer, 
      large && styles.shadowContainerLarge,
      disabled && styles.shadowContainerDisabled
    ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        style={[
          styles.button,
          large && styles.buttonLarge,
          disabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[
          styles.buttonText,
          large && styles.buttonTextLarge,
          disabled && styles.buttonTextDisabled,
        ]} 
        numberOfLines={1}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    width: width * 0.78,
    marginVertical: 8,
    borderRadius: 16,
    // Ombres simplifiées
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
    
    }),
  },
  
  shadowContainerLarge: {
    width: width * 0.85,
    borderRadius: 18,
  },
  
  shadowContainerDisabled: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.05,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  button: {
    backgroundColor: Colors.page.blueBtn,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonLarge: {
    paddingVertical: 16,
    borderRadius: 18,
  },

  buttonDisabled: {
    backgroundColor: "#CCCCCC",
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  buttonTextLarge: {
    fontSize: 18,
  },

  buttonTextDisabled: {
    color: "#999999",
  },
});