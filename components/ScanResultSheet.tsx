import React, { forwardRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface ScanResultSheetProps {
  scannedBarcode: string | null;
  scannedType: string;
  onClose: () => void;
}

const ScanResultSheet = forwardRef<BottomSheet, ScanResultSheetProps>(
  ({ scannedBarcode, scannedType, onClose }, ref) => {
    // Snap points for the bottom sheet
    const snapPoints = ['50%', '75%'];

    // Render custom backdrop
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.7}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.modalBackground}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Résultat du scan</Text>
          
          <View style={styles.barcodeResultContainer}>
            <Text style={styles.barcodeLabel}>Type:</Text>
            <Text style={styles.barcodeValue}>{scannedType}</Text>
          </View>
          
          <View style={styles.barcodeResultContainer}>
            <Text style={styles.barcodeLabel}>Contenu:</Text>
            <Text style={styles.barcodeValue}>{scannedBarcode}</Text>
          </View>
          
          {/* Additional info based on barcode type */}
          <View style={styles.additionalInfoContainer}>
            {scannedType === 'org.iso.QRCode' && (
              <Text style={styles.additionalInfo}>QR Code détecté</Text>
            )}
            {scannedType.includes('EAN') && (
              <Text style={styles.additionalInfo}>Code produit EAN détecté</Text>
            )}
            {(!scannedType.includes('EAN') && scannedType !== 'org.iso.QRCode') && (
              <Text style={styles.additionalInfo}>Code-barres standard détecté</Text>
            )}
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: '#BABABA',
    width: 40,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  barcodeResultContainer: {
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
  },
  barcodeLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  barcodeValue: {
    fontSize: 16,
    color: '#555',
  },
  additionalInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(252, 236, 167, 0.3)',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#fceca7',
  },
  additionalInfo: {
    fontSize: 14,
    color: '#555',
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: '#fceca7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScanResultSheet;