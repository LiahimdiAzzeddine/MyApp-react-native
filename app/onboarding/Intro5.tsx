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
import styles from './styles'
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
      <View className='justify-center items-center align-center' style={{flex: 2,justifyContent:'center',width:365,margin:"auto"}}>
        <ImageBackground
          source={require('@/assets/images/intro/BIENVENUEV4-14.png')} // background équivalent à .intro4
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <View style={styles.textWrapper5}>
            <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center">
              Bien plus qu’une application,{'\n'}
              <Text className='ArchivoBold'>un allié au quotidien !</Text>
            </Text>

            <View style={styles.listContainer}>
              <View style={styles.listItem5}>
                <Image
                  source={require('@/assets/images/intro/leftFlech.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center">
                  Des <Text className='ArchivoBold'>recettes</Text> faciles
                </Text>
              </View>

              <View style={styles.listItem5}>
                {/* Empty space for alignment */}
                <View style={{ width: 48 }} />
                <Text className="text-xl text-custom-blue ArchivoLight leading-archivo text-center">
                  Des <Text className='ArchivoBold'>astuces</Text> utiles
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

     
    </SafeAreaView>
  );
};
5
export default Intro5;
