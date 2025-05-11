import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";


export default function _layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomHeader color={"#ffeda3"} image={"of"}  />,
      }}
    >
      <Stack.Screen name="tip" />
      <Stack.Screen name="tipSettings" />
    </Stack>
  );
}
