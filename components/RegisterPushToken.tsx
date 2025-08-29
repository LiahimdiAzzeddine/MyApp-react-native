import React, { useEffect } from "react";
import { Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import NetInfo from "@react-native-community/netinfo";
import { markAsOpened } from "@/utils/markAsOpened";

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
  openDirectly?: boolean;
  notificationId?: number;
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

const handleOpenDeeplink = (pageDeeplink: string) => {
  if (pageDeeplink) {
    Linking.openURL(pageDeeplink);
  }
};

// Fonction améliorée pour gérer l'envoi avec retry et offline
async function sendTokenToServer(
  token: string,
  maxRetries = 3
): Promise<boolean> {
  const pushTokenKey = process.env.EXPO_PUBLIC_PUSH_TOKEN_KEY ?? "pushToken";

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Vérifier la connexion réseau
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        console.log(`Tentative ${attempt}: Pas de connexion internet`);
        if (attempt === maxRetries) {
          // Marquer le token comme "en attente d'envoi"
          await AsyncStorage.setItem(`${pushTokenKey}_pending`, token);
          return false;
        }
        // Attendre avant de retry
        await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
        continue;
      }

      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/api/save-push-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
          // Timeout pour éviter les blocages
        }
      );

      // Vérifier le statut HTTP
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Push token envoyé au serveur", data);

      // Succès : sauvegarder le token et supprimer le pending
      await AsyncStorage.setItem(pushTokenKey, token);
      await AsyncStorage.removeItem(`${pushTokenKey}_pending`);
      return true;
    } catch (error) {
      console.warn(`Tentative ${attempt} d'envoi du token échouée:`, error);

      if (attempt === maxRetries) {
        // Dernière tentative : marquer comme pending
        await AsyncStorage.setItem(`${pushTokenKey}_pending`, token);
        return false;
      }

      // Attendre avant de retry (backoff exponentiel)
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempt - 1))
      );
    }
  }

  return false;
}

// Fonction pour traiter les tokens en attente
async function processPendingTokens() {
  const pushTokenKey = process.env.EXPO_PUBLIC_PUSH_TOKEN_KEY ?? "pushToken";
  const pendingToken = await AsyncStorage.getItem(`${pushTokenKey}_pending`);

  if (pendingToken) {
    console.log("Tentative d'envoi du token en attente...");
    const success = await sendTokenToServer(pendingToken);
    if (success) {
      console.log("Token en attente envoyé avec succès");
    }
  }
}

// Fonction pour traiter une notification
async function handleNotificationData(data: NotificationData, router: any) {
  const notificationId = data.notificationId;
  const openDirectly = data.openDirectly ?? false;
  const pushTokenKey = process.env.EXPO_PUBLIC_PUSH_TOKEN_KEY ?? "pushToken";
  const storedToken = await AsyncStorage.getItem(pushTokenKey);
  
  const isEmpty =
    data == null || // null ou undefined
    (typeof data === "object" && Object.keys(data).length === 0); // objet vide

  // Marquer la notif comme ouverte sur le serveur
  if (notificationId && storedToken) {
    try {
      await markAsOpened(String(notificationId), storedToken);
    } catch (e) {
      console.warn("Erreur markAsOpened:", e);
    }
  }

  if (!isEmpty) {
    if (openDirectly === true) {
      if (data.pageDeeplink) {
        // Petit délai pour s'assurer que l'app est prête
        setTimeout(() => {
          handleOpenDeeplink(data.pageDeeplink!);
        }, 100);
      } else {
        console.warn("⚠️ pageDeeplink est vide, impossible de rediriger.");
      }
    } else {
      // Petit délai pour s'assurer que le router est prêt
      setTimeout(() => {
        router.push({
          pathname: "/notification-details",
          params: {
            pageTitre: data.pageTitre ?? "",
            pageParagraphe: data.pageParagraphe ?? "",
            pageDeeplink: data.pageDeeplink ?? "",
          },
        });
      }, 100);
    }
  }
}

export default function RegisterPushToken() {
  const router = useRouter();

  useEffect(() => {
    // Vérifier s'il y a une notification qui a ouvert l'app (app fermée)
    const checkInitialNotification = async () => {
      try {
        const response = await Notifications.getLastNotificationResponseAsync();
        if (response) {
          console.log("📱 App ouverte par notification (app fermée)");
          const data = response.notification.request.content.data as NotificationData;
          await handleNotificationData(data, router);
        }
      } catch (error) {
        console.warn("Erreur lors de la vérification de la notification initiale:", error);
      }
    };


    const notificationListener = Notifications.addNotificationReceivedListener(
      async (notification) => {
        if (Platform.OS === "ios") {
          const currentCount = await Notifications.getBadgeCountAsync();
          await Notifications.setBadgeCountAsync(currentCount + 1);
        }
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          console.log("📱 Notification tapée (app en arrière-plan/foreground)");
          const data = response.notification.request.content
            .data as NotificationData;
          console.log("🚀 ~ addNotificationResponseReceivedListener ~ data:", data);
          
          await handleNotificationData(data, router);
        }
      );

    // Gestionnaire de changement d'état réseau
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        // Connexion rétablie : traiter les tokens en attente
        processPendingTokens();
      }
    });

    async function saveTokenOnce() {
      const token = await registerForPushNotificationsAsync();
      if (!token) return;

      const pushTokenKey =
        process.env.EXPO_PUBLIC_PUSH_TOKEN_KEY ?? "pushToken";
      const storedToken = await AsyncStorage.getItem(pushTokenKey);
      console.log("🚀 ~ saveTokenOnce ~ storedToken:", storedToken);

      if (storedToken !== token) {
        const success = await sendTokenToServer(token);
        if (!success) {
          console.log("Token sera envoyé lors de la prochaine connexion");
        }
      } else {
        console.log("Token déjà envoyé, pas de nouvel envoi.");
        // Vérifier s'il y a des tokens en attente à traiter
        await processPendingTokens();
      }
    }

    // Initialisation
    saveTokenOnce();
    
    // Vérifier les notifications au démarrage (pour les apps fermées)
    checkInitialNotification();

    return () => {
      notificationListener.remove();
      responseListener.remove();
      unsubscribeNetInfo();
    };
  }, []); 

  return null;
}