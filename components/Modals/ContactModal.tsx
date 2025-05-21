import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomModal from './Modal';

export const ContactModal = ({ isOpen, setIsOpen, gtin, productName }: any) => {
  const [isOpenTiCO, setIsOpenTiCO] = useState(false);
  const [isOpenSolliciter, setIsOpenSolliciter] = useState(false);

  const OpenContactTiCO = () => {
    setIsOpen(false);
    setIsOpenTiCO(true);
  };

  const OpenContactSolliciter = () => {
    setIsOpen(false);
    setIsOpenSolliciter(true);
  };

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <View style={styles.innerContainer}>
          <Image
            source={require('@/assets/images/popup/BubbleIImage.png')}
            style={styles.bubbleIcon}
          />
          <Text style={styles.title}>Contact</Text>

          <TouchableOpacity onPress={OpenContactTiCO} style={styles.option}>
            <Text style={styles.optionText}>
              Contacter <Text style={styles.bold}>TiCO</Text>
            </Text>
            <Image
              source={require('@/assets/images/popup/flecheleft.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={OpenContactSolliciter} style={styles.option}>
            <Image
              source={require('@/assets/images/popup/flecheleft.png')}
              style={styles.arrow}
            />
            <Text style={styles.optionText}>
              Encourager la marque à faire la transparence <Text style={styles.bold}>TiCO</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bubbleIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#003366', // Example blue
    fontWeight: 'bold',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#003366',
  },
  bold: {
    fontWeight: 'bold',
  },
  arrow: {
    width: 24,
    height: 24,
    marginLeft: 10,
    resizeMode: 'contain',
  },
});
