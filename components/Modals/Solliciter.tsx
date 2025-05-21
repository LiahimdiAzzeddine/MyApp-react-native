// screens/Solliciter.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import CustomModal from './Modal';

const Solliciter = ({isOpen,
  setIsOpen,
  authUser,
  gtin,
  productName}:any) => {
  const [hasRequested, setHasRequested] = useState(false);

  const handleRequest = async () => {
    // simulate async request
    setTimeout(() => {
      setHasRequested(true);
    }, 1000);
  };

  return (
        <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <View style={styles.modalContent}>
        <Image
          source={require('@/assets/images/popup/BubbleIImage.png')}
          style={{ width: 60, height: 60 }}
        />
        {!hasRequested ? (
          <>
            <Text style={styles.description}>
              Les informations dans les applications ne sont pas toujours fiables...
            </Text>
            <TouchableOpacity onPress={handleRequest} style={styles.button}>
              <Text style={styles.buttonText}>Encourager la marque</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.success}>Demande effectuée</Text>
            <TouchableOpacity onPress={() => Linking.openURL('app://mesDemandes')}>
              <Text style={styles.link}>Suivre l’état de mes demandes</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    gap: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#1959A5',
  },
  button: {
    backgroundColor: '#1959A5',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  success: {
    fontWeight: 'bold',
    color: '#1959A5',
  },
  link: {
    color: '#1959A5',
    textDecorationLine: 'underline',
  },
});

export default Solliciter;
