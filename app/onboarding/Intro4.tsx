import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import styles from "./styles"
const Intro4 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/intro/tico_intro.png')} // Converti depuis SVG
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Content Section */}
      <View className='justify-center items-center align-center' style={{flex: 2,justifyContent:'center',width:350,margin:"auto"}}>
        <ImageBackground
          source={require('@/assets/images/intro/background2.png')} // Utilisé comme background .intro2
          style={styles.imageBackground}
          resizeMode="contain"
        >
          {/* Barcode */}
          <Image
            source={require('@/assets/images/intro/barcode.png')} // Converti depuis SVG
            style={styles.barcode}
            resizeMode="contain"
          />

          {/* Text Content */}
          <View style={styles.textContainer4}>
            <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center">
              <Text className='ArchivoBold'>Scannez</Text>, cliquez{'\n'}
              et demandez&nbsp;aux marques{'\n'}
              de <Text className='ArchivoBold'>soumettre </Text>
              <Text className='ArchivoBold'>leurs produits aux évaluations </Text>
              de nos experts{'\n'}indépendants&nbsp;!
            </Text>

            {/* Bottom Icon */}
            <Image
              source={require('@/assets/images/intro/BIENVENUEV4-20.png')} // Réutilisé, sinon mets une autre image
              style={styles.bottomIcon}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
      </View>


    </SafeAreaView>
  );
};


export default Intro4;
