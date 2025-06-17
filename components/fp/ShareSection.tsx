import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Share as RNShare, Alert } from 'react-native';
import { useBottomSheet } from '@/context/BottomSheetContext';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
const BubbleImg = require('@/assets/images/fp/BubbleImg.png');
const RecettesImg = require('@/assets/images/fp/recettes.png');
const PartageImg = require('@/assets/images/fp/top.png');
interface SectionsProps {
  scrollToTarget?: (ref: React.RefObject<any>) => void;
  targetRefRecettes?: React.RefObject<any>;
  gtin: string;
  productName: string|null;
}

const backendUrl = "https://tico.foodhea.com"; // Assure-toi de le définir dans ton .env

const ShareSection: React.FC<SectionsProps> = ({ scrollToTarget, targetRefRecettes, gtin, productName }) => {
const {  setIsModalContact,closeBottomSheet } = useBottomSheet();
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;
    const router = useRouter();
  
  const openModalContact = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Attention',
        'Se connecter pour encourager la marque',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Se connecter',
           
            onPress: () => { closeBottomSheet(),router.push('/login')},
          },
        ]
      );
    } else {
      setIsModalContact(true);
    }
  };
 const handleShare = async () => {
    try {
      // Construire l'URL de partage avec les paramètres
      const fullUrl = `${backendUrl}/fp/${gtin}?search=true`;
      await RNShare.share({
        title: 'Découvrez cette fiche produit',
        message: `Découvrez la fiche de ce produit sur TiCO : ${fullUrl}`,
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

        <TouchableOpacity style={styles.button} onPress={() => openModalContact()}>
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
