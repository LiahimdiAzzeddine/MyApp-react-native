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

const { width, height } = Dimensions.get('window');

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
      <View style={styles.contentContainer}>
        <ImageBackground
          source={require('@/assets/images/intro/BIENVENUEV423.png')} // correspond au background de `.intro7`
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <View style={styles.textWrapper}>
            <View style={styles.textBlock}>
              <Text style={styles.text}>
                <Text style={styles.boldTitle}>
                  Ti
                  <Text style={styles.tight}>CO</Text>
                </Text>{' '}
                est la seule application
              </Text>
              <Text style={styles.text}>
                qui{' '}
                <Text style={styles.bold}>
                  demande aux marques{'\n'}de faire la lumière&nbsp;
                </Text>
                sur leurs produits,{'\n'}leur origine, leur fabrication,
              </Text>
              <Text style={styles.text}>leur composition.</Text>
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

      {/* Spacing */}
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
    paddingTop: 4,
  },
  logo: {
    width: 240,
    height: 100,
  },
  contentContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  imageBackground: {
    width: '96%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    position: 'relative',
  },
  textBlock: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: '#004B8D',
    textAlign: 'center',
    fontFamily: 'Archivo-Light',
    lineHeight: 26,
    marginBottom: 6,
  },
  bold: {
    fontFamily: 'Archivo-Bold',
    fontWeight: 'bold',
  },
  boldTitle: {
    fontFamily: 'Archivo-Bold',
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  tight: {
    letterSpacing: -1.5,
  },
  lightIcon: {
    position: 'absolute',
    bottom: -40, // Adapté pour iPhone XR / SE
    width: 140,
    height: 140,
  },
  spacing: {
    height: height * 0.08,
  },
});

export default Intro3;
