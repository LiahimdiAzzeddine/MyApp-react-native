import CustomHeader from "@/components/CustomHeader";
import { AuthContext } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _layout() {
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !checked) {
      Alert.alert(
        "Authentification requise",
        "Veuillez vous connecter pour accéder à cette page.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/login");
            },
          },
        ],
        { cancelable: false }
      );
      setChecked(true);
    }
  }, [isAuthenticated, checked]);

  if (!isAuthenticated) {
    // Affiche un spinner pendant l'alerte + redirection
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
        edges={["bottom", "left", "right", "top"]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="recipes"
        options={{
          header: (props) => <CustomHeader image="rf" isRecipes={true} />,
        }}
      />
       <Stack.Screen
        name="recipeSettings"
        options={{
          header: (props) => <CustomHeader image="rf" color="#fdf2f0" />,
        }}
      />
      <Stack.Screen
        name="recipe/[id]"
        options={{
          header: (props) => <CustomHeader image="rf" color="#fad4ce" />,
        }}
      />

      <Stack.Screen
        name="suggestRecipe"
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
     
    </Stack>
  );
}
