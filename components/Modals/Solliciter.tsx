import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import CustomModal from "./Modal";
import styles from "./style";
import { useBottomSheet } from "@/context/BottomSheetContext";
import useTransparencyRequests from "@/hooks/useTransparencyRequests"; // <-- importe ton hook
import { Link } from "expo-router";
const ArrowLeft = require("@/assets/images/popup/flecheleft.png");

const Solliciter = ({ isOpen, setIsOpen, authUser }: any) => {
  const { hasRequested, productName, scannedBarcode } = useBottomSheet();
  const { handleSubmit, loading, error, sended } = useTransparencyRequests();

  const handleRequest = async () => {
    const formValues = {
      gtin: scannedBarcode,
      productName: productName,
      user_id: authUser?.id, // ou tout autre champ utile
    };

    await handleSubmit(formValues);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <View style={styles.modalContent}>
        <Image
          source={require("@/assets/images/popup/BubbleIImage.png")}
          style={{ width: 70, height: 70 }}
          resizeMode="contain"
        />

        {!hasRequested ? (
          <View style={styles.contentInfo}>
            <Text style={styles.description} className="text-custom-blue">
              Les informations dans les applications ne sont pas toujours
              fiables, alors afin de garantir les données dans TiCO nous avons
              choisi de travailler avec les marques&nbsp;!{" "}
            </Text>
            <View style={styles.container}>
              <Image source={ArrowLeft} style={styles.arrowImage} />
              <TouchableOpacity
                onPress={handleRequest}
                style={styles.button}
                className="bg-custom-blue"
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    style={styles.buttonText}
                    className="text-lg leading-archivo"
                  >
                    Encourager {"\n"} la marque
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {error && (
              <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
            )}
          </View>
        ) : (
          <View style={styles.contentInfo}>
            <Text style={styles.success} className="text-custom-blue">
              Demande effectuée
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("app://mesDemandes")}
            >
              <Link
                href="/hometab/demands"
                style={styles.link}
                className="text-custom-blue"
              >
                Suivre l’état de mes demandes
              </Link>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </CustomModal>
  );
};

export default Solliciter;
