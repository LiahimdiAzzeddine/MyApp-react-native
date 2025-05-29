import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Share as RNShare } from 'react-native';
import { useBottomSheet } from '@/context/BottomSheetContext';
const BubbleImg = require('@/assets/images/fp/BubbleImg.png');
const RecettesImg = require('@/assets/images/fp/recettes.png');
const PartageImg = require('@/assets/images/fp/top.png');
interface SectionsProps {
  scrollToTarget?: (ref: React.RefObject<any>) => void;
  targetRefRecettes?: React.RefObject<any>;
  gtin: string;
  productName: string|null;
}

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL; // Assure-toi de le définir dans ton .env

const ShareSection: React.FC<SectionsProps> = ({ scrollToTarget, targetRefRecettes, gtin, productName }) => {
const {  setIsModalContact } = useBottomSheet();
  const handleShare = async () => {
    try {
      await RNShare.share({
        title: 'Découvrez cette fiche produit',
        message: `Découvrez les infos nutritionnelles ici : ${backendUrl}/tico/fp/${gtin}`,
      });
    } catch (error) {
      console.error('Erreur lors du partage :', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Image source={PartageImg} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} /*onPress={() => scrollToTarget(targetRefRecettes)}*/>
          <Image source={RecettesImg} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setIsModalContact(true)}>
          <Image source={BubbleImg} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default ShareSection;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#b6e1dd',
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: '100%',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  icon: {
    height: 48,
    width: 48,
  },
});
