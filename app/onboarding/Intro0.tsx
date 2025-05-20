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

const Intro0 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('@/assets/images/intro/BIENVENUE0.png')} 
        style={styles.background}
        resizeMode="contain"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/intro/tico_intro.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Bienvenue !</Text>

            <Text style={styles.description}>
              <Text style={styles.bold}>Ti</Text>
              <Text style={[styles.bold, styles.tight]}>CO</Text>
              <Text> est l’application{"\n"}de scan alimentaire qui vous{"\n"}donne </Text>
              <Text style={styles.strong}>
                le pouvoir d'agir{"\n"}pour une santé globale
              </Text>
              .
            </Text>

            <Image
              source={require('@/assets/images/intro/Loupe.png')}
              style={styles.loupe}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Spacing */}
        <View style={styles.spacing} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  background: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingHorizontal: 16,
  },
  textWrapper: {
    width: '85%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  title: {
    fontSize: 28,
    color: '#004B8D', // text-custom-blue
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#FB923C', // decoration-orange-400
    textAlign: 'center',
    paddingTop: 8,
  },
  description: {
    fontSize: 18,
    color: '#004B8D',
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Archivo-Light', // Remplace par une police custom si dispo
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  tight: {
    letterSpacing: -1,
  },
  strong: {
    fontWeight: 'bold',
    fontFamily: 'Archivo',
  },
  loupe: {
    width: 144,
    height: 144,
    position: 'absolute',
    left: 56,
    bottom: -16,
  },
  spacing: {
    height: height * 0.08,
  },
});

export default Intro0;
