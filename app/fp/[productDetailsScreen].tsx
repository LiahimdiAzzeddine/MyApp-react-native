import React, { useContext, useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Product } from '@/types/product';
import ProductDetailsView from '@/components/fp/ProductDetailsView';
import { addProduct, getProductByBarcode } from '@/utils/storage';
import { GlobalFpProvider, useGlobalContext } from '@/context/GlobalFpContext';
import ProductSkeletonLoader from '@/components/fp/ProductSkeletonLoader';
import NetInfo from '@react-native-community/netinfo'; // à importer si pas déjà fait
import useGetProduct from '@/hooks/fp/useGetProduct';
import { AuthContext } from '@/context/AuthContext';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

type RouteParams = {
  ProductDetails: {
    gtin: string;
    search?: string;
  };
};

const ProductDetailsScreen = () => {
  const { gtin, search } = useLocalSearchParams();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const { userInfo, logout } = useContext(AuthContext);
    const isAuthenticated = !!userInfo;


  const {
    productData,
    loading,
    error,
    fetchProduct,
  } = useGetProduct(String(gtin)); // Hook personnalisé pour recherche en ligne

  const [localProduct, setLocalProduct] = useState<Product | null>(null);
  const [localLoading, setLocalLoading] = useState(true);

  // Récupération hors ligne (search === false ou undefined)
  useEffect(() => {
    if (search !== 'true') {
      const fetchLocal = async () => {
        const product = await getProductByBarcode(String(gtin));
        setLocalProduct(product);
        setLocalLoading(false);
      };
      fetchLocal();
    }
  }, [gtin, search]);

  // Récupération en ligne (search === 'true')
  useEffect(() => {
    if (search === 'true') {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsOnline(state.isConnected ?? false);
      });

      if (gtin) {
        fetchProduct(); // appel API via hook
      }

      return () => unsubscribe();
    }
  }, [gtin, search]);

  const isLoading = search === 'true' ? loading : localLoading;
  const product = search === 'true' ? productData : localProduct;

   useEffect(() => {
      // Si l'utilisateur est connecté et que nous avons des données de produit, on l'ajoute à l'historique automatiquement
      if (isAuthenticated && productData) {
        addProduct(productData);
        
      }
    }, [productData]);
  return (
    <GlobalFpProvider>
      {isLoading ? (
        <ProductSkeletonLoader />
      ) : (
        <ScrollView style={{backgroundColor:'white'}}>
          <SafeAreaView >
        <ProductDetailsView productData={product} />
        </SafeAreaView>
        </ScrollView>
      )}
    </GlobalFpProvider>
  );
};

export default ProductDetailsScreen;
