import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.warn('Permission not granted to get push token!');
      return null;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      console.warn('Project ID not found');
      return null;
    }
    try {
      const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      return token;
    } catch (e) {
      console.warn(`Error getting token: ${e}`);
      return null;
    }
  } else {
    console.warn('Must use physical device for push notifications');
    return null;
  }
}

export default function RegisterPushToken() {
  useEffect(() => {
    async function saveTokenOnce() {
      const token = await registerForPushNotificationsAsync();
      if (!token) return;

      // Lire le token stocké en local
      const storedToken = await AsyncStorage.getItem('pushToken');
      console.log("🚀 ~ saveTokenOnce ~ storedToken:", storedToken)

      if (storedToken !== token) {
        // Token nouveau ou absent → envoyer au serveur
        try {
          const res = await fetch('https://tico.foodhea.com/api/save-push-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
          const data = await res.json();
          console.log('Push token envoyé au serveur', data);

          // Stocker localement le token envoyé
          await AsyncStorage.setItem('pushToken', token);
        } catch (err) {
          console.warn('Erreur envoi token', err);
        }
      } else {
        console.log('Token déjà envoyé, pas de nouvel envoi.');
      }
    }

    saveTokenOnce();
  }, []);

  return null;
}
