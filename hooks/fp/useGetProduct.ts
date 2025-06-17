import { useState, useCallback, useContext } from 'react';
import axiosInstance from '../../api/axios';  
import { Alert } from 'react-native';
import { createProduct } from '@/utils/product';
import { Product } from '@/types/product';
import { AuthContext } from '@/context/AuthContext';
import api from '@/utils/axiosInstance';


const useGetProduct = (ean: string) => {
  const [productData, setProductData] = useState<Product|null>(null); // Utilisation de 'any' pour la donnée de produit
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userInfo } = useContext(AuthContext);
  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
       const response = userInfo?.id
        ? await api.get(`/api/fiche-produit/product/ean/${ean}`)
        : await axiosInstance.get(`/api/fiche-produit/product/ean/${ean}`);
      
      const data = response.data;
      if (response.status === 200 && (data.OFFproduct != null || data.foodheaproduct != null)) {
        const FormatedData=createProduct(ean,data);
        setProductData(FormatedData as Product);
      } else {
        setError('Erreur inattendue lors de la récupération du produit.');
        setProductData(null);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError('Produit non trouvé. test');
        setProductData(null);
      } else {
        setError('Erreur lors de la récupération du produit.');
        setProductData(null);
      }
      
      Alert.alert('Erreur', error || 'Une erreur est survenue lors de la récupération des données.');
    } finally {
      setLoading(false);
    }
  }, [ean, error]);

  return { productData, loading, error, fetchProduct, setProductData, setError };
};

export default useGetProduct;
