// components/Encourager.tsx
import { useBottomSheet } from '@/context/BottomSheetContext';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet } from 'react-native';
import { ContactModal } from '../Modals/ContactModal';
import Solliciter from '../Modals/Solliciter';

const flecheLeft = require('@/assets/images/fp/FICHEFleche.png'); 
const illustrationOrigines = require('@/assets/images/fp/BubbleImg.png'); 

const Encourager: React.FC<{ product: any }> = ({ product }) => {
  const isAuthenticated = true;
  const { hasRequested, setIsCourager } = useBottomSheet();
    const [isModalVisible, setIsModalVisible] = useState(true);



  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!hasRequested) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1250,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1250,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [hasRequested]);

  const openContactSolliciter = () => {
    /* if (!isAuthenticated) {
        alert("Se connecter pour encourager la marque")
     triggerAlert(
        'Se connecter pour encourager la marque',
        'Attention',
        () => {
          //navigation.navigate('Login');
        },
        'ios',
        'Se connecter'
      );
    } else {
      //setIsCourager(true);
    }*/
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={openContactSolliciter} style={styles.textContainer}>
        <Text className='text-custom-blue ArchivoLight underline text-sl underline-offset-2 leading-tight'>
          <Text className='text-custom-blue ArchivoBold leading-tight'>Encourager la marque</Text> à fournir
        </Text>
        <View style={styles.imageRow}>
          <Text className='text-custom-blue ArchivoLight underline text-sl underline-offset-2 leading-tight'>toutes les informations</Text>
          <Image resizeMode="contain" source={flecheLeft} style={styles.arrowImage}  />
        </View>
      </Pressable>

      <View style={styles.imageContainer}>
        <Pressable onPress={openContactSolliciter}>
          <Animated.Image
            source={illustrationOrigines}
            style={[styles.illustrationImage, { transform: [{ scale: scaleAnim }] }]}
            resizeMode="contain"
          />
        </Pressable>
      </View>
       <Solliciter
          isOpen={isModalVisible}
          setIsOpen={setIsModalVisible}
          gtin="1234567890123"
          productName="Produit Exemple"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowImage: {
    position:"absolute",
    width: 35,
    height: 35,
    marginLeft: 220,
    transform: [{ rotate: '-30deg' }],
  },
  imageContainer: {
    alignItems: 'center',
  },
  illustrationImage: {
    width: 50,
    height: 50,
  },
});

export default Encourager;
