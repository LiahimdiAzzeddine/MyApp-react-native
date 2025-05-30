import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { StyleSheet, View, Alert, Text, TouchableOpacity } from "react-native";

import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheet } from "@/context/BottomSheetContext";
import { AuthContext } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import useGetProduct from "@/hooks/fp/useGetProduct";
import { addLaterProduct, addProduct } from "@/utils/storage";
import ProductSkeletonLoader from "./fp/ProductSkeletonLoader";
import ModalHeader from "./fp/ModalHeader";
import ProductDetailsView from "./fp/ProductDetailsView";
import { Easing } from "react-native-reanimated";

const CustomBottomSheet: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
    bottomSheetRef,
    closeBottomSheet,
    scannedBarcode,
    setHasRequested,
    setProductName,
    setIsModalEncourager,
  } = useBottomSheet();
  const { userInfo } = useContext(AuthContext);
  const { isOnline } = useAppContext();
  const { productData, loading, error, fetchProduct } = useGetProduct(
    scannedBarcode || ""
  );

  // Définir les snap points avec useMemo pour éviter les re-renders
  const snapPoints = useMemo(() => ["40%", "90%"], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeBottomSheet();
      }
    },
    [closeBottomSheet]
  );

  useEffect(() => {
    if (scannedBarcode && isOnline) {
      fetchProduct();
    }
  }, [scannedBarcode]);

  useEffect(() => {
    if (userInfo && productData) {
      addProduct(productData);
      if (productData.alreadyRequest !== undefined) {
        setHasRequested(productData.alreadyRequest);
      }

      if (productData.name !== undefined) {
        setProductName(productData.name);
      }
    }
  }, [userInfo, productData]);

  const handleAddToLater = async (product: any) => {
    try {
      await addLaterProduct(product);
      Alert.alert("Succès", 'Produit ajouté à la liste "à voir plus tard"');
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite en ajoutant le produit."
      );
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      topInset={insets.top}
      enablePanDownToClose={true}
      handleStyle={styles.handleStyle}
      index={-1}
      enableContentPanningGesture={false} // Désactiver le pan gesture sur le contenu
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      animationConfigs={{
        duration: 500,
        easing: Easing.out(Easing.exp),
      }}
    >
      {/* Option 1: Utiliser BottomSheetView avec BottomSheetScrollView */}
      <BottomSheetView style={styles.container}>
        <ModalHeader goToPage={closeBottomSheet} />
        <BottomSheetScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <ProductSkeletonLoader />
          ) : isOnline ? (
            productData ? (
              <ProductDetailsView productData={productData} />
            ) : (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                  Aucun produit trouvé pour ce code-barres.
                </Text>
              </View>
            )
          ) : (
            <View style={styles.offlineContainer}>
              <Text style={styles.offlineText}>
                Vous êtes hors ligne. Souhaitez-vous sauvegarder ce produit pour
                plus tard ?
              </Text>
              {productData && (
                <TouchableOpacity
                  onPress={() =>
                    handleAddToLater({
                      gtin: productData.gtin,
                      name: "Produit hors ligne",
                      trademark: "N/A",
                      image: "default_image_url",
                    })
                  }
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Sauvegarder</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 700, // Ajouter de l'espace en bas pour le scroll
  },
  handleStyle: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "transparent",
  },
  messageContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 60,
  },
  offlineContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  offlineText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0f548d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CustomBottomSheet;