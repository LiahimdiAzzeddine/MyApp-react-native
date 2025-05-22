import React, { useCallback, useContext, useEffect } from "react";
import { StyleSheet, View, Alert, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
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
  const { bottomSheetRef, closeBottomSheet, scannedBarcode, setHasRequested,setProductName } =
    useBottomSheet();
  const { userInfo } = useContext(AuthContext);
  const { isOnline } = useAppContext();
  const { productData, loading, error, fetchProduct } = useGetProduct(
    scannedBarcode || ""
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeBottomSheet();
      }
    },
    [closeBottomSheet]
  );
  useEffect(() => {
    // Effectue la récupération du produit si un code-barres est fourni
    if (scannedBarcode && isOnline) {
      fetchProduct();
    }
  }, [scannedBarcode]);
  useEffect(() => {
    // Si l'utilisateur est connecté et que nous avons des données de produit, on l'ajoute à l'historique automatiquement
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
      snapPoints={["40%", "100%"]}
      topInset={insets.top}
      enablePanDownToClose={true}
      handleStyle={styles.handleStyle}
      index={-1}
      enableContentPanningGesture={true}
      animationConfigs={{
        duration: 500,
        easing: Easing.out(Easing.exp),
      }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <ModalHeader goToPage={closeBottomSheet} />

        {loading ? (
          <ProductSkeletonLoader />
        ) : isOnline ? (
          // Si l'utilisateur est en ligne
          productData ? (
            <ProductDetailsView productData={productData} />
          ) : (
            <Text style={styles.modalText}>
              Aucun produit trouvé pour ce code-barres.
            </Text>
          )
        ) : (
          // Si l'utilisateur est hors ligne
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>
              Vous êtes hors ligne. Souhaitez-vous sauvegarder ce produit pour
              plus tard ?
            </Text>
            {productData && (
              <TouchableOpacity
                onPress={() =>
                  handleAddToLater({
                    gtin: productData,
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
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  handleStyle: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "transparent",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    alignItems: "center",
  },

  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  offlineContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  offlineText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
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
