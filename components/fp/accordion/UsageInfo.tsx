import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';

type Props = {
  togglePanel: (panelNumber: number) => void;
  conservation?: string;
  utilisation?: string;
};

const UsageInfo: React.FC<Props> = ({ togglePanel, conservation, utilisation }) => {
  const handlePress = (e: GestureResponderEvent) => {
    e.stopPropagation?.(); // stopPropagation doesn't exist nativement sur RN, mais ok ici pour l'intention
    togglePanel(7);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {utilisation && (
          <>
            <Text style={styles.title}>
              <Text style={styles.highlight}>Conseil </Text>
              d’utilisation
            </Text>
            <View style={styles.textBlock}>
              <Text style={styles.paragraph}>{utilisation}</Text>
            </View>
          </>
        )}
        {conservation && (
          <>
            <Text style={styles.title}>
              <Text style={styles.highlight}>Conseil </Text>
              de conservation
            </Text>
            <View style={styles.textBlock}>
              <Text style={styles.paragraph}>{conservation}</Text>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.imageWrapper} onPress={handlePress}>
          <Image
           source={require('@/assets/images/fp/FICHETOP.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UsageInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f4f2', // custom-green-clear
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 32,
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 200,
    position: 'relative',
    zIndex: 0,
    width: '100%',
  },
  innerContainer: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c6b66',
  },
  highlight: {
    backgroundColor: '#00cccc', // approximation for "marker-effect-cyan"
    fontWeight: 'bold',
  },
  textBlock: {
    marginTop: 8,
    gap: 8,
  },
  paragraph: {
    fontSize: 14,
    color: '#2c6b66',
    textAlign: 'left',
    paddingLeft: 16, // simulate indent
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 0,
  },
  image: {
    width: 48,
    height: 48,
  },
});
