import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// Importez vos images
const indicateurImage = require('@/assets/images/fp/indicateur.png');
const indicateur100Image = require('@/assets/images/fp/indicateur100.png');
const scaleImage = require('@/assets/images/fp/scale-image.png');

// Composant pour le titre TiCO
const TicoTitle = () => (
  <Text>
    <Text style={styles.pallyBold}>Ti</Text>
    <Text style={[styles.pallyBold, styles.trackingTightest]}>CO</Text>
  </Text>
);

const TransparencyInfo = () => {
  const positions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const getIndicatorStyle = (index: number) => {
    const baseSize = 50;
    const growthFactor = 5;
    const size = baseSize + index * growthFactor;

    // Calculate vertical translation based on position
    const baseTranslate = 10; // Base translation percentage
    const translateYOffset = index * 6; // Increase offset by 5% for each position

    return {
      width: size,
      maxWidth: 30 + index * 5,
      transform: [
        { translateX: -size / 2 },
        { translateY: -(baseTranslate + translateYOffset) }
      ]
    };
  };

  const getIndicatorImage = (index: number) => {
    return index === 9 ? indicateur100Image : indicateurImage;
  };

  return (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >
 <View style={styles.scaleContainer}>
        <Image
          source={scaleImage}
          style={styles.scaleImage}
          resizeMode="contain"
        />
        <View style={styles.indicatorsContainer}>
          {positions.slice(0, -1).map((_, index) => (
            <View key={index} style={styles.positionView}>
              {4 === index && (
                <Image
                  source={getIndicatorImage(index)}
                  style={[
                    styles.indicator,
                    {
                      width: getIndicatorStyle(index).width,
                      maxWidth: getIndicatorStyle(index).maxWidth,
                      transform: getIndicatorStyle(index).transform
                    }
                  ]}
                  resizeMode="contain"
                />
              )}
            </View>
          ))}
        </View>
      </View>
    <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>
            L'échelle de transparence <TicoTitle />
          </Text>
        </View>

        <Text style={styles.paragraph}>
          La transparence <TicoTitle /> est le fruit de recherches en matière
          d'information. Nous avons étudié les thématiques essentielles et les
          référentiels existants avec des experts pour sélectionner les plus
          qualitatifs sur le plan scientifique.
        </Text>

        <Text style={styles.paragraph}>
          Les évaluations et les informations demandent plus ou moins d'effort
          aux marques, c'est pourquoi notre notation de la transparence se fait
          fonction de notre grille d'évaluation qui récompense l'investissement
          et l'engagement fourni par les marques.
        </Text>

        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>
            la grille d'évaluation <TicoTitle />
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.subSectionTitle}>
            Le produit et la marque
          </Text>
          <Text style={styles.greenText}>
            Parce qu'on aime bien savoir à qui on a à faire !
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              Complétude et validation des données
            </Text>
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+1</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.subSectionTitle}>
            L'impact santé
          </Text>
          <Text style={styles.greenText}>
            Parce que nous voulons tous le meilleur
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              Profil nutritionnel et le Nutri-Score
            </Text>
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+1</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              Décryptage Nutri-Score et Ti'conseil
            </Text>
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+1</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              Naturalité des ingrédients selon le cahier des charges Goûm
            </Text>
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+1</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.subSectionTitle}>
            L'impact environnemental
          </Text>
          <Text style={styles.greenText}>
            Parce qu'on veut aussi prendre soin de notre planète
          </Text>
          <Text style={styles.regularText}>Évaluation Planet score :</Text>
          <View style={styles.rowContainer}>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• Biodiversité</Text>
              <Text style={styles.listItem}>• Pesticide</Text>
              <Text style={styles.listItem}>• Climat</Text>
              <Text style={styles.listItem}>• Bien-être animal</Text>
            </View>
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+2</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.subSectionTitle}>Les origines</Text>
          <Text style={styles.greenText}>
            Parce qu'on veut savoir d'où vient ce qu'on met dans nos assiettes
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              Certifications par des cahiers des charges spécialisés
            </Text>
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+2</Text>
            </View>
          </View>
          <View style={styles.orContainer}>
            <Text style={styles.regularText}>Ou</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              Décryptage <TicoTitle />
            </Text>
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+3</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.subSectionTitle}>
            Labels et mentions
          </Text>
          <Text style={styles.greenText}>
            Parce qu'on se pose beaucoup de question sur ce qui est écrit sur le produit
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              Décryptage <TicoTitle />
            </Text>
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+1</Text>
            </View>
          </View>
        </View>

        <Text style={styles.italicText}>
          Nous nous n'avons pas pu intégrer l'information sur la juste
          rémunération des producteurs car, malgré le fait que ce soit une
          information essentielle, il n'existe aucun référentiel satisfaisant
          capable de juger de cet élément à ce jour, mais nous travaillons avec
          nos partenaires pour en créer un !
        </Text>
      </View></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  scaleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  scaleImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 5,
  },
  indicatorsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionView: {
    flex: 1,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: '66%',
    left: '50%',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
    gap: 16,
  },
  titleContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F5259',
    fontFamily: 'Archivo-Bold',
    textAlign: 'center',
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 8,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F5259',
    fontFamily: 'Archivo-Bold',
  },
  paragraph: {
    color: '#0F5259',
    fontFamily: 'Archivo',
    marginBottom: 8,
    textAlign: 'left',
  },
  greenText: {
    color: '#42a29a',
    marginBottom: 8,
    fontFamily: 'Archivo',
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemText: {
    flex: 0.7,
    color: '#0F5259',
    fontFamily: 'Archivo',
  },
  plusBadge: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 4,
  },
  plusText: {
    color: '#0F5259',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 0.7,
  },
  listItem: {
    color: '#0F5259',
    fontFamily: 'Archivo',
    marginVertical: 2,
  },
  orContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 56,
  },
  regularText: {
    color: '#0F5259',
    fontFamily: 'Archivo',
  },
  italicText: {
    fontStyle: 'italic',
    color: '#0F5259',
    fontFamily: 'Archivo-Italic',
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center',
  },
  pallyBold: {
    fontFamily: 'Pally-Bold',
    fontWeight: 'bold',
  },
  trackingTightest: {
    letterSpacing: -1,
  },
});

export default TransparencyInfo;