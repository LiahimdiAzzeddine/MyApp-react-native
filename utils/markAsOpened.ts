import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";
import api from "@/utils/axiosInstance";
import * as Notifications from "expo-notifications";

export const markAsOpened = async (notificationId: string, token: string) => {
  const clearBadge = async () => {
    if (Platform.OS === "ios") {
      await Notifications.setBadgeCountAsync(0);
    }
  };

  try {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      console.warn("Pas de connexion internet. markAsOpened annulé.");
      return { success: false, message: "Pas de connexion internet" };
    }

   const response = await api.post(`/api/custom-notifications/${notificationId}/add-opened-push-token`, {
      token: token,
    });

    return response.data;
  } catch (error) {
    console.warn("Erreur lors de markAsOpened:", error);
    return { success: false, error };
  } finally {
    await clearBadge();
  }
};
