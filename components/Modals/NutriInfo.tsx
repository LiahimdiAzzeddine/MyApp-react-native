import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CustomModal from './Modal';
import { useBottomSheet } from '@/context/BottomSheetContext';

interface NutriInfoProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  nutriscore: 'A' | 'B' | 'C' | 'D' | 'E';
  nutriscore_comment?: string;
  togglePanel: () => void;
}

// Images importées correctement
const nutriscoreImages: Record<string, any> = {
  A: require('@/assets/images/nutriscore/Nutri_score_A.png'),
  B: require('@/assets/images/nutriscore/NutriscoreB.png'),
  C: require('@/assets/images/nutriscore/NutriscoreC.png'),
  D: require('@/assets/images/nutriscore/NutriscoreD.png'),
  E: require('@/assets/images/nutriscore/NutriscoreE.png'),
};

const nutriscorePhrase: Record<string, string> = {
  A: "Les produits notés A sont généralement riches en nutriments bénéfiques (fibres, protéines, vitamines) et faibles en éléments à limiter comme les graisses saturées, les sucres ou le sel. Ce sont des aliments à privilégier dans le cadre d'une alimentation équilibrée.",
  B: "Les produits classés B restent de bons choix pour votre alimentation. Ils contiennent un bon mix de nutriments, avec parfois un peu plus de graisses, sucres ou sel que les produits notés A et un peu moins que les produits notés C.",
  C: "Un produit avec un Nutri-Score C peut contenir plus de graisses, de sucre ou de sel. Mais attention, ça ne veut pas dire qu'il faut l'éviter ! Certains aliments comme les huiles végétales, riches en bonnes graisses, peuvent avoir un C tout en étant bons pour la santé. Tout est une question d'équilibre !",
  D: "Un produit noté D contient généralement des nutriments à limiter (graisses saturées, sucres ou sel). Mais certains, comme les fromages, apportent aussi des nutriments intéressants comme le calcium. Ils peuvent faire partie d'une alimentation variée si on les consomme avec modération.",
  E: "Les produits classés E sont ceux qui contiennent le plus d'éléments à limiter (graisses saturées, sucres, sel). Ils sont à consommer avec parcimonie. Toutefois, certains produits peuvent être classés E tout en étant intéressants nutritionnellement, comme certaines huiles. L'important, c'est de les intégrer à petite dose dans votre alimentation globale.",
};

const NutriInfo: React.FC<NutriInfoProps> = ({
  isOpen,
  setIsOpen,
  nutriscore,
  togglePanel,
}) => {
  const selectedImage = nutriscoreImages[nutriscore] || nutriscoreImages.B;
  const selectedPhrase = nutriscorePhrase[nutriscore] || nutriscorePhrase.B;
  const { scrollRef, scrollRefpage } = useBottomSheet();

  const handleMoreInfo = () => {
    console.log("click savoir plus");
    setIsOpen(false);
    setTimeout(() => {
      togglePanel();
    }, 50); 
  };

  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <View style={styles.wrapper}>
        {/* Header */}
        <Text className='ArchivoBold text-2xl text-custom-blue ArchivoExtraBold' style={{padding: 8}}>
          Nutrition
        </Text>
        <Image source={selectedImage} style={styles.image} resizeMode="contain" />

        {/* Content */}
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <Text className='text-custom-blue text-center leading-tight ArchivoLight'>
            {selectedPhrase}
          </Text>
        </ScrollView>

        {/* Footer */}
        <TouchableOpacity onPress={handleMoreInfo} style={styles.linkContainer}>
          <Text 
            className="text-sm text-custom-blue underline text-center" 
            style={{paddingLeft: "5%"}}
          >
            En savoir plus
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  
  image: {
    width: 130,
    height: 70,
  },
  scrollArea: {
    maxHeight: 200,
    marginVertical: 10,
    width: '100%',
  },

  linkContainer: {
    paddingVertical: 1,
  },
  link: {
    color: '#0077cc',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default NutriInfo;