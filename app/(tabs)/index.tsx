import PageWrapper from "@/components/PageWrapper";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import React, { useMemo, useRef, useState } from "react";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScannerBottomSheet from "@/components/ScannerBottomSheet";

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "50%", "100%"], []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Nous avons besoin de votre autorisation pour utiliser la caméra
        </Text>
        <View style={styles.BtnAutorisation}>
          <Button onPress={requestPermission} title="Autoriser la caméra" />
        </View>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
  };

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (!isScanning) return;

    setScannedBarcode(data);
    setIsScanning(false);
    // Ouvrir au premier point
    setBottomSheetIndex(0);
  };

  const resetScanner = () => {
    setBottomSheetIndex(-1);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    setTimeout(() => {
      setScannedBarcode(null);
      setIsScanning(true);
    }, 100);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
 
        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            facing={facing}
            flash={flashMode}
            enableTorch={flashMode == "on" ? true : false}
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
              <TouchableOpacity
                style={styles.iconButton}
                onPress={toggleCameraFacing}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
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
     
      <ScannerBottomSheet
        bottomSheetRef={bottomSheetRef}
        index={bottomSheetIndex}
        snapPoints={snapPoints}
        barcode={scannedBarcode}
        onClose={resetScanner}
        onIndexChange={(index) => {
          setBottomSheetIndex(index);
          if (index === -1) {
            resetScanner();
          }
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal:5,

  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    borderRadius: 40,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#fff",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  scanFrameContainer: {
    width: "80%",
    height: 220,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  scanFrame: {
    flex: 1,
    borderWidth: 2,
    borderColor: "rgba(252, 236, 167, 0.47)",
    borderRadius: 20,
    position: "relative",
  },
  scanCorner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#fceca7",
  },
  topLeftCorner: {
    top: -2,
    left: -2,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 20,
  },
  topRightCorner: {
    top: -2,
    right: -2,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 20,
  },
  bottomLeftCorner: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 20,
  },
  bottomRightCorner: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 20,
  },
  instructionText: {
    color: "#fceca7",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 50,
  },
  barcodeContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  barcodeText: {
    color: "white",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  BtnAutorisation: {
    padding: 10,
    alignItems: "center",
  },
});
