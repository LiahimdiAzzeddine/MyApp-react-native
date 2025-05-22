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
    A: 'A consommer avec parcimonie et vérifier si les ingrédients sont naturels !',
    B: 'Profil nutritionnel OK, vérifier la naturalité…',
    C: 'Profil nutritionnel moyen, vérifier la naturalité…',
    D: 'À consommer avec modération…',
    E: 'À consommer avec parcimonie…',
  };

  const selectedNutriImg = product.nutriscore ? nutriscoreImages[product.nutriscore] : null;
  const selectedComment = product.nutriscore ? nutriscoreComment[product.nutriscore] : null;

  const openEmail = () => {
    Linking.openURL('mailto:contact@example.com');
  };

  const renderUnavailableContent = () => (
    <View style={styles.unavailableContainer}>
      <Text style={styles.unavailableText}>Indisponible</Text>
      <View style={styles.unavailableIconContainer}>
        <Image source={FlecheLeft} style={styles.arrow} />
        <TouchableOpacity onPress={openEmail}>
          <Image source={Illustration} style={styles.illustration} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LA SYNTHÈSE DU PRODUIT</Text>
      </View>

      <View style={styles.gridContainer}>
        {/* Section Nutrition - Top Left */}
        <View style={[styles.gridItem, styles.topLeft]}>
          <Text style={styles.sectionTitle}>Informations nutritionnelles</Text>
          
          {selectedNutriImg ? (
            <TouchableOpacity style={styles.contentContainer} onPress={() => setIsOpenNutrition(true)}>
              <View style={styles.nutriContainer}>
                <Text style={styles.nutriLabel}>NUTRI-SCORE</Text>
                <Image source={selectedNutriImg} style={styles.nutriImage} />
              </View>
              <Ionicons name="chevron-forward-outline" size={24} color="#4a90a4" style={styles.chevron} />
            </TouchableOpacity>
          ) : (
            renderUnavailableContent()
          )}
          
          <Text style={styles.commentText}>
            {selectedComment ?? 'Données non communiquées par le fabricant'}
          </Text>
        </View>

        {/* Section Naturalité - Top Right */}
        <View style={[styles.gridItem, styles.topRight]}>
          <Text style={styles.sectionTitle}>Naturalité des ingrédients</Text>
          
          <TouchableOpacity style={styles.contentContainer} onPress={() => setIsOpenAdd(true)}>
            <Text style={styles.additifsText}>
              {product.additifs?.length
                ? `Contient ${product.additifs.length} additifs`
                : 'Ne contient pas d\'additifs'}
            </Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#4a90a4" style={styles.chevron} />
          </TouchableOpacity>
          
          <Text style={styles.commentText}>
            À confirmer par un décryptage du produit
          </Text>
        </View>

        {/* Section Impact environnemental - Bottom Left */}
        <View style={[styles.gridItem, styles.bottomLeft]}>
          <Text style={styles.sectionTitle}>Impact environnemental</Text>
          
          {product.commentaire && product.planetScore ? (
            <Image source={{ uri: product.planetScore }} style={styles.planetScore} />
          ) : (
            renderUnavailableContent()
          )}
        </View>

        {/* Section Origines - Bottom Right */}
        <View style={[styles.gridItem, styles.bottomRight]}>
          <Text style={styles.sectionTitle}>Origines</Text>
          {renderUnavailableContent()}
        </View>
      </View>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={28} color="#4a90a4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="restaurant-outline" size={28} color="#4a90a4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={Illustration} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>

      {/* Modals (non implémentés ici) */}
      {/* {isOpenNutrition && <NutrriInfo />} */}
      {/* {isOpenAdd && <ContactAdditif />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8f4f8',
    width: '100%',
  },
  header: {
    backgroundColor: '#b8dde0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignSelf: 'flex-start',
    minWidth: '70%',
  },
  title: {
    color: '#2c5f70',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  gridItem: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  topLeft: {
    marginRight: '2%',
    marginBottom: 12,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#d0e7ea',
  },
  topRight: {
    marginLeft: '2%',
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: '#d0e7ea',
  },
  bottomLeft: {
    marginRight: '2%',
    borderRightWidth: 0.5,
    borderColor: '#d0e7ea',
  },
  bottomRight: {
    marginLeft: '2%',
  },
  sectionTitle: {
    color: '#4a90a4',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  nutriContainer: {
    flex: 1,
  },
  nutriLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  nutriImage: {
    width: 100,
    height: 20,
    resizeMode: 'contain',
  },
  chevron: {
    marginLeft: 8,
  },
  additifsText: {
    fontSize: 12,
    color: '#2c5f70',
    flex: 1,
  },
  commentText: {
    color: '#7bb3b8',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 14,
  },
  unavailableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableText: {
    fontSize: 12,
    color: '#7bb3b8',
    marginBottom: 8,
  },
  unavailableIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 16,
    height: 16,
    transform: [{ rotate: '-40deg' }],
    marginRight: 8,
  },
  illustration: {
    width: 24,
    height: 24,
  },
  planetScore: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#b8dde0',
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 28,
    height: 28,
  },
});
export default InfoSection;
