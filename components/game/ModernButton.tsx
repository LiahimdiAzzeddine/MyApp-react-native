import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export function ModernButton({
    icon,
    disabled,
    onPress,
    type = "primary",
  }: {
    icon: string;
    disabled?: boolean;
    onPress: () => void;
    type?: "primary" | "secondary";
  }) {
    const isPrimary = type === "primary";
    const bgColor = disabled ? Colors.page.surfaceDark : (isPrimary ? Colors.page.primary : Colors.page.surface);
    const textColor = disabled ? Colors.page.textMuted : (isPrimary ? "#FFFFFF" : Colors.page.primary);
  
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.modernButton,
          { backgroundColor: bgColor },
          disabled && styles.modernButtonDisabled,
        ]}
      >
        <Text style={[styles.modernButtonText, { color: textColor }]}>{icon}</Text>
      </TouchableOpacity>
    );
  }
  
 export function ModernChip({
    value,
    active,
    onPress,
  }: {
    value: number;
    active?: boolean;
    onPress: () => void;
  }) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={[
            styles.modernChip,
            active && styles.modernChipActive,
          ]}
        >
          <Text style={[styles.modernChipText, active && styles.modernChipTextActive]}>
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  const styles = StyleSheet.create({
    modernButton: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
      },
      modernButtonDisabled: {
        opacity: 0.4,
      },
      modernButtonText: {
        fontSize: 24,
        fontWeight: "800",
      },
      modernChip: {
        backgroundColor: Colors.page.surfaceDark,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: Colors.page.border,
        minWidth: 48,
        alignItems: "center",
      },
      modernChipActive: {
        backgroundColor: Colors.page.primary,
        borderColor: Colors.page.primaryDark,
      },
      modernChipText: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.page.text.primary,
      },
      modernChipTextActive: {
        color: "#FFFFFF",
      },

});