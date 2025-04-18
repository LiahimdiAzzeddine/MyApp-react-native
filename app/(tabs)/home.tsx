import React, { useContext, useEffect, useState } from 'react';
import { getUserInfo } from '@/utils/authStorage';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import CustomButton from '@/components/ui/CustomButton';
import { useTheme } from '@react-navigation/native';

const Home = () => {
  const { userInfo } = useContext(AuthContext);
  const { colors } = useTheme();



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
              {userInfo?.username && <Text style={styles.greeting}>Bonjour {userInfo?.username} !</Text>}
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
              { title: 'La mission de TiCO' },
              { title: 'Historique de scan' },
              { title: 'Produits à consulter' },
              { title: 'Suivi de mes demandes' },
            ].map((btn, idx) => (
              <CustomButton
              key={idx}
                  title={btn.title}
                  onPress={()=>{console.log()}}
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
    width: 260,
    height: 250,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  greeting: {
    position: 'absolute',
    top: '26%',
    fontSize: 22,
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
    gap: 15,
  },

});

export default Home;
