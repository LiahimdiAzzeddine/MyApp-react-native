// components/PersonalInfo.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet, Modal, Pressable } from 'react-native';
import useGetProfile from '@/hooks/auth/useGetProfile';
import useDeleteAccount from '@/hooks/auth/useDeleteAccount';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const PersonalInfo = () => {
  const router = useRouter();
  const { profile, loading: profileLoading, error: profileError } = useGetProfile();
  const { deleteAccount, loading: deleteLoading } = useDeleteAccount();

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [cachedProfile, setCachedProfile] = useState<any>(null);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const syncProfile = async () => {
      if (profile && isOnline) {
        await AsyncStorage.setItem('cachedProfile', JSON.stringify(profile));
      }

      if (!isOnline) {
        const cached = await AsyncStorage.getItem('cachedProfile');
        if (cached) {
          setCachedProfile(JSON.parse(cached));
        }
      }
    };

    syncProfile();
  }, [profile, isOnline]);

  const displayProfile = isOnline ? profile : cachedProfile;

  const handleDeleteAccount = async () => {
    setShowModalDelete(false);
    const result = await deleteAccount();
    if (result.success) {
      Alert.alert('Succès', result.message);
      router.replace('/login');
    } else {
      Alert.alert('Erreur', result.message);
    }
  };

  if (profileLoading && isOnline) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (profileError && !cachedProfile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Une erreur est survenue lors du chargement du profil. {isOnline ? profileError : 'Vérifiez votre connexion internet.'}
        </Text>
      </View>
    );
  }

  if (!displayProfile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>
          Aucune information disponible. Connectez-vous à Internet pour charger votre profil.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            Vous êtes hors ligne. Les informations affichées proviennent du cache.
          </Text>
        </View>
      )}

      <Text style={styles.title}>Mes informations</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mon adresse email</Text>
        <Text style={styles.infoText}>{displayProfile.email || "Pas d'email disponible"}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mon pseudo</Text>
        <Text style={styles.infoText}>{displayProfile.username || "Pas de pseudo disponible"}</Text>
      </View>

      <Button
        title="Supprimer mon compte"
        onPress={() => setShowModalDelete(true)}
        disabled={!isOnline || deleteLoading}
      />

      <Modal
        visible={showModalDelete}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModalDelete(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Supprimer le compte</Text>
            <Text style={{ marginVertical: 10 }}>
              Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
            </Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowModalDelete(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Annuler</Text>
              </Pressable>
              <Pressable onPress={handleDeleteAccount} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Supprimer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineBanner: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    marginBottom: 10,
  },
  offlineText: {
    color: '#856404',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#007AFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    color: '#FF9500',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  infoText: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 10,
    borderColor: '#FF9500',
    borderWidth: 1,
    color: '#007AFF',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  cancelBtn: {
    marginRight: 10,
  },
  deleteBtn: {},
  cancelText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default PersonalInfo;
