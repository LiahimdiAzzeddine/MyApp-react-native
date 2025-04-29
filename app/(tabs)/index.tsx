import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import React, { useMemo, useRef, useState, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import ScannerBottomSheet from "@/components/ScannerBottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./style"
import { AuthContext } from "@/context/AuthContext";
import { GlobalFpProvider } from "@/context/GlobalFpContext";

export default function Scanner() {
  // États
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [isScanning, setIsScanning] = useState(true);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
    const { userInfo } = useContext(AuthContext);
  
  
  // Refs
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // Variables mémorisées
  const snapPoints = useMemo(() => ["35%", "50%", "100%"], []);

  // Gestionnaires d'événements mémorisés
  const toggleCameraFacing = useCallback(() => {
    setFacing(current => (current === "back" ? "front" : "back"));
  }, []);

  const toggleFlash = useCallback(() => {
    setFlashMode(current => (current === "off" ? "on" : "off"));
  }, []);

  const handleBarCodeScanned = useCallback(({ type, data }: { type: string; data: string }) => {
    if (!isScanning) return;

    setScannedBarcode(data);
    setIsScanning(false);
    setBottomSheetIndex(1);
  }, [isScanning]);

  const resetScanner = useCallback(() => {
    setBottomSheetIndex(-1);
    bottomSheetRef.current?.close();
    
    setTimeout(() => {
      setScannedBarcode(null);
      setIsScanning(true);
    }, 100);
  }, []);

  const handleSheetIndexChange = useCallback((index: number) => {
    setBottomSheetIndex(index);
    if (index === -1) {
      resetScanner();
    }
  }, [resetScanner]);

  // Gestion des permissions
  if (!permission) return <View />;
  
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-white justify-center">
          <Text className="px-10 py-5 text-center font-extrabold">
            Nous avons besoin de votre autorisation pour utiliser la caméra
          </Text>
          <View className="px-10 text-center items-center">
            <Button 
              onPress={requestPermission} 
              title="Autoriser la caméra" 
              color="#6dc3bc" 
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View style={styles.containerScan}>
        <CameraView
          style={styles.camera}
          facing={facing}
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
                : "Code scanné! Fermer pour scanner à nouveau"}
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
      </View>
      <GlobalFpProvider>
     
      <ScannerBottomSheet
        bottomSheetRef={bottomSheetRef}
        index={bottomSheetIndex}
        snapPoints={snapPoints}
        barcode={scannedBarcode}
        onClose={resetScanner}
        onIndexChange={handleSheetIndexChange} isAuthenticated={userInfo?true:false}      />
        </GlobalFpProvider>
    </View>
  );
}
