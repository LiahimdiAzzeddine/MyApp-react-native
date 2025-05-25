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

import {styles} from "./styles"
const Intro1 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/intro/tico_intro.png')} // SVG remplacé par PNG
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Main Content Section with Background */}
      <View className='justify-center items-center align-center' style={{flex: 2,}}>
        <ImageBackground
          source={require('@/assets/images/intro/background3.png')}
          style={styles.imageBackground1}
          resizeMode="contain"
        >
          <View className='w-[80%] text-center'>
            <Text  className="text-xl text-custom-blue ArchivoLight leading-archivo text-center" style={{paddingTop:20}}>
              <Text className='ArchivoBold' >En évaluant la transparence</Text>
              {"\n"}des produits alimentaires,
              {"\n"}nous incitons les marques
              {"\n"}à <Text className='ArchivoBold'>décrypter leurs produits</Text>
              {"\n"}pour offrir la possibilité
              {"\n"}aux consommateurs de{" "}
              <Text className='ArchivoBold'>
                faire{"\n"}des choix éclairés.
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </View>

      
    </SafeAreaView>
  );
};


export default Intro1;
