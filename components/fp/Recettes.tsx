import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
const recetteBadge = require('@/assets/images/recipes/recetteBadge.png');
const horloge = require('@/assets/images/recipes/horloge.png');
const flecheBleu = require('@/assets/images/recipes/fpfleche.png');
const defaultImageRecette = require('@/assets/images/recipes/defaultImageRecette.png');
import { AuthContext } from '@/context/AuthContext';
import { router, useRouter } from 'expo-router';
import { useBottomSheet } from '@/context/BottomSheetContext';

interface Recette {
  id: number;
  title: string;
  image?: string;
  difficulte?: string;
  timecook?: string;
  timerest?: string;
  timebake?: string;
  totalTime?: string;
}

interface RecettesProps {
  recettes: Recette[];
}

const Recettes: React.FC<RecettesProps> = ({ recettes }) => {
const { userInfo } = useContext(AuthContext);
    const isAuthenticated: boolean = !!userInfo;
    const navigation = useRouter();
  const { closeBottomSheet } = useBottomSheet();

  const handleRecetteClick = (recette: Recette) => {
   
  };

  const handleAddRecipe = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Attention',
        'Se connecter pour proposer une recette',
        [
          {
            text: 'Se connecter',
            onPress: () => navigation.navigate('Login' as never),
          },
          { text: 'Annuler', style: 'cancel' },
        ],
        { cancelable: true }
      );
    } else {
        closeBottomSheet()
      router.push('/recipetab/suggestrecipe')
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {recettes.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => handleRecetteClick(item)}
        >
          {index === 0 && (
            <Image source={recetteBadge} style={styles.badge} resizeMode="contain" />
          )}
          <View style={styles.content}>
            <Image
              source={item.image ? { uri: item.image } : defaultImageRecette}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.timeRow}>
                <Image source={horloge} style={styles.icon} />
                <View>
                  {!!item.difficulte && <Text>{item.difficulte} | </Text>}
                  {(item.timecook || item.timerest || item.timebake) && (
                    <Text style={styles.timeText}>Temps total : {item.totalTime}</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        <Image source={flecheBleu} style={styles.fleche} resizeMode='contain' />
        <TouchableOpacity style={styles.button} onPress={handleAddRecipe} >
          <Text  className="text-lg text-center text-white rounded-md font-bold w-48 p-2 ArchivoBold leading-archivo">Proposer une recette{'\n'} pour ce produit</Text>
        </TouchableOpacity>
      </View>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#ecf8f8',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -40,
    right: -5,
    width: 60,
    height: 60,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007BFF', // custom blue
    marginRight: 16,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#007BFF',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
    position: 'relative',
  },
  fleche: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: '#0F548D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    maxWidth: 240,
    alignItems: 'center',
  },

});

export default Recettes;
