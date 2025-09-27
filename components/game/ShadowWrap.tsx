import { Colors } from "@/constants/Colors";
import { View } from "react-native";

export default function ShadowWrap({
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
        style={{
          width,
          borderRadius: radius,
          shadowColor: Colors.page.shadow,
          shadowOpacity: 0.16,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          elevation: 5,
          backgroundColor: "transparent",
          alignSelf: "center",
          marginVertical: 8,
        }}
      >
        {children}
      </View>
    );
  }