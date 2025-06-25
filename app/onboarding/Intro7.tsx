import React, { useContext, useState } from 'react';
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
import { AuthContext } from '@/context/AuthContext';

const { height } = Dimensions.get('window');

const Intro7 = () => {
  const [showModalInscription, setShowModalInscription] = useState(false);
    const router = useRouter();
  const { onlyLogout } = useContext(AuthContext);

 
  const handleGuestClick = async () => {
    try {
      await setFirstVisit(true);
      onlyLogout(),
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
const Login = async () => {
    try {
      await setFirstVisit(true);
      router.push("/(auth)/login")
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
      <View  className='justify-center items-center align-center' style={{flex: 2,justifyContent:'center',width:360,margin:"auto"}}>
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
                J'utilise <Text className='ArchivoBold'>Ti<Text style={styles.tight}>CO</Text></Text>{'\n'}en tant qu'invité
              </Text>
            </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={Login}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>


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
  },
 logo: {
    height: 142,
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
    paddingTop:27
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

  tight: {
    letterSpacing: -1,
  },


});

export default Intro7;
