import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { getFirstVisit } from '@/utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';

export default function IndexPage() {
  const router = useRouter();
  const segments = useSegments();

useEffect(() => {
  const checkAndRedirect = async () => {
    try {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl) {
        const { path, queryParams } = Linking.parse(initialUrl);

        if (path && path !== '/') {
          setTimeout(() => {
            router.replace({
              pathname: `/${path}` as any,
              params: queryParams as any,
            });
          }, 100);
          return;
        }
      }

      const hasLaunched = await getFirstVisit();
      const isFirstLaunch = hasLaunched === null;

      if (isFirstLaunch) {
        setTimeout(() => {
          router.replace('/welcomeSlider');
        }, 100);
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error("❌ Erreur lors de la vérification:", error);
      router.replace('/(tabs)');
    }
  };

  checkAndRedirect();
}, []);


  // Afficher un loader pendant la vérification
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#fff'
    }} edges={['bottom', 'left', 'right','top']}>
      <ActivityIndicator size="large" color="#007AFF" />
    </SafeAreaView>
  );
}