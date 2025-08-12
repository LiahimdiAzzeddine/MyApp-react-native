import React, { useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
     shouldShowBanner: true,
    shouldShowList: true,
  }),
});


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

export default function RegisterPushToken() {
  useEffect(() => {
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
  console.log("🚀 ~ Notification reçue ~:", JSON.stringify(notification, null, 2)); // Tout afficher joliment
  console.log("📦 Data brute :", notification.request.content.data); // Voir uniquement data
});

    const pushTokenKey = process.env.EXPO_PUBLIC_PUSH_TOKEN_KEY ?? "pushToken";
    console.log("🚀 ~ RegisterPushToken ~ pushTokenKey:", pushTokenKey);

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
  }, []);

  return null;
}
