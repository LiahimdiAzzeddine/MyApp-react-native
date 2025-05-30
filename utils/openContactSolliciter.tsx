import { AuthContext } from "@/context/AuthContext";
import { useBottomSheet } from "@/context/BottomSheetContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Alert } from "react-native";

export const openContactSolliciter = (): void => {
  const { setIsModalEncourager } = useBottomSheet();
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated: boolean = !!userInfo;
  const router = useRouter();

  if (!isAuthenticated) {
    Alert.alert("Attention", "Se connecter pour encourager la marque", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Se connecter",
        onPress: () => router.push("/login"),
      },
    ]);
  } else {
    setIsModalEncourager(true);
  }
};
