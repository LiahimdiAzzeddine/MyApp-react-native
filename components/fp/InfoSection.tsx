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

// ✅ Import d’images locales avec alias @ (nécessite babel alias config)
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
    A: 'OK côté nutrition, vérifier la naturalité des ingrédients…',
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LA SYNTHÈSE DU PRODUIT</Text>

      {/* Section Nutrition */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations nutritionnelles</Text>
        {selectedNutriImg ? (
          <TouchableOpacity style={styles.row} onPress={() => setIsOpenNutrition(true)}>
            <Image source={selectedNutriImg} style={styles.nutriImage} />
            <Ionicons name="chevron-forward-outline" size={20} color="#1e3a5f" />
          </TouchableOpacity>
        ) : (
          <View style={styles.row}>
            <Text style={styles.smallText}>Indisponible</Text>
            <Image source={FlecheLeft} style={styles.arrow} />
            <TouchableOpacity onPress={openEmail}>
              <Image source={Illustration} style={styles.illustration} />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.commentText}>
          {selectedComment ?? 'Données non communiquées par le fabricant'}
        </Text>
      </View>

      {/* Section Additifs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Naturalité des ingrédients</Text>
        <TouchableOpacity style={styles.row} onPress={() => setIsOpenAdd(true)}>
          <Text style={styles.smallText}>
            {product.additifs?.length
              ? `Contient ${product.additifs.length} additifs`
              : 'Ne contient pas d’additifs'}
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#1e3a5f" />
        </TouchableOpacity>
        {!product.commentaire && (
          <Text style={styles.commentText}>À confirmer par un décryptage du produit</Text>
        )}
      </View>

      {/* Section Impact environnemental */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Impact environnemental</Text>
        {product.commentaire && product.planetScore ? (
          <Image source={{ uri: product.planetScore }} style={styles.planetScore} />
        ) : (
          <View style={styles.row}>
            <Text style={styles.smallText}>Indisponible</Text>
            <Image source={FlecheLeft} style={styles.arrow} />
            <TouchableOpacity onPress={openEmail}>
              <Image source={Illustration} style={styles.illustration} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Modals (non implémentés ici) */}
      {/* {isOpenNutrition && <NutrriInfo />} */}
      {/* {isOpenAdd && <ContactAdditif />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: '#d9f2f1',width:"100%" },
  title: {
    backgroundColor: '#a9d7d4',
    padding: 8,
    borderRadius: 12,
    color: '#1e3a5f',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#b2dfdb',
    paddingBottom: 12,
  },
  sectionTitle: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nutriImage: { width: 60, height: 30, resizeMode: 'contain' },
  commentText: { color: '#42a29a', fontSize: 11, fontStyle: 'italic' },
  smallText: { fontSize: 11, color: '#1e3a5f' },
  arrow: { width: 20, height: 20, transform: [{ rotate: '-40deg' }] },
  illustration: { width: 30, height: 30 },
  planetScore: { width: 140, height: 40, resizeMode: 'contain' },
});

export default InfoSection;
