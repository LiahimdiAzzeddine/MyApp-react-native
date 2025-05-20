import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { StatusBar } from 'expo-status-bar';
import Intro1 from './onboarding/Intro1';
import Intro0 from './onboarding/Intro0';
import Intro2 from './onboarding/Intro2';
import Intro3 from './onboarding/Intro3';
import Intro4 from './onboarding/Intro4';
import Intro5 from './onboarding/Intro5';
import Intro6 from './onboarding/Intro6';
import Intro7 from './onboarding/Intro7';

// Importez vos assets ici
// Par exemple:
// import ticoIntro from '../assets/intro/tico_intro.png';
// import loupe from '../assets/intro/Loupe.png';

const WelcomeSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { width, height } = useWindowDimensions();
  
  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <PagerView
        style={styles.pager}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        <View key="1" style={styles.page}>
          <Intro0/>
        </View>
        <View key="2" style={styles.page}>
          <Intro1 />
        </View>
        <View key="3" style={styles.page}>
         <Intro2/>
        </View>
        <View key="4" style={styles.page}>
          <Intro3 />
        </View>
        <View key="5" style={styles.page}>
          <Intro4 />
        </View>
        <View key="6" style={styles.page}>
          <Intro5 />
        </View>
        <View key="7" style={styles.page}>
          <Intro6 />
        </View>
        <View key="8" style={styles.page}>
          <Intro7 />
        </View>
      </PagerView>
      
      <View style={styles.paginationContainer}>
        {Array.from({ length: 8 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentPage === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FF8C00', // orange couleur
  },
  introContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40, // Ajustez selon le safe area
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 240,
    height: 100,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  textContentContainer: {
    width: '83%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00527A', // custom-blue couleur
    textDecorationLine: 'underline',
    textDecorationColor: '#FF8C00', // orange couleur
    paddingTop: 8,
    marginBottom: 40,
  },
  description: {
    fontSize: 20,
    color: '#00527A', // custom-blue couleur
    textAlign: 'center',
    lineHeight: 28,
  },
  brandText: {
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  loupeImage: {
    width: 144,
    height: 144,
    position: 'absolute',
    left: 56,
    bottom: -16,
  },
  spacer: {
    minHeight: '8%',
  },
});

export default WelcomeSlider;