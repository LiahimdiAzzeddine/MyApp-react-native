import CustomHeader from "@/components/CustomHeader";
import { AuthContext } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
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
         <SafeAreaView style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: '#fff'
          }} edges={['bottom', 'left', 'right','top']}>
            <ActivityIndicator size="large" color="#007AFF" />
          </SafeAreaView>
    );
  }

  return (
    <Stack
      screenOptions={({ route }) => ({
        header: (props) => (
          <CustomHeader
            image="vf"
            isProfil={route.name === "profile"}
            goTo={route.name === "story" ? "/home" : undefined}
          />
        ),
        animation: 'fade',
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
      <Stack.Screen
        name="level/[id]"
        options={{
          title: "Level Details",
        }}
      />
      <Stack.Screen name="story" />
    </Stack>
  );
}

