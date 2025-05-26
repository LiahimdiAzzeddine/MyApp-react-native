import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { DemandType, formatDate } from "@/types/Demand";
import styles from "../history/style";
const productBg = require("@/assets/images/recipes/productBg.png");
type DemandeProps = {
  demande: DemandType;
  index: number;
  length: number;
  incrementInsistCount: (
    id: number,
    setDemandeState: React.Dispatch<React.SetStateAction<DemandType>>
  ) => Promise<void>;
  press: any;
};

const Demand = ({ demande, incrementInsistCount, press }: DemandeProps) => {
  const [demandeState, setDemandeState] = useState<DemandType>(demande);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!demande) return null;

  const peutInsister =
    (demandeState.last_insist_at &&
      (new Date().getTime() - new Date(demandeState.last_insist_at).getTime()) /
        (1000 * 60 * 60 * 24) >
        30) ||
    demandeState.insist_count === 0 ||
    demandeState.insist_count === null;
  const handleIncrement = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await incrementInsistCount(demandeState.id, setDemandeState);
      Alert.alert("Succès", "Votre demande d'insistance a bien été envoyée.");
    } catch (error) {
      setError("Erreur lors de l'incrémentation.");
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'envoi de la demande. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          press(demandeState.id);
        }}
      >
        <ImageBackground
          source={productBg}
          resizeMode="contain"
          style={styles.imageBackground}
        >
          <Image
            source={
              demandeState.image
                ? {
                    uri: `https://images.openfoodfacts.org/images/products/${demandeState.image}`,
                  }
                : require("@/assets/images/demands/NoPicture.png")
            }
            style={styles.productImage}
            resizeMode="contain"
          />
        </ImageBackground>

        <View style={{ flex: 1 }}>
          <Text className="text-custom-green-text text-s ArchivoLight leading-archivo italic">
            {formatDate(demandeState.created_at)}
          </Text>
          <Text className="text-custom-green-text leading-archivo ArchivoExtraBold text-sm">
            {demandeState.titre}
          </Text>
          <Text className="text-custom-green-text text-s ArchivoLight leading-archivo italic">
            {demandeState.marque}
          </Text>
        </View>

        {peutInsister && demandeState.status !== "processing" && (
          <TouchableOpacity
            onPress={handleIncrement}
            disabled={loading}
            style={{
              padding: 6,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 8,
              borderColor: "#42a199",
              borderWidth: 1,
              // Ombre pour iOS
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#3b82f6"
                style={{ width: 40, height: 40 }}
              />
            ) : (
              <Image
                source={require("@/assets/images/demands/addOutline.png")}
                style={{ width: 35, height: 35 }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        )}

        <View
          style={{ padding: 8, justifyContent: "center", alignItems: "center" }}
        >
          {demandeState.status === "processing" && (
            <Image
              source={require("@/assets/images/demands/processing.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          )}
          {demandeState.status === "pending" && (
            <Image
              source={require("@/assets/images/demands/pending.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          )}
          {demandeState.status === "rejected" && (
            <Image
              source={require("@/assets/images/demands/rejected.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          )}
        </View>
      </TouchableOpacity>
      {error && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Demand;
