import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { CustomDarkTheme, LightTheme } from "@/utils/themeOptions";
import { AuthProvider } from "@/context/AuthContext";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ClashDisplayBold: require("../assets/fonts/ClashDisplay-Bold.ttf"),
    ClashDisplayRegular: require("../assets/fonts/ClashDisplay-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    Archivo: require("../assets/fonts/Archivo-Regular.otf"),
    ArchivoBold: require("../assets/fonts/Archivo-Bold.otf"),
    ArchivoExtraBold: require("../assets/fonts/Archivo-ExtraBold.otf"),
    ArchivoBoldItalic: require("../assets/fonts/Archivo-BoldItalic.otf"),
    ArchivoLight: require("../assets/fonts/Archivo-Light.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? CustomDarkTheme : LightTheme}
    >
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="hometab" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="settings"
            options={{
              title: "Paramètres",
              animation: "fade",
              headerShown: true,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
