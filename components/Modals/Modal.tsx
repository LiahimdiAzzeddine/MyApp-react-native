import React from 'react';
import { Modal, View, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';
import { Animated } from 'react-native';
import styles from './style';
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


