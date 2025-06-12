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
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { CustomDarkTheme, LightTheme } from "@/utils/themeOptions";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";
import Toast from "react-native-toast-message";
import CustomHeader from "@/components/CustomHeader";
import { BottomSheetProvider } from "@/context/BottomSheetContext";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import { LoadingProvider } from "@/context/LoadingContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    comicoFont: require("../assets/fonts/Comico-Regular.otf"),
    Archivo: require("../assets/fonts/Archivo-Regular.otf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ClashDisplayBold: require("../assets/fonts/ClashDisplay-Bold.ttf"),
    ClashDisplayRegular: require("../assets/fonts/ClashDisplay-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    ArchivoBold: require("../assets/fonts/Archivo-Bold.otf"),
    ArchivoExtraBold: require("../assets/fonts/Archivo-ExtraBold.otf"),
    ArchivoBoldItalic: require("../assets/fonts/Archivo-BoldItalic.otf"),
    ArchivoLight: require("../assets/fonts/Archivo-Light.otf"),
    ArchivoLightBold: require("../assets/fonts/Archivo-ExtraLight.ttf"),
    ArchivoItalic: require("../assets/fonts/Archivo-Italic.otf"),
    ArchivoLightItalic: require("../assets/fonts/Archivo-Italic.otf"),
    pallybold: require("../assets/fonts/Pally-Bold.ttf"),
    
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  // Pendant la vérification, ne rien afficher
  if (!loaded) {
    return null;
  }
  const style = {
  backgroundColor: "#9FA8DA",
  borderRadius: 10,
  paddingTop: 5,
};

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? CustomDarkTheme : LightTheme}
    >
      <LoadingProvider>
        <AuthProvider>
          <AppProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetProvider>
                <Stack>
                  <Stack.Screen
                    name="index"
                    options={{ headerShown: false, animation: "fade"  }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false, animation: "fade"  }}
                  />
                  <Stack.Screen
                    name="hometab"
                    options={{ headerShown: false, animation: "fade" }}
                  />
                  <Stack.Screen
                    name="recipetab"
                    options={{ headerShown: false, animation: "fade" }}
                  />
                  <Stack.Screen
                    name="tiptab"
                    options={{ headerShown: false, animation: "fade" }}
                  />
                  <Stack.Screen
                    name="fp/[productDetailsScreen]"
                    options={{
                      animation: "fade",
                      header: (props) => <CustomHeader image="vf" />,
                    }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false, animation: "fade" }}
                  />
                  <Stack.Screen
                    name="settings"
                    options={{
                      title: "Paramètres",
                      animation: "fade",
                      header: (props) => (
                        <CustomHeader color={"#ffeda3"} image={"bx"} />
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="settingsPage"
                    options={{ headerShown: false, animation: "fade" }}
                  />
                  <Stack.Screen
                    name="welcomeSlider"
                    options={{
                      title: "welcome",
                      animation: "fade",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="tico"
                    options={{
                      title: "welcome",
                      animation: "fade",
                      headerShown: false,
                    }}
                  />
                 
                  <Stack.Screen name="+not-found" />
                </Stack>
                <CustomBottomSheet />

            </BottomSheetProvider>
            </GestureHandlerRootView>
            <StatusBar style="auto" />
          </AppProvider>
        </AuthProvider>
      </LoadingProvider>
      <Toast />
    </ThemeProvider>
  );
}
