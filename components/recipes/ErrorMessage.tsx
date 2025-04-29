import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'; // Utilisation d'Icon ou d'autres solutions pour les icônes

interface ErrorMessageProps {
  message: string;
  icon: string; // Utilisez l'icône en tant que chaîne de caractères (par exemple, depuis Ionicons ou d'autres bibliothèques)
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, icon, onClose }) => (
  <View style={styles.container}>
    {/* Affichage de l'icône (peut nécessiter l'utilisation d'une bibliothèque comme Ionicons ou React Native Vector Icons) */}
    <Ionicons name={icon} size={64} color="red" />
    
    <Text style={styles.title}>Erreur</Text>
    <Text style={styles.message}>{message}</Text>
    
    <TouchableOpacity onPress={onClose} style={styles.button}>
      <Text style={styles.buttonText}>Fermer</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optionnel, pour un fond légèrement transparent
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D1',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ErrorMessage;
