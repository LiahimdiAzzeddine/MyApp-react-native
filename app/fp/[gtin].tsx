import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "@/context/AuthContext";
import { useBottomSheet } from "@/context/BottomSheetContext";

import useGetProduct from "@/hooks/fp/useGetProduct";
import ProductSkeletonLoader from "@/components/fp/ProductSkeletonLoader";
import ProductDetailsView from "@/components/fp/ProductDetailsView";
import {
  getProductByBarcode,
  addProduct,
  addLaterProduct,
} from "@/utils/storage";
import { Product } from "@/types/product";
import { useAppContext } from "@/context/AppContext";

const ProductDetailsSheetLikePage = () => {
  const { gtin, search } = useLocalSearchParams<{
    gtin?: string;
    search?: string;
  }>();
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;

  const isOnlineSearch = search === "true";
  const {
    productData,
    loading: onlineLoading,
    fetchProduct,
  } = useGetProduct(String(gtin));
  const [localProduct, setLocalProduct] = useState<Product | null>(null);
  const [localLoading, setLocalLoading] = useState(true);
  const { isOnline } = useAppContext();
  const [isAlreadySaved, setIsAlreadySaved] = useState(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  const {
    setScannedBarcode,
    setHasRequested,
    setProductName,
    setIsModalEncourager,
    hasRequested,
    scrollRefpage,
  } = useBottomSheet();

  // 🔹 Fetch local
  useEffect(() => {
    if (!isOnlineSearch && gtin) {
      const fetchLocal = async () => {
        const product = await getProductByBarcode(gtin);
        setLocalProduct(product);
        setLocalLoading(false);
        setScannedBarcode(String(gtin));
      };
      fetchLocal();
    }
  }, [gtin, isOnlineSearch]);

  // 🔹 Fetch online

  useEffect(() => {
  if (isOnlineSearch && gtin) {
    fetchProduct();
    setScannedBarcode(String(gtin));
  }
}, [gtin, isOnlineSearch]);


  // 🔹 Save history if user is authenticated
  useEffect(() => {
    if (isAuthenticated && productData) {
      addProduct(productData);
      if (productData.name) setProductName(productData.name);
      if (productData.alreadyRequest !== undefined) {
        setHasRequested(productData.alreadyRequest);
      }
    }
  }, [productData]);

  // 🔹 Scroll handler to trigger popup
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (
      yOffset > 0 &&
      !hasScrolledDown &&
      !hasRequested &&
      isAuthenticated &&
      isOnline
    ) {
      setHasScrolledDown(true);
      setIsModalEncourager(true);
    }
  };

  // 🔹 Add to later
  const handleAddToLater = async () => {
    try {
      if (gtin) {
        await addLaterProduct({
          gtin: gtin,
          name: "Produit hors ligne",
          trademark: "N/A",
          image: "default_image_url",
          commentaire: undefined,
          isFoodheaProduct: false,
          generic_name: null,
          transparency_scale: 0,
          markInfo: null,
          provider: null,
          nutriscore: null,
          nova: null,
          additifs: [],
          adviceconso: null,
          planetScore: "",
          nutriscore_comment: null,
          recipes: [],
          portion: null,
          portioneq: null,
          useportion: null,
          unit: null,
          lines: [],
          ingredients: [],
          allergens: [],
          origin: [],
          emballage: null,
          transformation: null,
          transcondi: null,
          alreadyRequest: false,
          scores: undefined,
          conservation: undefined,
          utilisation: undefined,
          engagements: undefined,
        });
        setIsAlreadySaved(true);
        Alert.alert("Succès", "Produit ajouté à la liste 'à voir plus tard'");
      } else {
        Alert.alert("erreur", "Non grin");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit", error);
      Alert.alert("Erreur", "Impossible d’ajouter le produit.");
    }
  };

  const isLoading = isOnlineSearch ? onlineLoading : localLoading;
  const product = isOnlineSearch ? productData : localProduct;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
      edges={["bottom"]}
    >
      <View style={styles.container}>
        {isLoading ? (
          <ProductSkeletonLoader />
        ) : product ? (
          <ScrollView
            ref={scrollRefpage}
            style={styles.sheet}
            contentContainerStyle={{ paddingBottom: 80 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            <ProductDetailsView productData={product} />
          </ScrollView>
        ) : (
          <View style={styles.offlineContainer}>
            {!isOnline ? (
              <>
                <Text style={styles.offlineText}>
                  Vous êtes hors ligne. Souhaitez-vous sauvegarder ce produit
                  pour plus tard ?
                </Text>
                <TouchableOpacity
                  onPress={handleAddToLater}
                  style={[
                    styles.button,
                    isAlreadySaved && styles.buttonDisabled,
                  ]}
                  disabled={isAlreadySaved}
                >
                  <Text style={styles.buttonText}>
                    {isAlreadySaved ? "Déjà sauvegardé" : "Sauvegarder"}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                  Aucun produit trouvé pour ce code-barres.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sheet: {
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },

  offlineContainer: {
    alignItems: "center",
    padding: 20,
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
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProductDetailsSheetLikePage;
