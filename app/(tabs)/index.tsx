import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';

export default function HomeScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  const screenWidth = Dimensions.get('window').width;
  const scanFrameWidth = screenWidth * 0.7;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous avons besoin de votre autorisation pour utiliser la caméra</Text>
        <Button onPress={requestPermission} title="Autoriser la caméra" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handleBarCodeScanned({ type, data }: { type: string, data: string }) {
    setScannedBarcode(data);
    Alert.alert(
      'Code-barres scanné',
      `Type: ${type}\nContenu: ${data}`,
      [{ text: 'OK', onPress: () => setScannedBarcode(null) }]
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417", "ean13", "code128"],
        }}
        onBarcodeScanned={scannedBarcode ? undefined : handleBarCodeScanned}
      >
        {/* Overlay semi-transparent */}
        <View style={styles.overlay}>
          {/* Cadre de scan avec bordures arrondies */}
          <View style={styles.scanFrameContainer}>
            <View style={styles.scanFrame}>
              <View style={[styles.scanCorner, styles.topLeftCorner]} />
              <View style={[styles.scanCorner, styles.topRightCorner]} />
              <View style={[styles.scanCorner, styles.bottomLeftCorner]} />
              <View style={[styles.scanCorner, styles.bottomRightCorner]} />
            </View>
          </View>
          
          {/* Instructions */}
          <Text style={styles.instructionText}>
            Alignez le code-barres dans le cadre
          </Text>
        </View>

        {/* Bouton de changement de caméra */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Changer de caméra</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      
      {scannedBarcode && (
        <View style={styles.barcodeContainer}>
          <Text style={styles.barcodeText}>Dernier code scanné : {scannedBarcode}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanFrameContainer: {
    width: '70%',
    height: 200,
    backgroundColor: 'transparent',
    borderRadius: 20, // Bordures arrondies
    overflow: 'hidden', // Permet de masquer les débordements
  },
  scanFrame: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20, // Correspond au container
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'white',
  },
  topLeftCorner: {
    top: -2,
    left: -2,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 20, // Arrondi des coins
  },
  topRightCorner: {
    top: -2,
    right: -2,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 20, // Arrondi des coins
  },
  bottomLeftCorner: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 20, // Arrondi des coins
  },
  bottomRightCorner: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 20, // Arrondi des coins
  },
  instructionText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
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
});