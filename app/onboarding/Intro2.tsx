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

import  styles from './styles';
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
      <View className='justify-center items-center align-center' style={{flex: 2,}}>
        <ImageBackground
          source={require('@/assets/images/intro/background4.png')}
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <View style={styles.textWrapper2}>
            <Text className="text-xl text-custom-blue ArchivoLight leading-archivo">
              Faire la transparence,
            </Text>
            <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center">
              c’est{' '}
              <Text className='ArchivoBold text-center'>
                lever le voile sur l’opacité{'\n'}alimentaire
              </Text>{' '}
              en partageant
            </Text>
            <Text  className="text-xl text-custom-blue ArchivoLight leading-archivo">des informations :</Text>

            {/* Feature List */}
            <FlatList
              data={features}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Image
                    source={require('@/assets/images/intro/plus.png')}
                    style={styles.listIcon}
                    resizeMode='contain'
                  />
                  <Text className="flex items-center justify-start text-xl text-custom-blue ArchivoBold" style={{marginVertical:5}}>{item}</Text>
                </View>
              )}
              contentContainerStyle={styles.list}
            />

            <Text  className="text-xl text-custom-blue ArchivoLight leading-archivo">Et ça, c’est notre credo&nbsp;!</Text>
          </View>
        </ImageBackground>
      </View>

     
    </SafeAreaView>
  );
};



export default Intro2;
