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
        // Vérifier s'il y a une URL initiale (Universal Link)
        const initialUrl = await Linking.getInitialURL();
        
        if (initialUrl) {
          console.log("🔗 Universal Link détecté:", initialUrl);
          
          // Parser l'URL pour extraire le chemin
          const url = Linking.parse(initialUrl);
          const path = url.path;
          
          if (path && path !== '/') {
            console.log("📍 Redirection vers le chemin:", path);
            // Rediriger vers le chemin spécifique
            setTimeout(() => {
              router.replace(path as any);
            }, 100);
            return; // Sortir de la fonction pour éviter la redirection normale
          }
        }

        // Logique normale si pas d'Universal Link
        const hasLaunched = await getFirstVisit();
        const isFirstLaunch = hasLaunched === null;

        if (isFirstLaunch) {
          console.log("🚀 Premier lancement - Redirection vers welcomeSlider");
          setTimeout(() => {
            router.replace('/welcomeSlider');
          }, 100);
        } else {
          console.log("📱 Utilisateur existant - Redirection vers les tabs");
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error("❌ Erreur lors de la vérification:", error);
        // En cas d'erreur, aller vers les tabs par défaut
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