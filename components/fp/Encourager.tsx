// components/Encourager.tsx
import { useGlobalContext } from '@/context/GlobalFpContext';
import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet } from 'react-native';

const flecheLeft = require('@/assets/images/fp/FICHEFleche.png'); 
const illustrationOrigines = require('@/assets/images/fp/BubbleImg.png'); 

const Encourager: React.FC<{ product: any }> = ({ product }) => {
  const isAuthenticated = true;
  const { hasRequested, setIsCourager } = useGlobalContext();


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
        <Text style={styles.text}>
          <Text style={styles.boldText}>Encourager la marque</Text> à fournir
        </Text>
        <View style={styles.imageRow}>
          <Text style={styles.text}>toutes les informations</Text>
          <Image source={flecheLeft} style={styles.arrowImage} />
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
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#1E3A8A', 
    textDecorationLine: 'underline',
    fontSize: 14,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowImage: {
    position:"absolute",
    width: 30,
    height: 30,
    marginLeft: 200,
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
