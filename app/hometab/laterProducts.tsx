import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { getAllLaterProducts } from '@/utils/storage'; // Ton getAllLaterProducts ici
import { Product } from '@/types/product';

export default function LaterProducts() {
  const [laterProducts, setLaterProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLaterProducts() {
      try {
        const products = await getAllLaterProducts();
        setLaterProducts(products);
      } catch (error) {
        console.error('Erreur lors du chargement des produits "plus tard" :', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLaterProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF9800" />
      </View>
    );
  }

  if (laterProducts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Aucun produit sauvegardé pour plus tard.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.productImage} />
      ) : (
        <View style={[styles.productImage, styles.placeholder]} />
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name || 'Nom inconnu'}</Text>
        <Text style={styles.productBrand}>{item.trademark || 'Marque inconnue'}</Text>
        <Text style={styles.productGtin}>GTIN: {item.gtin}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={laterProducts}
      keyExtractor={(item) => item.gtin}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
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
});
