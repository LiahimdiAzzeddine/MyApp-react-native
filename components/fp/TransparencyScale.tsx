import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import TransparencyInfo from './TransparencyInfo';
import Modal from 'react-native-modal';

// Composant WhiteModal équivalent
const WhiteModal = ({ 
    isOpen, 
    children, 
    ContentPadding = '', 
    scroll = false, 
    onClose 
  }: { 
    isOpen: boolean, 
    children: React.ReactNode, 
    ContentPadding?: string, 
    scroll?: boolean, 
    onClose: () => void 
  }) => {
    return (
      <Modal
        isVisible={isOpen}
        onBackdropPress={onClose}
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={[styles.modalContent, scroll && styles.scrollable]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {children}
        </View>
      </Modal>
    );
  };
  


type TransparencyScaleProps = {
  currentPosition: number;
};

const TransparencyScale: React.FC<TransparencyScaleProps> = ({ 
  currentPosition, 
}) => {
  const positions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [showModalTransparency, setShowModalTransparency] = useState(false);

  // Images
  const indicateurImage = require('@/assets/images/fp/indicateur.png');
  const indicateur100Image = require('@/assets/images/fp/indicateur100.png');
  const scaleImage = require('@/assets/images/fp/scale-image.png');

  

  const getIndicatorStyle = (index: number) => {
    const baseSize = index !== 11 ? 25 : 14;
    const growthFactor = 1;
    const size = baseSize + (index * growthFactor);
    
    // Calculate vertical translation based on position
    const baseTranslate = -6; // Base translation percentage
    const translateYOffset = index ; // Increase offset by 5% for each position
    
    const width = index !== 11 ? size : baseSize;
    const maxWidth = 30 + (index * 5);
    
    return {
      width: Math.min(width, maxWidth),
      position: 'absolute',
      top: '66%',
      left: index !== 11 ? '50%' : 0,
      transform: [
        { translateX: index !== 11 ? -width /20 : -width * 0.65 },
        { translateY: index !== 11 ? -(baseTranslate + translateYOffset) : 10 }
      ]
    };
  };

  const getIndicatorImage = (index: number) => {
    return index === 9 ? indicateur100Image : indicateurImage;
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.scaleContainer}>
          <Image 
            source={scaleImage} 
            style={styles.scaleImage} 
            resizeMode="contain"
          />

          <View style={styles.indicatorsContainer}>
            {positions.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={styles.positionTouchable}
              >
                {currentPosition === (index + 1) && (
                  <Image
                    source={getIndicatorImage(index)}
                    style={[
                      styles.indicator,
                      { 
                        width: getIndicatorStyle(index).width,
                        transform: getIndicatorStyle(index).transform
                      }
                    ]}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            ))}
            
            {currentPosition === 0 && (
              <Image
                source={indicateurImage}
                style={[
                  styles.indicator,
                  { 
                    width: getIndicatorStyle(11).width,
                    left: 0,
                    transform: getIndicatorStyle(11).transform
                  }
                ]}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={() => setShowModalTransparency(true)}
            style={styles.link}
          >
            <Text style={styles.linkText}>
              En savoir plus sur notre échelle de transparence
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <WhiteModal 
        isOpen={showModalTransparency} 
        ContentPadding="ion-padding-top" 
        scroll={true} 
        onClose={() => setShowModalTransparency(false)}
      >
        <TransparencyInfo/>
      </WhiteModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  positionTouchable: {
    flex: 1,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
  },
  linkContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: -12,
  },
  link: {
    padding: 0,
  },
  linkText: {
    color: '#6dc3bc',
    textDecorationLine: 'underline',
    fontSize: 10,
    fontFamily: 'ArchivoItalic', 
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  scrollable: {
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  transparencyInfo: {
    padding: 16,
  },
  transparencyInfoText: {
    fontSize: 14,
  },
});

export default TransparencyScale; 