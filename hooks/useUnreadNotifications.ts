import { useState, useEffect } from 'react';
import api from '@/utils/axiosInstance';
import * as Notifications from "expo-notifications";
import { Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  data: {
    pageTitre?: string;
    pageParagraphe?: string;
    pageDeeplink?: string;
    openDirectly?: boolean;
  };
  read: boolean;
}

export default function useUnreadNotifications(token: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsUnread, setNotificationsUnread] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
      const clearBadge = async () => {
      if (Platform.OS === "ios") {
        await Notifications.setBadgeCountAsync(0);
      }
    };

  const fetchNotifications = async () => {
    if (!token) {
      setError("Token manquant");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/api/custom-notifications/token/${token}`
      );

      // ✅ accéder au tableau de notifications dans response.data.data
      const data = response.data;
      if (Array.isArray(data)) {
        const unread = data.filter((n: Notification) => !n.read);
        setNotificationsUnread(unread)
        setNotifications(data);
            clearBadge();
      } else {
        setNotifications([]);
        setError("Aucune notification disponible.");
      }

    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des notifications.");
    } finally {
      setLoading(false);
    }
  };
  const markAsOpened = async (notificationId: string) => {
  try {
    // Vérifier la connexion internet
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      Alert.alert(
        "Pas de connexion",
        "Impossible de marquer la notification comme lue sans internet."
      );
      return; // on sort sans exécuter la requête
    }

    // Si connexion OK → envoyer la requête
    const response = await api.post(`/api/custom-notifications/${notificationId}/add-opened-push-token`, {
      token: token,
    });
await fetchNotifications();
    return response.data;
  } catch (error) {
    console.error("Erreur lors de markAsOpened:", error);
    Alert.alert("Erreur", "Impossible de marquer la notification comme lue.");
  }
};

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  const refetch = async () => {
    await fetchNotifications();
  };
  

  return { notifications,notificationsUnread, loading, error, refetch,markAsOpened };
}