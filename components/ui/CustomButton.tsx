import React from "react";
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?:any
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
  disabled
}) => {
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      className="bg-custom-blue text-white"
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]} >{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontFamily: "ArchivoBold",
    fontSize:18
  },
});

export default CustomButton;
