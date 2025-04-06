import PageWrapper from '@/components/PageWrapper';
import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import React, { useMemo, useRef, useState, useEffect } from 'react';

import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous avons besoin de votre autorisation pour utiliser la caméra</Text>
        <Button onPress={requestPermission} title="Autoriser la caméra" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode((current) => (current === 'off' ? 'torch' : 'off'));
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (!isScanning) return;
    
    setScannedBarcode(data);
    setIsScanning(false);
    // Ouvrir au premier point d'arrêt (25%)
    setBottomSheetIndex(0);
  };

  const resetScanner = () => {
    setBottomSheetIndex(-1);
    // Utiliser setTimeout pour s'assurer que le modal est complètement fermé
    // avant de réactiver le scanner
    setTimeout(() => {
      setScannedBarcode(null);
      setIsScanning(true);
    }, 300);
  };
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PageWrapper>
        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            facing={facing}
            flashMode={flashMode}
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
              <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
                <Ionicons name="camera-reverse-outline" size={28} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
                <Ionicons
                  name={flashMode === 'torch' ? 'flash' : 'flash-off'}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </CameraView>

          <BottomSheet
            ref={bottomSheetRef}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            index={bottomSheetIndex}
            onChange={(index) => {
              setBottomSheetIndex(index);
              if (index === -1) {
                resetScanner();
              }
            }}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Text style={styles.modalTitle}>Code-barres scanné</Text>
              <Text style={styles.modalText}>{scannedBarcode}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={resetScanner}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </PageWrapper>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 39,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  scanFrameContainer: {
    width: '80%',
    height: 220,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  scanFrame: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'rgba(252, 236, 167, 0.47)',
    borderRadius: 20,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fceca7',
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
    color: '#fceca7',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 50,
  },
  barcodeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  barcodeText: {
    color: 'white',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  }
});