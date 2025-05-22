import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Intro0 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Background Image at the Bottom */}
        <Image
          source={require('@/assets/images/intro/BIENVENUE0.png')}
          style={styles.backgroundImage}
          resizeMode="contain"
        />

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.4, // Ajustez selon besoin
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 142,
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
    color: '#004B8D',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#FB923C',
    textAlign: 'center',
    paddingTop: 8,
  },
  description: {
    fontSize: 18,
    color: '#004B8D',
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Archivo-Light',
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
});

export default Intro0;
