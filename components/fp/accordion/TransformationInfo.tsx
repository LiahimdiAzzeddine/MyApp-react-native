import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Collapsible from 'react-native-collapsible';

interface Props {
  togglePanel: (panelNumber: number) => void;
  scoreEnv: {
    _pest?: string;
    _biod?: string;
    _climat?: string;
    _bea?: string;
    _general?: string;
    _imageurl?: string;
  };
}

const panels = [
  { id: '10', title: 'Pesticides', key: '_pest' },
  { id: '20', title: 'Biodiversité', key: '_biod' },
  { id: '30', title: 'Climat', key: '_climat' },
  { id: '40', title: 'Bien-être animal', key: '_bea' },
];

const TransformationInfo: React.FC<Props> = ({ togglePanel, scoreEnv }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [activeSections, setActiveSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setActiveSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };
/*
  const getImageSource = () => {
    return scoreEnv!._imageurl
      ? { uri: scoreEnv!._imageurl }
      : require('@/assets/images/fp/b-abe-planet-score-243x132.png');
  };*/

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      <Text style={styles.title}>
        <Text style={styles.highlight}>Planet-Score</Text>
      </Text>

      <View style={styles.imageWrapper}>
        <Image
          source={require('@/assets/images/fp/b-abe-planet-score-243x132.png')}
          resizeMode="contain"
          style={styles.image}
        />
        {!showInfo && (
          <TouchableOpacity onPress={() => setShowInfo(true)}>
            <Text style={styles.link}>En savoir plus</Text>
          </TouchableOpacity>
        )}
      </View>

      {showInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Le Planet-Score est un système d'évaluation complet qui donne une
            vision globale de la durabilité d'un produit. Il prend en compte :
          </Text>
          <Text style={styles.infoText}>- Impact environnemental</Text>
          <Text style={styles.infoText}>- Bien-être animal</Text>
          <Text style={styles.infoText}>
            Basé sur des données scientifiques solides, c’est le score le plus
            précis pour mesurer l’impact environnemental. Évalué par des experts
            indépendants.
          </Text>
          <TouchableOpacity onPress={() => setShowInfo(false)}>
            <Text style={styles.link}>Fermer</Text>
          </TouchableOpacity>
        </View>
      )}

      {scoreEnv._general && (
        <Text style={styles.general}>{scoreEnv._general}</Text>
      )}

      {panels.map((panel) => {
        const isActive = activeSections.includes(panel.id);
        const disabled = !scoreEnv[panel.key as keyof typeof scoreEnv];
        return (
          <View key={panel.id} style={styles.accordionContainer}>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => toggleSection(panel.id)}
              style={[styles.accordionHeader, disabled && styles.disabledHeader]}
            >
              <Text style={styles.accordionTitle}>{panel.title}</Text>
              {!disabled && (
                <Image
                  source={require('@/assets/images/fp/flechBottom.png')}
                  style={styles.arrow}
                />
              )}
            </TouchableOpacity>
            <Collapsible collapsed={!isActive}>
              <Text style={styles.panelContent}>
                {scoreEnv[panel.key as keyof typeof scoreEnv]}
              </Text>
            </Collapsible>
          </View>
        );
      })}

      <TouchableOpacity
        onPress={() => togglePanel(3)}
        style={styles.ficheTopWrapper}
      >
        <Image
          source={require('@/assets/images/fp/FICHETOP.png')}
          style={styles.ficheTop}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0f4ee',
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    minHeight: 300,
    paddingHorizontal: 16,
  },
  inner: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    paddingTop: 24,
    fontWeight: 'bold',
    color: '#006d77',
  },
  highlight: {
    fontWeight: '900',
    color: '#00b4d8',
  },
  imageWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: '60%',
    height: 120,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#2f7e79',
    fontSize: 14,
    marginTop: 8,
  },
  infoBox: {
    paddingVertical: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#2f7e79',
    marginBottom: 6,
  },
  general: {
    fontSize: 14,
    color: '#2f7e79',
    paddingTop: 8,
  },
  accordionContainer: {
    marginTop: 12,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#c6e8e5',
    paddingVertical: 8,
  },
  disabledHeader: {
    opacity: 0.4,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006d77',
  },
  arrow: {
    width: 20,
    height: 20,
  },
  panelContent: {
    padding: 8,
    color: '#2f7e79',
    fontSize: 14,
  },
  ficheTopWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  ficheTop: {
    width: 48,
    height: 48,
  },
});

export default TransformationInfo;
