import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomModal from './Modal';
import { useBottomSheet } from '@/context/BottomSheetContext';

export const ContactModal = ({ isOpen, setIsOpen}: any) => {
 const { setIsModalEncourager,setIsModalContactTico } =
     useBottomSheet();

  const OpenContactTiCO = () => {
    setIsOpen(false);
    setIsModalContactTico(true);
  };

  const OpenContactSolliciter = () => {
    setIsOpen(false);
   setIsModalEncourager(true)
  };

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <View style={styles.innerContainer}>
          <Image
            source={require('@/assets/images/popup/BubbleIImage.png')}
            style={styles.bubbleIcon}
          />
          <Text style={styles.title} className='text-custom-blue'>Contact</Text>

          <TouchableOpacity onPress={OpenContactTiCO} style={styles.option}>
            
            <Image
              source={require('@/assets/images/popup/flecheleft.png')}
              style={styles.arrowLeft}
            />
            <Text style={styles.optionText} className='text-custom-blue Archivo  leading-archivo'>
              Contacter <Text style={styles.bold}>TiCO</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={OpenContactSolliciter} style={styles.option}>
            <Image
              source={require('@/assets/images/popup/flecheleft.png')}
              style={styles.arrow}
            />
            <Text style={styles.optionText}  className='text-custom-blue Archivo leading-archivo'>
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
    paddingHorizontal: 30,
  },
  bubbleIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontFamily:"ArchivoBold",
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    position:"relative",
    textAlign:'center'
  },
  optionText: {
    fontSize: 18,
    textAlign:"center"
  },
  bold: {
    fontWeight: 'bold',
  },
  arrow: {
    position:'absolute',
    width: 24,
    height: 24,
    resizeMode: 'contain',
    left:-10,
    top:-7,
  },
    arrowLeft: {
    position:'absolute',
    width: 24,
    height: 24,
    left:-30,
    top:-7,
    resizeMode: 'contain',
  },
});
