import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';

import { setFirstVisit } from '@/utils/storage';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

const Intro7 = () => {
  const [showModalInscription, setShowModalInscription] = useState(false);
    const router = useRouter();
  

 
  const handleGuestClick = async () => {
    try {
      await setFirstVisit(true);
      router.push("/(tabs)")
    } catch (error) {
      console.error('Error setting first visit status:', error);
    }
  };

  const Register = async () => {
    try {
      await setFirstVisit(true);
      router.push("/(auth)/register")
    } catch (error) {
      console.error('Error setting first visit status:', error);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/intro/tico_intro.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Background and Buttons */}
      <View style={styles.contentContainer}>
        <ImageBackground
          source={require('@/assets/images/intro/background6.png')}
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={Register}>
              <Text style={styles.buttonText}>Je crée mon compte</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleGuestClick}>
              <Text style={styles.buttonText}>
                J'utilise <Text style={styles.bold}>Ti<Text style={styles.tight}>CO</Text></Text>{'\n'}en tant qu'invité
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>



      {/* Bottom spacer */}
      <View style={styles.spacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 4,
  },
  logo: {
    width: 240,
    height: 100,
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    paddingHorizontal: 8,
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF8200',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Archivo',
    fontSize: 16,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'Archivo-Bold',
  },
  tight: {
    letterSpacing: -1,
  },
  spacing: {
    height: height * 0.08,
  },

});

export default Intro7;
