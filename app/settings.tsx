import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { AuthContext } from '@/context/AuthContext';

export default function SettingsPage() {
  const { userInfo, logout } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;
  const router = useRouter();

  const triggerHaptic = async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // Haptics not supported
      }
    }
  };

  const handlePress = (action: () => void) => {
    triggerHaptic();
    action();
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Mon compte</Text>

        {isAuthenticated ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(() => {
              // setShowModalInfo(true);
            })}
          >
            <Text style={styles.buttonText}>Mes informations</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(() => {
             // router.push('/register'); // Change selon ton routing
            })}
          >
            <Text style={styles.buttonText}>Je crée mon compte</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(() => {
            // setShowModalContact(true);
          })}
        >
          <Text style={styles.buttonText}>Nous contacter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(() => {
            // setShowModalFAQ(true);
          })}
        >
          <Text style={styles.buttonText}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(() => {
            // setShowModalInviteTico(true);
          })}
        >
          <Text style={styles.buttonText}>Faire connaître TiCO</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.authSection]}>
        {isAuthenticated ? (
          <TouchableOpacity
            style={styles.buttonLogout}
            onPressIn={() => handlePress(() => logout())}
          >
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonLogin}
            onPressIn={() => router.push('/login')}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => handlePress(() => {
            // setShowModalCGU(true);
          })}
        >
          <Text style={styles.link}>CGU - Confidentialité</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFECA7',
    flexGrow: 1,
    justifyContent: 'flex-start', // Aligner vers le haut
  },
  section: {
    alignItems: 'center',
    marginBottom: 20, // Réduit l'espace entre les sections
  },
  authSection: {
    marginTop: 10, // Réduit l'espace entre les sections
  },
  title: {
    fontSize: 24,
    color: '#007AFF',
    marginBottom: 12, // Espacement plus compact
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF9500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 6, // Réduit l'espace vertical entre les boutons
    width: '80%',
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#FF3B30', // Couleur rouge pour "Déconnexion"
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 6,
    width: '80%',
    alignItems: 'center',
  },
  buttonLogin: {
    backgroundColor: '#34C759', // Couleur verte pour "Se connecter"
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 6,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  link: {
    color: '#FF9500',
    textDecorationLine: 'underline',
    marginTop: 12, // Espacement réduit pour le lien
  },
});