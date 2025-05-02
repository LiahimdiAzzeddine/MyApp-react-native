import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Product } from '@/types/product';
import ProductDetailsView from '@/components/fp/ProductDetailsView';
import { getProductByBarcode } from '@/utils/storage';
import { GlobalFpProvider } from '@/context/GlobalFpContext';
import ProductSkeletonLoader from '@/components/fp/ProductSkeletonLoader';
import NetInfo from '@react-native-community/netinfo'; // à importer si pas déjà fait
import useGetProduct from '@/hooks/fp/useGetProduct';

type RouteParams = {
  ProductDetails: {
    gtin: string;
    search?: string;
  };
};

const ProductDetailsScreen = () => {
  const { params } = useRoute<RouteProp<RouteParams, 'ProductDetails'>>();
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const { gtin, search } = params;

  const {
    productData,
    loading,
    error,
    fetchProduct,
  } = useGetProduct(gtin); // Hook personnalisé pour recherche en ligne

  const [localProduct, setLocalProduct] = useState<Product | null>(null);
  const [localLoading, setLocalLoading] = useState(true);

  // Récupération hors ligne (search === false ou undefined)
  useEffect(() => {
    if (search !== 'true') {
      const fetchLocal = async () => {
        const product = await getProductByBarcode(gtin);
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

  return (
    <GlobalFpProvider>
      {isLoading ? (
        <ProductSkeletonLoader />
      ) : (
        <ProductDetailsView productData={product} />
      )}
    </GlobalFpProvider>
  );
};

export default ProductDetailsScreen;
