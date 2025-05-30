// History.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Alert } from 'react-native';
import { getAllProducts, deleteByGtin } from '@/utils/storage';
import { Product } from '@/types/product';
import Item from '@/components/history/Item';
import SkeletonLoader from '@/components/history/SkeletonLoader';
import { useRouter } from 'expo-router';
import RenderHeader from '@/components/history/renderHeader';
import { EmptyState } from '@/components/history/EmptyState';


export default function History() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
  

  const fetchProducts = async () => {
    try {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des produits :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenProduct = (product: Product) => {
    router.push({ pathname: '/fp/[productDetailsScreen]', params: { gtin: (product.gtin).toString() } });
  };
  const handleDeleteProduct = async (gtin: string) => {
    try {
      setLoading(true); // Afficher le chargement pendant la suppression
      const result = await deleteByGtin(gtin);
      console.log(result); // Affiche le message de retour de la fonction
      
      // Actualiser la liste après suppression
      await fetchProducts();
      
      // Optionnel : Afficher une confirmation à l'utilisateur
      Alert.alert("Suppression", result);
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      Alert.alert("Erreur", "La suppression a échoué");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <Item
      product={item}
      index={index}
      OpenFb={handleOpenProduct}
      handleDelete={handleDeleteProduct}
    />
  );



  if (loading) {
    return (
      <View style={styles.container}>
        <RenderHeader title="Mon historique de scan" />
        <SkeletonLoader />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <RenderHeader title="Mon historique de scan" />
        <EmptyState/>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      <RenderHeader title="Mon historique de scan" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.gtin}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
});