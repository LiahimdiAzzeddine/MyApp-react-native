import React from 'react';
import { Modal, View, StyleSheet, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';
import { Animated } from 'react-native';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CustomModal = ({ isOpen, onClose, children }: Props) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={styles.modalContainer}>
          <ImageBackground
            source={require('@/assets/images/popup/background.png')}
            resizeMode="contain"
            style={styles.background}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image
                source={require('@/assets/images/popup/close.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <View style={styles.content}>{children}</View>
          </ImageBackground>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    aspectRatio: 1, // makes it square
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  closeIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
