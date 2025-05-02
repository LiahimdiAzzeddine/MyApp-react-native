import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView,Share } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

// TypeScript interfaces
interface Category {
  name?: string;
  image?: string;
}

interface TipProps {
  tip: {
    id: string;
    title: string;
    image?: string;
    details: string;
    category?: Category;
  };
}

const apiUrl = Constants.expoConfig?.extra?.BACKEND_URL || '';

const TipDetails: React.FC<TipProps> = ({ tip }) => {
  const { id, title, details } = tip;

  // Méthode de partage avec deep link
  const shareTip = async () => {
    try {
      // Construisez votre deep link
      const deepLink = `${apiUrl}/tico/tip/${id}`;

      await Share.share({
        title: title,
        message: `Découvre ce conseil : ${title}\n${deepLink}`,
        url: deepLink, // Le deep link sera utilisé comme URL
      });
    } catch (error) {
      console.error('Erreur lors du partage', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Contenu principal */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContent}>
          {/* Section Titre et Image */}
          <View style={styles.headerSection}>
            <View style={styles.imageContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: tip?.category?.image }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Section Détails */}
          <View style={styles.detailsSection}>
            <Text style={styles.categoryTitle}>
              {tip?.category?.name || "Notre ti'conseil"}
            </Text>
            {/* Utilisation de WebView pour afficher le contenu HTML */}
            <WebView
              originWhitelist={['*']}
              source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body { font-family: Arial, sans-serif; color: #0F548D; line-height: 1.5; padding: 0; margin: 0; }</style></head><body>${details}</body></html>` }}
              style={styles.webView}
              scrollEnabled={false}
              onNavigationStateChange={(event) => {
                if (event.url !== 'about:blank') {
                  // Gérer les liens externes si nécessaire
                }
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Section Bouton */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          onPress={shareTip}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>Partager autour de moi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 32,
  },
  headerSection: {
    backgroundColor: '#FF9F1C', // custom-orange
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    width: '100%',
    minHeight: '35%',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 240,
    gap: 4,
  },
  title: {
    minHeight: 56,
    textAlign: 'center',
    color: '#0F548D', // custom-blue
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 8,
    fontFamily: 'System', // Vous devrez importer votre police personnalisée
  },
  imageWrapper: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20,
  },
  categoryImage: {
    width: '43%',
    height: 150,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF6B35', // custom-text-orange
  },
  detailsSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  categoryTitle: {
    color: '#FF6B35', // custom-text-orange
    fontSize: 20,
    fontWeight: '900',
    paddingBottom: 12,
    fontFamily: 'System', // Remplacer par ArchivoExtraBold
  },
  webView: {
    width: '100%',
    height: 300, // Hauteur fixe ou dynamique selon vos besoins
    backgroundColor: 'transparent',
  },
  buttonSection: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  shareButton: {
    backgroundColor: '#FF6B35', // custom-text-orange
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'System', // Remplacer par ArchivoBold
  },
});

export default TipDetails;