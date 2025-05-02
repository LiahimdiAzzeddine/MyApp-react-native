import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";


export default function _layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomHeader title="Recettes"/>,
      }}
    >
      <Stack.Screen name="recipe" />
      <Stack.Screen name="suggestRecipe" />
    </Stack>
  );
}
