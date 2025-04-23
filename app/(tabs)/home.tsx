import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import CustomButton from '@/components/ui/CustomButton';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const Home = () => {
  const { userInfo } = useContext(AuthContext);
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* En-tête avec ImageBackground */}
          <View style={styles.header}>
            <ImageBackground
              source={require('@/assets/images/tico_intro.png')}
              resizeMode="contain"
              style={styles.imageBackground}
            >
              {userInfo?.username && <Text style={styles.greeting} className='text-2.5xl'>Bonjour {userInfo?.username} !</Text>}
              <Image
                source={require('@/assets/images/hands.png')}
                style={styles.handsImage}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>

          {/* Boutons */}
          <View style={styles.buttonsContainer}>
            {[
              { title: 'La mission de TiCO', route: 'hometab/mission' },
              { title: 'Historique de scan', route: '/hometab' },
              { title: 'Produits à consulter', route: 'hometab/details' },
              { title: 'Suivi de mes demandes', route: '/hometab' },
            ].map((btn, idx) => (
              <CustomButton
              key={idx}
                  title={btn.title}
                  onPress={() => router.push(btn.route)}
                  accessibilityLabel="Bouton pour partager TiCO"
                  accessibilityHint="Ouvre les options de partage pour l'application TiCO"
                  style={{
                    width: "100%",
                    maxWidth: 280,
                    minWidth: 150,
                    backgroundColor: (colors as any)["custom-green-text"],
                  }}
                />
    
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#c7f0d9',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  imageBackground: {
    width: 275,
    height: 250,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  greeting: {
    position: 'absolute',
    top: '25%',
    color: '#4E986D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  handsImage: {
    position: 'absolute',
    bottom: 40,
    width: 230,
    height: 100,
  },
  buttonsContainer: {
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
    gap: 15,
  },

});

export default Home;
