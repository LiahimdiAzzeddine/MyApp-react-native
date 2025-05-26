import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const productDeffaultImg = require('@/assets/images/defaults/500x400.png'); 

interface GlobalInfoProps {
  ImageSrc?: string |null;
  Name: string |null;
  Brand: string |null;
  Transparent: number |null;
}

const GlobalInfo: React.FC<GlobalInfoProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Réinitialiser l'état de chargement lorsque le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setImageLoading(true);
    }
  }, [isOpen]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  
  const handleImageError = () => {
    setImageLoading(false);
  };

  return (
    <View>
      <View style={styles.productContainer}>
        <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.imageContainer}>
          <Image
            source={props.ImageSrc ? { uri: props.ImageSrc } : productDeffaultImg}
            style={styles.productImage}
          />
        </TouchableOpacity>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{props.Name}</Text>
          <Text style={styles.productBrand}>{props.Brand}</Text>
          <Text style={styles.productTransparency}>
            {Number(props.Transparent) * 10}% de transparence{' '}
            {Number(props.Transparent) === 9 ? '!' : ''}
          </Text>
        </View>
      </View>

      {/* Modal */}
      <Modal
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeButton}>
            <Ionicons
              name="close-outline"
              size={30}
              color="#2196F3"
            />
          </TouchableOpacity>
          
          <View style={styles.imageWrapper}>
            {imageLoading && (
              <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
            )}
            <Image
              source={props.ImageSrc ? { uri: props.ImageSrc } : productDeffaultImg}
              style={[styles.modalImage, imageLoading ? styles.hiddenImage : null]}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 96,
    maxHeight: 120,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'center',
  },
  productInfo: {
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  productName: {
    fontSize: 20,
    color: '#0f548d',
    fontFamily:'ArchivoBold',
    maxWidth:"95%"
  },
  productBrand: {
    fontSize: 14,
    color: '#42a29a',
    fontFamily:'ArchivoBold',
    maxWidth:"95%"
  },
  productTransparency: {
    fontSize: 14,
    color: '#42a29a',
    fontFamily:'ArchivoBold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 50,
  },
  imageWrapper: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  hiddenImage: {
    opacity: 0,
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
  },
});

export default GlobalInfo;