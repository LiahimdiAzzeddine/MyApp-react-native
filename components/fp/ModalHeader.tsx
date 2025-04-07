import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface ModalHeaderProps {
  goToPage: (page: string) => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ goToPage }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => goToPage("tabs")}>
        <Image source={require('@/assets/images/flech.png')} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Image source={require('@/assets/icons/tico.png')} style={styles.ticoIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'white',
    paddingHorizontal:0,
    width:'100%'
  },

  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  titleContainer: {
    padding:0,
  },
  ticoIcon: {
    height: 25,
    width: 65,  
    resizeMode: 'contain',
    padding:0,
  },
});

export default ModalHeader;
