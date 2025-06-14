// ProductDetailsView.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TransparencyScale from './TransparencyScale';
import GlobalInfo from './GlobalInfo';
import Encourager from './Encourager';
import InfoSection from './InfoSection';
import ProductDetailsAccordion from './ProductDetailsAccordion';
import { Product } from '@/types/product';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Recettes from './Recettes';

interface ProductDetailsViewProps {
  productData: Product | null;
}

const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ 
  productData, 
}) => {
 

  // Pas de produit trouvé
  if (!productData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noProductText}>Aucun produit trouvé pour ce code-barres.</Text>
      </View>
    );
  }

  // Affichage du produit
  return (
    <View style={styles.container}>
     <View style={styles.innerContainer}>
        <TransparencyScale currentPosition={productData.transparency_scale} />
        <GlobalInfo 
          ImageSrc={productData.image} 
          Name={productData.name} 
          Brand={productData.trademark} 
          Transparent={productData.transparency_scale} 
        />
        
       <Encourager product={productData} />
      </View>
      
      <InfoSection product={productData} />
      <ProductDetailsAccordion product={productData} />
      <Recettes recettes={[]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  innerContainer: {
    paddingHorizontal: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  noProductText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProductDetailsView;