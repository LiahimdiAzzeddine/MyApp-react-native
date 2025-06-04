import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { getFirstVisit } from '@/utils/storage';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
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
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#fff' // ou votre couleur de thème
    }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}