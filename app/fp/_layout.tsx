import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";


export default function _layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomHeader image='vf'/>,
      }}
    >
      <Stack.Screen name="productDetailsScreen" />
    </Stack>
  );
}
