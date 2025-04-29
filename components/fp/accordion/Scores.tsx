import React from 'react';
import { View, Text, Image } from 'react-native';
const NutriScoreA = require('@/assets/images/nutriscore/Nutri_score_A.png');
const NutriScoreB = require('@/assets/images/nutriscore/NutriscoreB.png');
const NutriScoreC = require('@/assets/images/nutriscore/NutriscoreC.png');
const NutriScoreD = require('@/assets/images/nutriscore/NutriscoreD.png');
const NutriScoreE = require('@/assets/images/nutriscore/NutriscoreE.png');
type ScoresProps = {
    nutriscore: 'A' | 'B' | 'C' | 'D' | 'E';
  };
  
  const Scores: React.FC<ScoresProps> = ({ nutriscore }) => {
    const nutriscoreImages = {
      A: NutriScoreA,
      B: NutriScoreB,
      C: NutriScoreC,
      D: NutriScoreD,
      E: NutriScoreE,
    };
  
    const nutriscorePhrase: Record<string, string> = {
      A: "Les produits notés A sont généralement riches en nutriments bénéfiques (fibres, protéines, vitamines) et faibles en éléments à limiter comme les graisses saturées, les sucres ou le sel. Ce sont des aliments à privilégier dans le cadre d’une alimentation équilibrée.",
      B: "Les produits classés B restent de bons choix pour votre alimentation. Ils contiennent un bon mix de nutriments, avec parfois un peu plus de graisses, sucres ou sel que les produits notés A et un peu moins que les produits notés C.",
      C: "Un produit avec un Nutri-Score C peut contenir plus de graisses, de sucre ou de sel. Mais attention, ça ne veut pas dire qu’il faut l’éviter ! Certains aliments comme les huiles végétales, riches en bonnes graisses, peuvent avoir un C tout en étant bons pour la santé. Tout est une question d’équilibre !",
      D: "Un produit noté D contient généralement des nutriments à limiter (graisses saturées, sucres ou sel). Mais certains, comme les fromages, apportent aussi des nutriments intéressants comme le calcium. Ils peuvent faire partie d’une alimentation variée si on les consomme avec modération.",
      E: "Les produits classés E sont ceux qui contiennent le plus d’éléments à limiter (graisses saturées, sucres, sel). Ils sont à consommer avec parcimonie. Toutefois, certains produits peuvent être classés E tout en étant intéressants nutritionnellement, comme certaines huiles. L’important, c’est de les intégrer à petite dose dans votre alimentation globale.",
    };
  
    const selectedNutriscoreImage = nutriscoreImages[nutriscore] || NutriScoreE;
    const selectedNutriscorePhrase =
      nutriscorePhrase[nutriscore] || "Ce produit est à consommer avec précaution.";
  
    return (
      <View>
        <Text className="text-xl text-custom-blue font-bold py-3 px-2">
          <Text className="marker-effect-cyan font-extrabold">Nutri-Score</Text>
        </Text>
        <View className="p-2 flex flex-col gap-4">
          <Image
            source={selectedNutriscoreImage}
            resizeMode="contain"
            className="self-center p-2"
            style={{width:100,height:100}}
          />
          <Text className="indent-4 text-custom-blue font-light leading-relaxed text-sm">
            Le Nutri-Score est une note qui vous permet d’avoir une information sur la qualité
            nutritionnelle d’un coup d’œil. Il vous permet de comparer les produits d’une même
            catégorie. Le Nutri-Score est à considérer dans le cadre d’une alimentation variée, tout
            est question d’équilibre.
          </Text>
          <Text className="indent-4 text-custom-blue font-light leading-relaxed text-sm">
            {selectedNutriscorePhrase}
          </Text>
        </View>
      </View>
    );
  };
  
  export default Scores;
