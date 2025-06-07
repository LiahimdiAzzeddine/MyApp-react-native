import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="recipes"
        options={{
          header: (props) => <CustomHeader image="rf"  isRecipes={true}/>,
        }}
      />
      <Stack.Screen
        name="recipe/[id]"
        options={{
          header: (props) => <CustomHeader image="rf" color="#fad4ce" />,
        }}
      />
   
      <Stack.Screen
        name="suggestrecipe"
        options={{
          header: (props) => <CustomHeader image="rf" />,
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          header: (props) => <CustomHeader image="rf" />,
        }}
      />
      <Stack.Screen
        name="recipeSettings"
        options={{
          header: (props) => <CustomHeader image="rf" color="#fdf2f0" />,
        }}
      />
    </Stack>
  );
}
