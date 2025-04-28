import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="mission"  />
      <Stack.Screen name="demands" />
      <Stack.Screen name="details" />
      <Stack.Screen name="history" />
      <Stack.Screen name="laterProducts"  />
      <Stack.Screen name="demandDetail"/>
    </Stack>
  );
}
