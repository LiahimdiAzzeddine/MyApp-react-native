import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import useGetProduct from '@/hooks/fp/useGetProduct';
import GlobalInfo from './fp/GlobalInfo';
import ModalHeader from './fp/ModalHeader';

interface ScannerBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  index: number;
  snapPoints: string[];
  barcode: string | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function ScannerBottomSheet({
  bottomSheetRef,
  index,
  snapPoints,
  barcode,
  onClose,
  onIndexChange,
}: ScannerBottomSheetProps) {
  //hook useGetProduct
  const { productData, loading, error, fetchProduct } = useGetProduct(barcode || '');

  useEffect(() => {
    if (barcode) {
      fetchProduct();
    }
  }, [barcode]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose
      enableDynamicSizing
      index={index}
      snapPoints={snapPoints}
      onChange={onIndexChange}
    >
      <BottomSheetView style={styles.contentContainer}>
        <ModalHeader goToPage={onClose} /> 
        
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : error ? (
          <Text style={styles.modalText}>{error}</Text>
        ) : productData ? (
          <GlobalInfo 
            ImageSrc={productData.image} 
            Name={productData.name} 
            Brand={productData.trademark} 
            Transparent={0} 
          />
        ) : (
          <Text style={styles.modalText}>Aucun produit trouvé pour ce code-barres.</Text>
        )}
       {/**
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>*/}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop:0,
    marginTop:0,
    alignItems: 'center',
  },

  modalText: {
    fontSize: 16,
    marginBottom: 20,
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
