import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";


export default function _layout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        header: (props) => <CustomHeader image='vf' isProfil={route.name === "profile"}/>,
      })}
    >
      <Stack.Screen name="profile" />
      <Stack.Screen name="mission" />
      <Stack.Screen name="demands" />
      <Stack.Screen name="details" />
      <Stack.Screen name="history" />
      <Stack.Screen name="laterProducts" />
      <Stack.Screen name="demandDetail" />
      <Stack.Screen name="infoProfil" />
      <Stack.Screen name="stories" />
       <Stack.Screen
        name="level/[id]"
        options={{
          title: "Level Details", // Titre personnalisé si tu veux
        }}
      />
      <Stack.Screen name="story" />
    </Stack>
  );
}
