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
      console.log("🚀 ~ useEffect ~ setImageLoading:")
      setTimeout(() => {
        if (isOpen) {
        setImageLoading(false);
        }
      }, 1000);
  }, [isOpen]);




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

      <Modal
  visible={isOpen}
  onRequestClose={() => setIsOpen(false)}
  animationType="fade"
  transparent={true}
        key={props.Name}

>
  <View style={styles.modalContainer}>
    
    <View style={styles.imageWrapper}>
      {imageLoading && (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      )}
      <Image
      key={props.Name}
        source={props.ImageSrc ? { uri: props.ImageSrc } : productDeffaultImg}
        style={[styles.modalImage, imageLoading ? styles.hiddenImage : null]}
        
      />
    </View>

    {/* Bouton de fermeture plus visible et en bas */}
   <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.floatingCloseButton}>
  <Image
    source={require('@/assets/images/popup/close.png')}
    style={styles.closeIconImage}
    resizeMode='contain'
  />
</TouchableOpacity>

    
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
},
floatingCloseButton: {
  position: 'absolute',
  bottom: 40,
  alignSelf: 'center',
  padding: 12,
  elevation: 5,
},

closeIconImage: {
  width: 50,
  height: 50,
},

imageWrapper: {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
},

modalImage: {
  width: 300,
  height: 300,
  resizeMode: 'contain',
},

hiddenImage: {
  display: 'none',
},



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
  
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 50,
  },

  loader: {
    position: 'absolute',
    zIndex: 10,
  },
});

export default GlobalInfo;