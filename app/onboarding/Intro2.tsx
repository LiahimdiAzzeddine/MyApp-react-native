import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const features = ['claires', 'complètes', 'accessibles'];

const Intro2 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/intro/tico_intro.png')} // SVG converti en PNG ou utilisable via react-native-svg
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Main Content Section */}
      <View style={styles.contentContainer}>
        <ImageBackground
          source={require('@/assets/images/intro/background4.png')}
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <View style={styles.textWrapper}>
            <Text style={styles.text}>
              Faire la transparence,
            </Text>
            <Text style={styles.text}>
              c’est{' '}
              <Text style={styles.bold}>
                lever le voile sur l’opacité{'\n'}alimentaire
              </Text>{' '}
              en partageant
            </Text>
            <Text style={styles.text}>des informations :</Text>

            {/* Feature List */}
            <FlatList
              data={features}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Image
                    source={require('@/assets/images/intro/plus.png')}
                    style={styles.listIcon}
                  />
                  <Text style={styles.listText}>{item}</Text>
                </View>
              )}
              contentContainerStyle={styles.list}
            />

            <Text style={styles.text}>Et ça, c’est notre credo&nbsp;!</Text>
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
    gap: 8,
  },
  text: {
    fontSize: 18,
    color: '#004B8D', // text-custom-blue
    textAlign: 'center',
    fontFamily: 'Archivo-Light',
    lineHeight: 26,
  },
  bold: {
    fontFamily: 'Archivo-Bold',
    fontWeight: 'bold',
  },
  list: {
    width: '70%',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  listIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  listText: {
    fontSize: 18,
    fontFamily: 'Archivo-Bold',
    color: '#004B8D',
  },
  spacing: {
    height: height * 0.08,
  },
});

export default Intro2;
