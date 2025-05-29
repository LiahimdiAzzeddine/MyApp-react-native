// components/Encourager.tsx
import { AuthContext } from '@/context/AuthContext';
import { useBottomSheet } from '@/context/BottomSheetContext';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet, Alert } from 'react-native';

const flecheLeft = require('@/assets/images/fp/FICHEFleche.png'); 
const illustrationOrigines = require('@/assets/images/fp/BubbleImg.png'); 

const Encourager = ({ product }:any) => {
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;

  const router = useRouter();
  const { hasRequested, setIsModalEncourager, isModalEncourager } = useBottomSheet();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (!hasRequested) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    }

    return () => {
      animation?.stop?.(); // ✅ Nettoyage propre de l’animation
    };
  }, [hasRequested, scaleAnim]);

  const openContactSolliciter = () => {
    console.log("🚀 ~ isModalEncourager:", isModalEncourager);

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
            onPress: () => router.push('/login'),
          },
        ]
      );
    } else {
      setIsModalEncourager(true);
    }
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
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingTop:10,
    marginBottom: 35,
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
