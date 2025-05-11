import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

// Images
const Tico = require('@/assets/images/headers/tico.png');
const ReturnImage = require('@/assets/images/headers/flech.png');
const VX = require('@/assets/images/headers/X.png');
const BX = require('@/assets/images/headers/bx.png');
const flecheRecette = require('@/assets/images/headers/fleche.png');
const OF = require('@/assets/images/headers/OFleche.png');
const VF = require('@/assets/images/headers/vf.png');
const FilterConseils = require('@/assets/images/tips/FILTRE_CONSEILS.png');
const FilterRecettes = require("@/assets/images/recipes/FILTRE_RECETTES.png");

type Props = {
  color?: string;
  image?: 'x' | 'rf' | 'bf' | 'bx' | 'of' | 'vf' | 'vx';
  back?: boolean;
  isRecipes?:boolean;
  isTips?:boolean;
};

const CustomHeader = ({
  color = '#fff',
  image,
  back=true,
   isRecipes = false,
  isTips = false,
}: Props) => {
  const router = useRouter();

  const imageMap: Record<string, any> = {
    x: BX,
    rf: flecheRecette,
    bf: ReturnImage,
    bx: BX,
    of: OF,
    vf: VF,
    vx: VX,
  };

  const SRC = imageMap[image || ''] || ReturnImage;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: color }]}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={back ? () => router.back():() => router.push('/')}
          style={styles.iconButton}
        >
          <Image source={SRC} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.ticoContainer}>
         {isRecipes && (
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={FilterRecettes}
                style={styles.filter}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          {isTips && (
            <TouchableOpacity style={styles.iconButton}
              onPress={() => router.push('/tiptab/tipSettings')}
            >
              <Image
                source={FilterConseils}
                style={styles.filter}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
           
          <TouchableOpacity style={styles.iconButton}>
            <Image source={Tico} style={styles.ticoImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
  },
  container: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
  iconImage: {
    height: 40,
    width: 40,
  },
  ticoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticoImage: {
    height: 24,
    width: 70,
  },
   filter: {
    height: 33,
    width: 50,
  },
});

export default CustomHeader;
