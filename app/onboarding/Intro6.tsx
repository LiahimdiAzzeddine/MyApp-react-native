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
import {styles} from './styles'

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
      <View className='justify-center items-center align-center' style={{flex: 2,justifyContent:'center',width:320,margin:"auto"}}>
        <ImageBackground
          source={require('@/assets/images/intro/BIENVENUEV4-21.png')} // background équivalent à .intro5
          style={styles.imageBackground}
          resizeMode="contain"
        >
          {/* Texte avec flèche */}
          <View style={styles.textWrapper6}>
            <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center">
              Vous n'êtes qu'à{' '}
              <Text className='ArchivoBold'>un clic</Text>
              {'\n'}
              <Text className='ArchivoBold'>de la liberté</Text> de manger
              {'\n'}
              ce que <Text className='ArchivoBold'>vous voulez vraiment</Text>.
            </Text>
            <Text className='ArchivoBold text-2xl text-custom-blue text-center' style={{paddingTop:10}}>C’est parti !</Text>
          </View>

          {/* Flèche */}
          <Image
            source={require('@/assets/images/intro/fleche.png')}
            style={styles.arrow}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>

    </SafeAreaView>
  );
};


export default Intro6;
