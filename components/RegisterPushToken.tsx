import React, { useEffect } from "react";
import { Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
interface NotificationData {
  pageTitre?: string;
  pageParagraphe?: string;
  pageDeeplink?: string;
  openDirectly?:boolean;
}
async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.warn("Permission not granted to get push token!");
      return null;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      console.warn("Project ID not found");
      return null;
    }
    try {
      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data;
      return token;
    } catch (e) {
      console.warn(`Error getting token: ${e}`);
      return null;
    }
  } else {
    console.warn("Must use physical device for push notifications");
    return null;
  }
}

const handleOpenDeeplink = (pageDeeplink:string) => {
  if (pageDeeplink) {
    Linking.openURL(pageDeeplink);
  }
};
export default function RegisterPushToken() {
    const router = useRouter();

  useEffect(() => {
  const clearBadge = async () => {
    if (Platform.OS === "ios") {
      await Notifications.setBadgeCountAsync(0);
    }
  };

  clearBadge(); // Efface le badge au lancement de l'app

  const notificationListener = Notifications.addNotificationReceivedListener(
    async (notification) => {
      // Réception d'une notification en foreground
      if (Platform.OS === "ios") {
        const currentCount = await Notifications.getBadgeCountAsync();
        console.log("🚀 ~ RegisterPushToken ~ currentCount:", currentCount)
        await Notifications.setBadgeCountAsync(currentCount + 1);
      }
    }
  );
    const responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data as NotificationData;
    
        const openDirectly = data.openDirectly ?? false; // Valeur par défaut false
    
        if (openDirectly === true) {
          // Redirige directement vers la pageDeeplink
          if (data.pageDeeplink) {
            handleOpenDeeplink(data.pageDeeplink);
          } else {
            console.warn("⚠️ pageDeeplink est vide, impossible de rediriger.");
          }
        } else {
          // Redirige vers notification-details
          router.push({
            pathname: "/notification-details",
            params: {
              pageTitre: data.pageTitre ?? "",
              pageParagraphe: data.pageParagraphe ?? "",
              pageDeeplink: data.pageDeeplink ?? "",
            },
          });
        }
      }
    );
    


    const pushTokenKey = process.env.EXPO_PUBLIC_PUSH_TOKEN_KEY ?? "pushToken";

    async function saveTokenOnce() {
      const token = await registerForPushNotificationsAsync();
      if (!token) return;

      // Lire le token stocké en local
      const storedToken = await AsyncStorage.getItem(pushTokenKey);
      console.log("🚀 ~ saveTokenOnce ~ storedToken:", storedToken);

      if (storedToken !== token) {
        // Token nouveau ou absent → envoyer au serveur
        try {
          const res = await fetch(
            process.env.EXPO_PUBLIC_API_URL + "/api/save-push-token",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            }
          );
          const data = await res.json();
          console.log("Push token envoyé au serveur", data);

          // Stocker localement le token envoyé
          await AsyncStorage.setItem(pushTokenKey, token);
        } catch (err) {
          console.warn("Erreur envoi token", err);
        }
      } else {
        console.log("Token déjà envoyé, pas de nouvel envoi.");
      }
    }

    saveTokenOnce();
    
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return null;
}
