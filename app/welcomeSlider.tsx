import React, { useState } from 'react';
import { View } from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from "./onboarding/styles";


const WelcomeSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };
  return (
    <SafeAreaView style={styles.container}  edges={['bottom', 'left', 'right']}>
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
    </SafeAreaView>
  );
};


export default WelcomeSlider;