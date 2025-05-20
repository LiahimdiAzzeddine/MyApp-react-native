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
      <View style={styles.contentContainer}>
        <ImageBackground
          source={require('@/assets/images/intro/background3.png')}
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <View style={styles.textWrapper}>
            <Text style={styles.description}>
              <Text style={styles.bold}>En évaluant la transparence</Text>
              {"\n"}des produits alimentaires,
              {"\n"}nous incitons les marques
              {"\n"}à <Text style={styles.bold}>décrypter leurs produits</Text>
              {"\n"}pour offrir la possibilité
              {"\n"}aux consommateurs de{" "}
              <Text style={styles.bold}>
                faire{"\n"}des choix éclairés.
              </Text>
            </Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width: '80%',
    alignItems: 'center',
  },
  description: {
    fontSize: 18,
    color: '#004B8D', // text-custom-blue
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Archivo-Light', // Remplace par la bonne police si utilisée
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'Archivo',
  },
  spacing: {
    height: height * 0.08,
  },
});

export default Intro1;
