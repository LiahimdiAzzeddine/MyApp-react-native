// components/PersonalInfo.tsx

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import useGetProfile from "@/hooks/auth/useGetProfile";
import useDeleteAccount from "@/hooks/auth/useDeleteAccount";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";
import { WhiteModal } from "@/components/ui/WhiteModal";
import { AuthContext } from "@/context/AuthContext";

const PersonalInfo = () => {
  const router = useRouter();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useGetProfile();
  const { deleteAccount, loading: deleteLoading } = useDeleteAccount();
  const {  logout } = useContext(AuthContext);

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [cachedProfile, setCachedProfile] = useState<any>(null);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const syncProfile = async () => {
      if (profile && isOnline) {
        await AsyncStorage.setItem("cachedProfile", JSON.stringify(profile));
      }

      if (!isOnline) {
        const cached = await AsyncStorage.getItem("cachedProfile");
        if (cached) {
          setCachedProfile(JSON.parse(cached));
        }
      }
    };

    syncProfile();
  }, [profile, isOnline]);

  const displayProfile = isOnline ? profile : cachedProfile;

  const handleDeleteAccount = async () => {
    setShowModalDelete(false);
    const result = await deleteAccount();
    if (result.success) {
      logout();
      Alert.alert("Succès", result.message);
      router.replace("/login");
    } else {
      Alert.alert("Erreur", result.message);
    }
  };

  if (profileLoading && isOnline) {
    return (
      <KeyboardAvoidingView
        className="bg-custom-orange"
        style={{ flex: 1 }}
        behavior={"padding"}
      >
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (profileError && !cachedProfile) {
    return (
      <KeyboardAvoidingView
        className="bg-custom-orange"
        style={{ flex: 1 }}
        behavior={"padding"}
      >
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            Une erreur est survenue lors du chargement du profil.{" "}
            {isOnline ? profileError : "Vérifiez votre connexion internet."}
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (!displayProfile) {
    return (
      <KeyboardAvoidingView
        className="bg-custom-orange"
        style={{ flex: 1 }}
        behavior={"padding"}
      >
        <View style={styles.centered}>
          <Text style={styles.infoText}>
            Aucune information disponible. Connectez-vous à Internet pour
            charger votre profil.
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      className="bg-custom-orange"
      style={{ flex: 1 }}
      behavior={"padding"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {!isOnline && (
            <View style={styles.offlineBanner}>
              <Text style={styles.offlineText}>
                Vous êtes hors ligne. Les informations affichées proviennent du
                cache.
              </Text>
            </View>
          )}

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text className="text-custom-blue text-3xl ClashDisplayBold">
              Mes informations
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View className="w-full max-w-md mb-4">
              <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
                Mon adresse mail
              </Text>
              <Text
                className="w-full p-3 border-2 text-base bg-white border-orange-300"
                style={styles.infoText}
              >
                {displayProfile.email || "Pas d'email disponible"}
              </Text>
            </View>

            <View className="w-full max-w-md mb-4">
              <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
                Mon pseudo
              </Text>
              <Text
                className="w-full p-3 border-2 text-base bg-white border-orange-300"
                style={styles.infoText}
              >
                {displayProfile.username || "Pas de pseudo disponible"}
              </Text>
            </View>

            <View className="flex-1 gap-4">
             <TouchableOpacity
  style={[
    styles.button,
    (!isOnline || !displayProfile) && styles.buttonDisabled,
  ]}
  disabled={!isOnline || !displayProfile}
  onPress={() => {
    if (!isOnline) {
      Alert.alert(
        "Hors ligne",
        "Cette action nécessite une connexion Internet."
      );
      return;
    }
    router.push("/(auth)/changePassword");
  }}
>
  <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
    <Ionicons name="lock-closed" size={20} color="white" />
    <Text className="text-white ArchivoBold text-lg">
      Changer mon mot de passe
    </Text>
  </View>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.button,
    (!isOnline || !displayProfile) && styles.buttonDisabled,
  ]}
  disabled={!isOnline || !displayProfile}
  onPress={() => {
    if (!isOnline) {
      Alert.alert(
        "Hors ligne",
        "Cette action nécessite une connexion Internet."
      );
      return;
    }
    setShowModalDelete(true);
  }}
>
  <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
    <Ionicons name="trash-bin" size={20} color="white" />
    <Text className="text-white ArchivoBold text-lg">
      Supprimer mon compte
    </Text>
  </View>
</TouchableOpacity>

            </View>
          </View>
          <WhiteModal
            isOpen={showModalDelete}
            ContentPadding="ion-padding-top"
            scroll={true}
            onClose={() => setShowModalDelete(false)}
          >
            <View>
              <Text style={styles.modalTitle}>Supprimer le compte</Text>
              <Text style={{ marginVertical: 10, fontFamily: "Archivo" }}>
                Êtes-vous sûr de vouloir supprimer votre compte ?{"\n"}
                Cette action est irréversible.
              </Text>
              <View style={styles.modalActions}>
                <Pressable
                  onPress={() => setShowModalDelete(false)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelText}>Annuler</Text>
                </Pressable>
                <Pressable
                  onPress={handleDeleteAccount}
                  style={styles.deleteBtn}
                >
                  <Text style={styles.deleteText}>Supprimer</Text>
                </Pressable>
              </View>
            </View>
          </WhiteModal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffeda3",
    padding: 25,
    flexGrow: 1,
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  offlineBanner: {
    backgroundColor: "#FFF3CD",
    padding: 10,
    marginBottom: 10,
  },
  offlineText: {
    color: "#856404",
    textAlign: "center",
    fontFamily: "Archivo",
  },

  infoText: {
    borderRadius: 15,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },

  modalTitle: {
    fontSize: 18,
    color: "#0F548D",
    fontFamily: "ArchivoBold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  cancelBtn: {
    marginRight: 20,
  },
  deleteBtn: {},
  cancelText: {
    color: "#0F548D",
    fontFamily: "ArchivoBold",
  },
  deleteText: {
    color: "red",
    fontFamily: "ArchivoBold",
  },
  button: {
    backgroundColor: "#FF8200",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#FFB877", // plus clair pour montrer l'état désactivé
  },
});

export default PersonalInfo;
