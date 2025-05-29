import React, { useState, useCallback, useEffect, useRef, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, CameraType, useCameraPermissions, FlashMode } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import { styles } from "./style";
import CustomButton from "@/components/ui/CustomButton";
import { useBottomSheet } from "@/context/BottomSheetContext";
import Solliciter from "@/components/Modals/Solliciter";
import { AuthContext } from "@/context/AuthContext";
import NutrriInfo from "@/components/Modals/NutrriInfo";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [isCameraActive, setIsCameraActive] = useState(true);
  const { colors } = useTheme();
  const { openBottomSheet, setScannedBarcode, isScanning,isModalEncourager,setIsModalEncourager,isModalNutrition,setIsModalNutrition } = useBottomSheet();
 const { userInfo } = useContext(AuthContext);
  // Utiliser useFocusEffect pour détecter quand l'écran est activé/désactivé
  useFocusEffect(
    useCallback(() => {
      // Quand l'écran reçoit le focus, activer la caméra
      setIsCameraActive(true);
      
      // Quand l'écran perd le focus, désactiver la caméra
      return () => {
        setIsCameraActive(false);
      };
    }, [])
  );

  const toggleFlash = useCallback(() => {
    setFlashMode((prev) => (prev === "off" ? "on" : "off"));
  }, []);
  
  const handleBarCodeScanned = useCallback(
    ({ type, data }: { type: string; data: string }) => {
      if (!isScanning) return;
      setScannedBarcode(data);
      openBottomSheet();
    },
    [isScanning, openBottomSheet, setScannedBarcode]
  );

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center px-10">
          <Text className="py-6 text-center font-extrabold Archivo">
            Nous avons besoin de votre autorisation pour utiliser la caméra
          </Text>
          <View className="items-center">
            <CustomButton
              title="Autoriser la caméra"
              onPress={requestPermission}
              style={{
                width: "100%",
                maxWidth: 210,
                minWidth: 150,
                backgroundColor: (colors as any)["custom-blue"],
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <>
    <View className="flex-1 bg-white">
      <View style={styles.containerScan}>
        {isCameraActive && (
          <CameraView
            style={styles.camera}
            facing={"back"}
            flash={flashMode}
            enableTorch={flashMode === "on"}
            onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
          >
            <View style={styles.overlay}>
              <View style={styles.scanFrameContainer}>
                <View style={styles.scanFrame}>
                  <View style={[styles.scanCorner, styles.topLeftCorner]} />
                  <View style={[styles.scanCorner, styles.topRightCorner]} />
                  <View style={[styles.scanCorner, styles.bottomLeftCorner]} />
                  <View style={[styles.scanCorner, styles.bottomRightCorner]} />
                </View>
              </View>
              <Text style={styles.instructionText}>
                {isScanning
                  ? "Alignez le code-barres dans le cadre"
                  : "Code scanné ! Fermer pour scanner à nouveau"}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
                <Ionicons
                  name={flashMode === "on" ? "flash" : "flash-off"}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </CameraView>
        )}
      </View>
    </View>
    <Solliciter isOpen={isModalEncourager}  setIsOpen={setIsModalEncourager} authUser={userInfo} />
    
    </>
  );
}