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

const { height } = Dimensions.get('window');

const Intro6 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/intro/tico_intro.png')} // SVG converti en PNG
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Section Texte avec image de fond */}
      <View style={styles.contentContainer}>
        <ImageBackground
          source={require('@/assets/images/intro/BIENVENUEV4-21.png')} // background équivalent à .intro5
          style={styles.imageBackground}
          resizeMode="contain"
        >
          {/* Texte avec flèche */}
          <View style={styles.textWrapper}>
            <Text style={styles.textCenter}>
              Vous n'êtes qu'à{' '}
              <Text style={styles.bold}>un clic</Text>
              {'\n'}
              <Text style={styles.bold}>de la liberté</Text> de manger
              {'\n'}
              ce que <Text style={styles.bold}>vous voulez vraiment</Text>.
            </Text>
            <Text style={styles.title}>C’est parti !</Text>
          </View>

          {/* Flèche */}
          <Image
            source={require('@/assets/images/intro/fleche.png')}
            style={styles.arrow}
            resizeMode="contain"
          />
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
    backgroundColor: '#fff',
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
    maxWidth: 360,
    paddingHorizontal: 24,
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 16,
  },
  textCenter: {
    fontSize: 18,
    color: '#004B8D', // text-custom-blue
    fontFamily: 'Archivo-Light',
    textAlign: 'center',
    lineHeight: 26,
  },
  bold: {
    fontFamily: 'Archivo-Bold',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Archivo-Bold',
    color: '#004B8D',
  },
  arrow: {
    position: 'absolute',
    width: '50%',
    bottom: 0,
    right: 12,
    height: undefined,
    aspectRatio: 1, // Maintient les proportions
  },
  spacing: {
    height: height * 0.08,
  },
});

export default Intro6;
