import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export function ModernShadowWrap({
    children,
    radius = 12,
  }: {
    children: React.ReactNode;
    radius?: number;
  }) {
    return (
      <View
        style={[
          styles.shadowContainer,
          {
            borderRadius: radius,
            shadowColor: Colors.page.shadow,
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          },
        ]}
      >
        {children}
      </View>
    );
  }
  const styles = StyleSheet.create({
  
    shadowContainer: {
      backgroundColor: "transparent",
    }});