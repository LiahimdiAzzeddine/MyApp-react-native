import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";


export default function _layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomHeader color={"#ffeda3"} image={"bf"}  />,
      }}
    >
      <Stack.Screen name="personalInfo" />
      <Stack.Screen name="contact"  />
      <Stack.Screen name="inviteTico"  />
      <Stack.Screen name="CGUConfidentiality"  />
      <Stack.Screen name="fqas"  />
    </Stack>
  );
}
