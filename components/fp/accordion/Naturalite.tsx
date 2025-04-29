import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';

type ScoreNat = {
  _goum?: 'C' | 'N' | 'V';
  _short?: string;
  _medium?: string;
  _long?: string;
};

type Props = {
  togglePanel: (panelNumber: number) => void;
  scoreNat?: ScoreNat;
};

const Naturalite: React.FC<Props> = ({ togglePanel, scoreNat }) => {
  const handlePress = (e: GestureResponderEvent) => {
    e.stopPropagation?.();
    togglePanel(8);
  };

  const getLogo = () => {
    switch (scoreNat?._goum) {
      case 'C':
        return require('@/assets/images/fp/naturalite/Logo-originalC.png');
      case 'N':
        return require('@/assets/images/fp/naturalite/Logo-originalNo.png');
      case 'V':
        return require('@/assets/images/fp/naturalite/Logo-originalV.png');
      default:
        return null;
    }
  };

  const texts = [scoreNat?._short, scoreNat?._medium, scoreNat?._long].filter(Boolean);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          <Text style={styles.highlight}>Naturalité des </Text>
          ingrédients
        </Text>

        {scoreNat?._goum && ['C', 'N', 'V'].includes(scoreNat._goum) && (
          <View style={styles.logoBlock}>
            <Image source={getLogo()} style={styles.logoImage} resizeMode="contain" />
          </View>
        )}

        <View style={styles.textSection}>
          <Text style={styles.paragraph}>
            La naturalité des ingrédients s'oppose à l'ultra-transformation. Il est important de choisir des aliments
            peu ou pas transformés pour prendre soin de votre santé.
          </Text>
          <Text style={styles.paragraph}>
            Texte général pour « ingrédients à vérifier »
          </Text>
          {texts.length > 0 && (
            <View style={styles.bulletList}>
              {texts.map((text, index) => (
                <Text key={index} style={styles.bulletItem}>
                  - {text}
                </Text>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.imageWrapper} onPress={handlePress}>
          <Image
            source={require('@/assets/images/fp/FICHETOP.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Naturalite;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f4f2', // custom-green-clear
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 32,
    minHeight: 200,
    position: 'relative',
    zIndex: 0,
    width: '100%',
  },
  innerContainer: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c6b66',
  },
  highlight: {
    backgroundColor: '#00cccc',
    fontWeight: 'bold',
  },
  logoBlock: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '60%',
    height: 100,
    maxWidth: 120,
    maxHeight: 120,
  },
  textSection: {
    gap: 12,
    paddingBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    color: '#2c6b66',
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    fontSize: 14,
    color: '#2c6b66',
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 0,
  },
  iconImage: {
    width: 48,
    height: 48,
  },
});
