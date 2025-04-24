import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { DemandType, formatDate } from "@/types/Demand";

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
    } catch {
      setError("Erreur lors de l'incrémentation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingVertical: 8 }}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          press(demandeState.id);
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            marginRight: 16,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image
            source={
              demandeState.image
                ? {
                    uri: `https://images.openfoodfacts.org/images/products/${demandeState.image}`,
                  }
                : require("@/assets/images/demands/NoPicture.png")
            }
            style={{ width: 56, height: 56, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontStyle: "italic", color: "#14532d" }}>
            {formatDate(demandeState.created_at)}
          </Text>
          <Text style={{ fontWeight: "bold", color: "#14532d" }}>
            {demandeState.titre}
          </Text>
          <Text style={{ fontSize: 12, fontStyle: "italic", color: "#14532d" }}>
            {demandeState.marque}
          </Text>
        </View>

        {peutInsister && demandeState.status !== "processing" && (
          <TouchableOpacity
            onPress={handleIncrement}
            disabled={loading}
            style={{
              padding: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#3b82f6" />
            ) : (
              <Image
                source={require("@/assets/images/demands/addOutline.png")}
                style={{ width: 40, height: 40 }}
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
            />
          )}
          {demandeState.status === "pending" && (
            <Image
              source={require("@/assets/images/demands/pending.png")}
              style={{ width: 40, height: 40 }}
            />
          )}
          {demandeState.status === "rejected" && (
            <Image
              source={require("@/assets/images/demands/rejected.png")}
              style={{ width: 40, height: 40 }}
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
