import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import styles from "../history/style";

const defaultImage = require("@/assets/images/demands/NoPicture.png");

const productBg = require('@/assets/images/recipes/productBg.png'); // Convertir SVG en PNG ou utiliser react-native-svg

const LaterItem = ({ product, onOpenFb, onDelete }:any) => {
  if (!product) return null;
    const [isOnline, setIsOnline] = useState<boolean>(true); 
  
  
  useEffect(()=>{
const unsubscribe = NetInfo.addEventListener(state => {
    setIsOnline(state.isConnected ?? false);  
  });
  },[])

  return (
    <View style={styles.itemContainer}>
      {/* Image avec fond */}
      <ImageBackground source={productBg} resizeMode="contain" style={styles.imageBackground} >
        <Image
          source={defaultImage}
          style={styles.productImage}
           resizeMode="contain"
        />
      </ImageBackground>

      {/* Infos produit */}
      <View style={styles.productInfo}>
        <Text style={styles.productGtin}>{product.gtin}</Text>
        <Text style={styles.productName}>{product.name || 'Nom inconnu'}</Text>
      </View>

      {/* Boutons d'action */}
      <TouchableOpacity
       onPress={() => isOnline && onOpenFb(product.gtin)}
       style={[styles.iconButton, !isOnline && styles.disabledButton]}
       disabled={!isOnline}>
        <Ionicons name="search-outline" size={24} color="#2563eb" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(product.gtin)} style={styles.iconButton}>
        <Ionicons name="trash-outline" size={24} color="#dc2626" />
      </TouchableOpacity>
    </View>
  );
};

export default LaterItem;
