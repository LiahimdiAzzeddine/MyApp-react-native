import React from 'react';
import { ScrollView, View, Text, Linking, StyleSheet } from 'react-native';

const CGUConfidentialiteScreen = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CGU-Confidentialité</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>1. Préambule</Text>
        <Text style={styles.paragraph}>
           TiCO est une application permettant d’accéder à des informations
              claires et centralisées sur les produits alimentaires, afin de
              permettre à chacun.e.s de faire des choix éclairés et
              responsables. Notre mission est de garantir la transparence, tout
              en favorisant une consommation plus simple, durable et accessible
              à tous.tes.
        </Text>
        <Text style={styles.paragraph}>
         La SAS FEELOFOOD, R.C.S. de Poitiers n°883 111 528,
              7 avenue du Tour de France BP 70183 86961 FUTUROSCOPE
              CHASSENEUIL CEDEX, ci-après désigné Foodhea, est l’éditeur de
              l’application TiCO. N° SIRET : 883 111 528 00021
              N° TVA Intracommunautaire : FR 883 111 528. Contact : <Text
          style={styles.link}
          onPress={() => openLink('mailto:contact@foodhea.com')}>
          contact@foodhea.com
        </Text>
        </Text>
        
        <Text style={styles.paragraph}>
          En utilisant l’application TiCO, les utilisateurs acceptent les
              Conditions Générales d’Utilisation (CGU). Nous invitons tous les
              utilisateurs à les lire attentivement pour comprendre leurs droits
              et obligations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. Objet des CGU</Text>
        <Text style={styles.paragraph}>
          Les Conditions Générales d’Utilisation (CGU) définissent les
              règles d’utilisation de l’application TiCO, précisant les droits
              et responsabilités des utilisateurs ainsi que ceux de l’éditeur.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. Description des services</Text>
        <Text style={styles.paragraph}>
          L’application TiCO est accessible gratuitement en téléchargement...
        </Text>
        {/* Ajoute ici les autres paragraphes comme dans les sections précédentes */}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. Données personnelles</Text>
        <Text style={styles.paragraph}>
          TiCO s’engage à respecter la confidentialité des données personnelles...
        </Text>
        <Text
          style={styles.link}
          onPress={() => openLink('mailto:dpo@foodhea.com')}>
          dpo@foodhea.com
        </Text>
        <Text
          style={styles.link}
          onPress={() => openLink('https://www.cnil.fr')}>
          CNIL
        </Text>
      </View>

      {/* Continue avec les autres sections de la même manière */}
    </ScrollView>
  );
};

export default CGUConfidentialiteScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004080',
    textAlign: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004080',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    color: '#004080',
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
});
