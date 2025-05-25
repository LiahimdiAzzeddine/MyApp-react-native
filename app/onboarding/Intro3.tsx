import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';

import {styles} from './styles'
const Intro3 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/intro/tico_intro.png')} // converti SVG en PNG ou utilisez react-native-svg
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Content Section */}
      <View className='justify-center items-center align-center' style={{flex: 2,justifyContent:'center'}}>
        <ImageBackground
          source={require('@/assets/images/intro/BIENVENUEV423.png')} // correspond au background de `.intro7`
          style={styles.imageBackground3}
          resizeMode="center"
        >
          <View style={styles.textWrapper3}>
            <View style={styles.textBlock} >
              <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center">
                <Text style={styles.boldTitle}>
                  Ti
                  <Text style={styles.tight}>CO</Text>
                </Text>{' '}
                est la seule application
              </Text>
              <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center" >
                qui{' '}
                <Text className='ArchivoBold'>
                  demande aux marques{'\n'}de faire la lumière&nbsp;
                </Text>
                sur leurs produits,{'\n'}leur origine, leur fabrication,
              </Text>
              <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center">leur composition.</Text>
            </View>

            {/* Light Icon */}
            <Image
              source={require('@/assets/images/intro/light.png')} // SVG converti en PNG
              style={styles.lightIcon}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
      </View>

    
    </SafeAreaView>
  );
};

export default Intro3;
