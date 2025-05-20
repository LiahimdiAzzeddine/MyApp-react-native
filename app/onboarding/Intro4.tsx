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

const { width, height } = Dimensions.get('window');

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
      <View style={styles.contentContainer}>
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
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              <Text style={styles.bold}>Scannez</Text>, cliquez{'\n'}
              et demandez&nbsp;aux marques{'\n'}
              de <Text style={styles.bold}>soumettre </Text>
              <Text style={styles.bold}>leurs produits aux évaluations </Text>
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

      {/* Empty space */}
      <View style={styles.spacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 100,
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  barcode: {
    position: 'absolute',
    top: -height * 0.01,
    height: 80,
    zIndex: 10,
  },
  textContainer: {
    width: '80%',
    paddingTop: 64,
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 18,
    color: '#004B8D',
    textAlign: 'center',
    fontFamily: 'Archivo-Light',
    lineHeight: 26,
  },
  bold: {
    fontFamily: 'Archivo-Bold',
    fontWeight: 'bold',
  },
  bottomIcon: {
    width: 48,
    height: 48,
  },
  spacing: {
    height: height * 0.08,
  },
});

export default Intro4;
