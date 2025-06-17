import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
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
import { usePathname } from "expo-router";

const CustomBottomSheet: React.FC = () => {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [isAlreadySaved, setIsAlreadySaved] = useState(false);
  const [isOpenIndex, setIsOpenIndex] = useState(0);
  
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  
  const {
    bottomSheetRef,
    closeBottomSheet,
    isOpen,
    scannedBarcode,
    setHasRequested,
    setProductName,
    setIsModalEncourager,
    hasRequested,
  } = useBottomSheet();
  
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;
  const { isOnline } = useAppContext();
  const { productData, loading, error, fetchProduct } = useGetProduct(
    scannedBarcode || ""
  );

  // Nettoyage sécurisé lors du changement de route
  // useEffect(() => {
  //   if (pathname !== "/" && pathname !== "/index" && isOpen) {
  //     try {
  //       closeBottomSheet();
  //     } catch (error) {
  //       console.error("Error closing bottom sheet:", error);
  //     }
  //   }
  // }, [pathname, isOpen]);

  const snapPoints = useMemo(() => ["40%", "100%"], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      try {
        if (index === -1) {
          closeBottomSheet();
        }
        setIsOpenIndex(index);
      } catch (error) {
        console.error("Error handling sheet changes:", error);
      }
    },
    [closeBottomSheet]
  );

  // Fetch product avec gestion d'erreur améliorée
  useEffect(() => {
    if (scannedBarcode && isOnline) {
      try {
        fetchProduct();
        setHasScrolledDown(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
  }, [scannedBarcode, isOnline]);

  // Gestion sécurisée des données produit
  useEffect(() => {
    if (userInfo && productData) {
      try {
        // Vérification des données avant traitement
        if (productData && typeof productData === 'object') {
          addProduct(productData);
          
          if (productData.alreadyRequest !== undefined) {
            setHasRequested(productData.alreadyRequest);
          }

          if (productData.name !== undefined && productData.name !== null) {
            setProductName(productData.name);
          }
        }
      } catch (error) {
        console.error("Error processing product data:", error);
        // Ne pas crasher l'app, juste logger l'erreur
      }
    }
  }, [userInfo, productData, setHasRequested, setProductName]);

  const handleAddToLater = useCallback(async (product: any) => {
    try {
      // Validation des données produit
      if (!product || typeof product !== 'object') {
        throw new Error("Invalid product data");
      }

      await addLaterProduct(product);
      setIsAlreadySaved(true);
      Alert.alert("Succès", 'Produit ajouté à la liste "à voir plus tard"');
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite en ajoutant le produit."
      );
    }
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    try {
      const yOffset = event?.nativeEvent?.contentOffset?.y || 0;

      if (
        yOffset >= 35 &&
        !hasScrolledDown &&
        !hasRequested &&
        isAuthenticated &&
        isOpenIndex === 1 && // Utilisation de === au lieu de ==
        isOnline
      ) {
        setHasScrolledDown(true);
        setIsModalEncourager(true);
      }
    } catch (error) {
      console.error("Error handling scroll:", error);
    }
  }, [hasScrolledDown, hasRequested, isAuthenticated, isOpenIndex, isOnline, setIsModalEncourager]);

  // Données par défaut pour le produit hors ligne
  const defaultOfflineProduct = useMemo(() => ({
    gtin: scannedBarcode || "",
    name: "Produit hors ligne",
    trademark: "N/A",
    image: "default_image_url",
  }), [scannedBarcode]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
      topInset={insets.top}
      enablePanDownToClose={true}
      handleStyle={styles.handleStyle}
      keyboardBehavior="extend" // Changé de "interactive" à "extend" pour iOS
      keyboardBlurBehavior="restore"
      animationConfigs={{
        duration: 300, // Réduit de 500 à 300ms
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Animation plus stable
      }}
    >
      <ModalHeader goToPage={closeBottomSheet} />
      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        onScroll={handleScroll}
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
            {scannedBarcode && (
              <TouchableOpacity
                onPress={() => handleAddToLater(defaultOfflineProduct)}
                style={[styles.button, isAlreadySaved && styles.buttonDisabled]}
                disabled={isAlreadySaved}
                activeOpacity={0.7} // Ajout pour améliorer l'UX
              >
                <Text style={styles.buttonText}>
                  {isAlreadySaved ? "Déjà sauvegardé" : "Sauvegarder"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  testContent: {
    backgroundColor: "#e3f2fd",
    padding: 20,
    margin: 10,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  testText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  testItem: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 100,
    minHeight: 600,
    flexGrow: 1,
  },
  handleStyle: {
    paddingTop: 8,
    paddingBottom: 5,
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