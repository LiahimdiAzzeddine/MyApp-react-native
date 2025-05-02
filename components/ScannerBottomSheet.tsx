import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ActivityIndicator, View, Alert, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import useGetProduct from '@/hooks/fp/useGetProduct';
import ModalHeader from './fp/ModalHeader';
import { addProduct } from '@/utils/storage';  // Fonction d'ajout à l'historique
import { addLaterProduct } from '@/utils/storage'; // Fonction d'ajout "plus tard"
import NetInfo from '@react-native-community/netinfo';  // Importation de NetInfo
import { useGlobalContext } from '@/context/GlobalFpContext';
import ProductSkeletonLoader from './fp/ProductSkeletonLoader';
import ProductDetailsView from './fp/ProductDetailsView';

interface ScannerBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  index: number;
  snapPoints: string[];
  barcode: string | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  isAuthenticated: boolean; // Propriété pour vérifier si l'utilisateur est connecté
}

export default function ScannerBottomSheet({
  bottomSheetRef,
  index,
  snapPoints,
  barcode,
  onClose,
  onIndexChange,
  isAuthenticated,
}: ScannerBottomSheetProps) {
  // Gestion de l'état de la connexion
  const [isOnline, setIsOnline] = useState<boolean>(true);  // Par défaut, on considère que l'utilisateur est en ligne
  const { productData, loading, error, fetchProduct } = useGetProduct(barcode || '');
  const { setHasRequested, hasRequested, isCourager, setIsCourager } = useGlobalContext();

  useEffect(() => {
    // Écoute des changements de l'état de la connexion réseau
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);  // Met à jour l'état en fonction de la connexion
    });

    // Effectue la récupération du produit si un code-barres est fourni
    if (barcode) {
      fetchProduct();
    }

    // Nettoyage de l'écouteur à la désactivation du composant
    return () => unsubscribe();
  }, [barcode]);

  useEffect(() => {
    // Si l'utilisateur est connecté et que nous avons des données de produit, on l'ajoute à l'historique automatiquement
    if (isAuthenticated && productData) {
      addProduct(productData);
      if (productData.alreadyRequest !== undefined) {
        setHasRequested(productData.alreadyRequest);
      }
    }
  }, [isAuthenticated, productData]); // Effectue l'ajout quand l'utilisateur est connecté et qu'on a des données de produit

  const handleAddToLater = async (product: any) => {
    try {
      await addLaterProduct(product);
      Alert.alert('Succès', 'Produit ajouté à la liste "à voir plus tard"');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite en ajoutant le produit.');
    }
  };

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
         <ProductSkeletonLoader />
        ) : isOnline ? (
          // Si l'utilisateur est en ligne
          productData ? (
            <ProductDetailsView productData={productData} />
          ) : (
            <Text style={styles.modalText}>Aucun produit trouvé pour ce code-barres.</Text>
          )
        ) : (
          // Si l'utilisateur est hors ligne
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>Vous êtes hors ligne. Souhaitez-vous sauvegarder ce produit pour plus tard ?</Text>
            {barcode && (
              <TouchableOpacity
                onPress={() => handleAddToLater({ gtin: barcode, name: 'Produit hors ligne', trademark: 'N/A', image: 'default_image_url' })}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Sauvegarder</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  offlineContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  offlineText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0f548d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  }
});
