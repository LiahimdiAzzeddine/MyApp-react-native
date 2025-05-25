import { StyleSheet, Text } from "react-native";
import {  TouchableOpacity,View } from "react-native";
import Modal from 'react-native-modal';

// Composant WhiteModal équivalent
export const WhiteModal = ({ 
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
  
const styles=StyleSheet.create({
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
    top: 0,
    right: 10,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
})