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

const Intro5 = () => {
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

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <ImageBackground
          source={require('@/assets/images/intro/BIENVENUEV4-14.png')} // background équivalent à .intro4
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <View style={styles.textWrapper}>
            <Text style={styles.mainText}>
              Bien plus qu’une application,{'\n'}
              <Text style={styles.bold}>un allié au quotidien !</Text>
            </Text>

            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Image
                  source={require('@/assets/images/intro/leftFlech.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.listText}>
                  Des <Text style={styles.bold}>recettes</Text> faciles
                </Text>
              </View>

              <View style={styles.listItem}>
                {/* Empty space for alignment */}
                <View style={{ width: 24 /* icon width */ }} />
                <Text style={styles.listText}>
                  Des <Text style={styles.bold}>astuces</Text> utiles
                </Text>
                <Image
                  source={require('@/assets/images/intro/rightFlech.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
            </View>
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
    backgroundColor: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
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
    gap: 24,
  },
  mainText: {
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
  listContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
  },
  listText: {
    fontSize: 18,
    color: '#004B8D',
    fontFamily: 'Archivo-Light',
  },
  icon: {
    width: 24,
    height: 24,
  },
  spacing: {
    height: height * 0.08,
  },
});

export default Intro5;
