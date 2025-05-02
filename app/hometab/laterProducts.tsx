import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, Alert } from 'react-native';
import { deleteProductFromLater, getAllLaterProducts } from '@/utils/storage';
import { Product } from '@/types/product';
import RenderHeader from '@/components/history/renderHeader';
import LaterItem from '@/components/later/LaterItem';
import SkeletonLoader from '@/components/history/SkeletonLoader';
import { useRouter } from 'expo-router';
import EmptyLater from '@/components/later/EmptyLater';

export default function LaterProducts() {
  const [laterProducts, setLaterProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

  // Création d'un handleOpenProduct avec useCallback pour éviter les re-renders inutiles
  const handleOpenProduct = useCallback(async (product: Product) => {
    await deleteProductFromLater(product.gtin);
    fetchLaterProducts();
    router.push({
      pathname: '/fp/productDetailsScreen',
      params: {
        gtin: product.gtin.toString(),
        search: 'true',
      },
    });
  }, []);
    
  

  const handleDeleteProduct = useCallback(async (gtin: string) => {
    try {
      // Mettre à jour l'état localement sans recharger toute la liste
      setLaterProducts(prevProducts => prevProducts.filter(product => product.gtin !== gtin));
      
      const result = await deleteProductFromLater(gtin);
      
      // Notification à l'utilisateur
      Alert.alert("Suppression", result);
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      Alert.alert("Erreur", "La suppression a échoué");
      
      fetchLaterProducts();
    }
  }, []);

  // Extraire la fonction de récupération des produits pour pouvoir l'appeler dans handleDeleteProduct
  const fetchLaterProducts = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getAllLaterProducts();
      setLaterProducts(products);
    } catch (error) {
      console.error('Erreur lors du chargement des produits "plus tard" :', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect pour charger les produits au montage du composant
  useEffect(() => {
    fetchLaterProducts();
  }, []); // Dépendance vide pour exécuter uniquement au montage

  const renderItem = ({ item, index }: { item: Product, index: number }) => (
    <>
      <LaterItem
        product={item}
        onOpenFb={() => handleOpenProduct(item)}
        onDelete={() => handleDeleteProduct(item.gtin)}
      />
      {index < laterProducts.length - 1 && (
        <View style={styles.separator} />
      )}
    </>
  );

  // Afficher le loader pendant le chargement
  if (loading) {
    return (
      <View style={styles.container}>
        <RenderHeader title="Produits à consulter" />
        <SkeletonLoader />
      </View>
    );
  }

  // Afficher un message si aucun produit n'est sauvegardé
  if (laterProducts.length === 0) {
    return (
      <View style={styles.container}>
        <RenderHeader title="Produits à consulter" />
          <EmptyLater
                title="Aucun produit sauvegardé" 
                description="Hors ligne ? Scanner des produits pour les consulter plus tard"
              />   
      </View>
    );
  }

  // Afficher la liste des produits
  return (
    <View style={styles.container}>
      <RenderHeader title="Produits à consulter" />
      <FlatList
        data={laterProducts}
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
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  productGtin: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#16a34a',
    marginHorizontal: 10,
  },
});