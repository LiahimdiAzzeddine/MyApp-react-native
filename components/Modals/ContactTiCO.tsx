import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
//import { useProductIssues } from "../hooks/useProductIssues"; // adapte le chemin selon ton projet
import CustomModal from "./Modal";
const BubbleImage = require('@/assets/images/popup/BubbleIImage.png');
const ArrowLeft = require('@/assets/images/popup/flecheleft.png');
interface ContactTiCOProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  authUser: { id: number };
  gtin: string;
}

const ContactTiCO: React.FC<ContactTiCOProps> = ({ isOpen, setIsOpen, authUser, gtin }) => {
  const [message, setMessage] = useState<string>("");
  const { handleSubmit, loading, error, sended } = useProductIssues();

  const handleSend = async () => {
    if (!message.trim()) {
      Alert.alert("Erreur", "Veuillez écrire un message avant d'envoyer.");
      return;
    }

    const formValues = {
      user_id: authUser.id,
      message,
      gtin,
    };

    await handleSubmit(formValues);
  };

  return (
    <CustomModal visible={isOpen} onClose={() => setIsOpen(false)}>
      <View style={{ alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Image source={BubbleImage} style={{ width: 80, height: 80, resizeMode: "contain", marginBottom: 10 }} />

        {loading ? (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator size="large" color="#1D8F6E" />
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold", color: "#004C98" }}>
              Envoi en cours...
            </Text>
          </View>
        ) : sended ? (
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#004C98", textAlign: "center" }}>
            Merci, votre signalement a bien été pris en compte !
          </Text>
        ) : (
          <>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Image source={FlecheLeft} style={{ width: 24, height: 24, marginRight: 8 }} />
              <Text style={{ fontSize: 18, color: "#004C98", fontFamily: "ArchivoLight" }}>
                Contacter <Text style={{ fontWeight: "bold" }}>TiCO</Text>
              </Text>
            </View>

            <Text style={{ fontSize: 16, color: "#004C98", fontFamily: "ArchivoLight", marginBottom: 10 }}>
              Un problème sur la fiche produit ? Dites-nous en plus :
            </Text>

            <TextInput
              multiline
              placeholder="Votre message..."
              value={message}
              onChangeText={setMessage}
              style={{
                borderWidth: 1,
                borderColor: "#1D8F6E",
                borderRadius: 12,
                minHeight: 100,
                width: "100%",
                padding: 10,
                marginBottom: 10,
              }}
            />

            {error && (
              <Text style={{ color: "red", fontSize: 12 }}>
                Erreur : {JSON.stringify(error)}
              </Text>
            )}

            <TouchableOpacity
              style={{
                backgroundColor: "#1D8F6E",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                marginTop: 10,
              }}
              onPress={handleSend}
              disabled={loading}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Envoyer</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </CustomModal>
  );
};

export default ContactTiCO;
