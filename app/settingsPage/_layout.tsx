import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        header: () => (
          <CustomHeader
            color={
              route.name === "inviteTico" ||
              route.name === "fqas" ||
              route.name === "CGUConfidentiality"
                ? "#ffffff"
                : "#ffeda3"
            }
            image="bf"
          />
        ),
        animation: "fade", 
      })}
    >
      <Stack.Screen name="personalInfo" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="inviteTico" />
      <Stack.Screen name="CGUConfidentiality" />
      <Stack.Screen name="fqas" />
    </Stack>
  );
}
