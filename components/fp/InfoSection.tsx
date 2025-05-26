import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '@/types/product';
import ShareSection from './ShareSection';

// ✅ Import d'images locales avec alias @ (nécessite babel alias config)
const NutriA = require('@/assets/images/nutriscore/Nutri_score_A.png');
const NutriB = require('@/assets/images/nutriscore/NutriscoreB.png');
const NutriC = require('@/assets/images/nutriscore/NutriscoreC.png');
const NutriD = require('@/assets/images/nutriscore/NutriscoreD.png');
const NutriE = require('@/assets/images/nutriscore/NutriscoreE.png');
const Illustration = require('@/assets/images/fp/BubbleImg.png');
const FlecheLeft = require('@/assets/images/fp/FICHEFleche.png');

type Props = {
  product: Product;
};

const InfoSection: React.FC<Props> = ({ product }) => {
  const [isOpenNutrition, setIsOpenNutrition] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const nutriscoreImages = { A: NutriA, B: NutriB, C: NutriC, D: NutriD, E: NutriE };
  const nutriscoreComment = {
    A: 'OK côté nutrition, vérifier la naturalité des ingrédients avant de favoriser ce produit',
    B: 'Profil nutritionnel OK, vérifier la naturalité des ingrédients avant de favoriser ce produit',
    C: 'Profil nutritionnel moyen, vérifier la naturalité des ingrédients avant de favoriser ce produit',
    D: 'À consommer avec modération et vérifier la naturalité des ingrédients.',
    E: 'A consommer avec parcimonie et vérifier si les ingrédients sont naturels !',
  };

  const selectedNutriImg = product.nutriscore ? nutriscoreImages[product.nutriscore] : null;
  const selectedComment = product.nutriscore ? nutriscoreComment[product.nutriscore] : null;

  const openEmail = () => {
    Linking.openURL('mailto:contact@example.com');
  };

  const renderUnavailableContent = () => (
    <View style={styles.unavailableContainer}>
      <View style={styles.unavailableRow}>
        <View style={styles.unavailableTextContainer}>
          <Text style={styles.unavailableText}>Indisponible</Text>
          <Image source={FlecheLeft} style={styles.arrow} resizeMode='contain' />
        </View>
        <TouchableOpacity onPress={openEmail} style={styles.illustrationButton}>
          <Image source={Illustration} style={styles.illustration} resizeMode='contain'/>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View >
      {/* Header avec badge arrondi */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>LA SYNTHÈSE SUR LE PRODUIT</Text>
        </View>
      </View>

      {/* Contenu principal avec fond teal clair */}
      <View style={styles.mainContent}>
        <View style={styles.gridContainer}>
          {/* Section Nutrition - Top Left */}
          <View style={[styles.gridItem, styles.topLeft]}>
            <Text style={styles.sectionTitle}>Informations nutritionnelles</Text>
            
            {selectedNutriImg ? (
              <TouchableOpacity 
                style={styles.contentContainer} 
                onPress={() => setIsOpenNutrition(true)}
              >
                <View style={styles.nutriContainer}>
                  <Image source={selectedNutriImg} style={styles.nutriImage} />
                </View>
                <Ionicons 
                  name="chevron-forward-outline" 
                  size={20} 
                  color="#4a90a4" 
                  style={styles.chevron} 
                />
              </TouchableOpacity>
            ) : (
              renderUnavailableContent()
            )}
            
            <Text style={styles.commentText}>
              {selectedComment ?? 'Données non communiquées par le fabricant'}
            </Text>
            {Number(product!.transparency_scale) >1 && (
              <Text style={styles.transparentText}>Produit 100% transparent !</Text>
            )}
          </View>

          {/* Section Naturalité - Top Right */}
          <View style={[styles.gridItemRight, styles.topRight]}>
            <Text style={styles.sectionTitle}>Degré de transformation</Text>
            
            <TouchableOpacity 
              style={styles.contentContainer} 
              onPress={() => setIsOpenAdd(true)}
            >
              <View style={styles.additifsContainer}>
                <View style={styles.additifsIconContainer}>
                  <Ionicons name="cube-outline" size={32} color="#4a90a4" />
                  <Text style={styles.additifsText}>
                    {product.additifs?.length
                      ? `Contient ${product.additifs.length} additifs`
                      : ' Ne contient pas d’additifs'}
                  </Text>
                </View>
              </View>
              <Ionicons 
                name="chevron-forward-outline" 
                size={20} 
                color="#4a90a4" 
                style={styles.chevron} 
              />
            </TouchableOpacity>
            {product?.commentaire?(<Text style={styles.commentText}>{product?.commentaire}</Text>):(
              <Text style={styles.commentText}>À confirmer par un décryptage du produit</Text>
            )}
            
            
          </View>

          {/* Section Impact environnemental - Bottom Left */}
          <View style={[styles.gridItem, styles.bottomLeft]}>
            <Text style={styles.sectionTitle}>Impact environnemental</Text>
            
            {product.commentaire && product.planetScore ? (
              <TouchableOpacity style={styles.contentContainer}>
                <View style={styles.environmentContainer}>
                  <View style={styles.environmentIcons}>
                    <Text style={styles.environmentEmoji}>🌍</Text>
                    <Text style={styles.environmentEmoji}>🍃</Text>
                    <Text style={styles.environmentEmoji}>🌱</Text>
                  </View>
                  <Text style={styles.environmentText}>Impact environnemental</Text>
                </View>
                <Ionicons 
                  name="chevron-forward-outline" 
                  size={20} 
                  color="#4a90a4" 
                  style={styles.chevron} 
                />
              </TouchableOpacity>
            ) : (
              renderUnavailableContent()
            )}
            
           
          </View>

          {/* Section Origines - Bottom Right */}
          <View style={[styles.gridItemRight, styles.bottomRight]}>
            <Text style={styles.sectionTitle}>Origines</Text>
            
            {product.commentaire ? (
              <TouchableOpacity style={styles.contentContainer}>
                <View style={styles.originesContainer}>
                  <View style={styles.originesInfo}>
                    <Text style={styles.originesLabel}>🇫🇷 France</Text>
                    <Text style={styles.originesDetail}>Lieu de conditionnement : France</Text>
                    <Text style={styles.originesDetail}>Tomate : Espagne</Text>
                    <Text style={styles.originesDetail}>Bœuf : France</Text>
                  </View>
                </View>
                <Ionicons 
                  name="chevron-forward-outline" 
                  size={20} 
                  color="#4a90a4" 
                  style={styles.chevron} 
                />
              </TouchableOpacity>
            ) : (
              renderUnavailableContent()
            )}
       
          </View>
        </View>

        {/* Bottom Action Bar avec icônes rondes */}
        <ShareSection  gtin={product.gtin} productName={product.name}/>
      </View>

   
   
    </View>
  );
};

const styles = StyleSheet.create({

  headerContainer: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    backgroundColor: '#a9d7d4',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: -19,
  },
  title: {
    color: '#2c5f70',
    fontSize: 14,
    textAlign: 'left',
    fontFamily:'ArchivoBold'
  },
  mainContent: {
    backgroundColor: '#e8f4f5',
    paddingHorizontal: 5,
    paddingBottom: 25,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
   
  },
  gridItem: {
    width: '50%',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 5,
    justifyContent: 'flex-start',
    minHeight: 100,
  },
  gridItemRight: {
    width: '50%',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
    minHeight: 100,
  },
  topLeft: {
    paddingTop:28,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#b8dde0',
    paddingRight:5
  },
  topRight: {
     paddingTop:28,
    borderBottomWidth: 1,
    borderColor: '#b8dde0',
  },
  bottomLeft: {
    borderRightWidth: 1,
    borderColor: '#b8dde0',
  },
  bottomRight: {
    marginLeft: 0,
  },
  sectionTitle: {
    color: '#2c5f70',
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 14,
    fontFamily:"ArchivoBold"
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 8,
    minHeight: 40,
  },
  nutriContainer: {
    //alignItems: 'flex-start',
  },
  nutriImage: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
  chevron: {
    marginLeft: 2,
  },
  additifsContainer: {
    flex: 1,
  },
  additifsIconContainer: {
    alignItems: 'center',
  },
  additifsText: {
    fontSize: 11,
    color: '#2c5f70',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '600',
  },
  environmentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  environmentIcons: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  environmentEmoji: {
    fontSize: 16,
    marginHorizontal: 2,
  },
  environmentText: {
    fontSize: 10,
    color: '#2c5f70',
    textAlign: 'center',
  },
  originesContainer: {
    flex: 1,
  },
  originesInfo: {
    alignItems: 'flex-start',
  },
  originesLabel: {
    fontSize: 12,
    color: '#2c5f70',
    fontWeight: '600',
    marginBottom: 2,
  },
  originesDetail: {
    fontSize: 9,
    color: '#7bb3b8',
    marginBottom: 1,
  },
  commentText: {
    color: '#42a29a',
    fontSize: 9,
    fontStyle: 'italic',
    lineHeight: 11,
  },
  transparentText: {
    color: '#42a29a',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  unavailableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  unavailableTextContainer: {
    position: 'relative',
    marginRight:2,
  },
  unavailableText: {
    fontSize: 10,
    color: '#42a29a',
    textAlign: 'center',
  },
  arrow: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: -32,
    top: 5,
    transform: [{ rotate: '-25deg' }],
  },
  illustrationButton: {
    padding: 4,
  },
  illustration: {
    width: 32,
    height: 32,
  },
 

});

export default InfoSection;