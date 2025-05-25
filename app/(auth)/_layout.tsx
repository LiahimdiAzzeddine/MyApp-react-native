import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomHeader color={"#ffeda3"} image={"bf"} />,
        animation: 'fade', // or 'slide_from_right', 'slide_from_bottom', 'none'
        presentation: 'card', // or 'modal', 'transparentModal'
      }}
      
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgotPassword" />
    </Stack>
  );
}
