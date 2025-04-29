import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Ionicons,
} from '@expo/vector-icons';

type Network = {
  _label: keyof typeof SOCIAL_ICONS;
  _url: string;
};

type Entity = {
  _reseaux?: Record<string, Network>;
  _url?: string;
  _email?: string;
  _logoUrl?: string;
  _history?: string;
  _historyvideo?: string;
};

const SOCIAL_ICONS = {
  Facebook: 'logo-facebook',
  LinkedIn: 'logo-linkedin',
  Instagram: 'logo-instagram',
  YouTube: 'logo-youtube',
};

const getYoutubeId = (url?: string) =>
  url?.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([^"&?\/\s]{11})/)?.[1] || null;

const SocialLinks = React.memo(({ networks }: { networks: Network[] }) => {
  if (!networks?.length) {
    return <Text style={styles.noInfo}>Aucun réseau social</Text>;
  }

  return (
    <View style={styles.socialLinks}>
      {networks.map(({ _label, _url }) => (
        <TouchableOpacity key={_label || _url} onPress={() => Linking.openURL(_url)}>
          <Ionicons
            name={(SOCIAL_ICONS[_label] || 'chatbubble-ellipses-outline') as any}
            size={32}
            color="#2c6b66"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
});

const ReadMoreText = React.memo(({ text, maxLength = 150 }: { text?: string; maxLength?: number }) => {
  const [showFullText, setShowFullText] = useState(false);
  if (!text) return <Text style={styles.noInfo}>Aucune information disponible</Text>;

  const toggleText = useCallback(() => setShowFullText((prev) => !prev), []);
  const displayText = showFullText ? text : `${text.slice(0, maxLength)}...`;

  return (
    <Text style={styles.readMoreText}>
      {displayText}{' '}
      {text.length > maxLength && (
        <Text onPress={toggleText} style={styles.readMoreButton}>
          {showFullText ? 'Lire moins' : 'Lire plus'}
        </Text>
      )}
    </Text>
  );
});

const EntitySection = React.memo(({ entity, title }: { entity: Entity; title: string }) => {
  const socialNetworks = useMemo(() => Object.values(entity?._reseaux || {}), [entity]);
  const youtubeId = useMemo(() => getYoutubeId(entity?._historyvideo), [entity]);
  const youtubeData = useMemo(() => {
    return youtubeId
      ? {
          thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
          webUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
        }
      : null;
  }, [youtubeId]);

  const secureLogoUrl = entity?._logoUrl?.replace(/^http:/, 'https:') || null;

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.entityRow}>
        {secureLogoUrl ? (
          <Image source={{ uri: secureLogoUrl }} style={styles.logoImage} resizeMode="contain" />
        ) : (
          <View style={styles.logoFallback}>
            <Text style={styles.noInfo}>Logo non disponible</Text>
          </View>
        )}
        <View style={styles.linksContainer}>
          <SocialLinks networks={socialNetworks} />
          {entity?._url && (
            <Text style={styles.linkText} onPress={() => Linking.openURL(entity._url!)}>
              Site internet
            </Text>
          )}
          {entity?._email && (
            <Text style={styles.linkText} onPress={() => Linking.openURL(`mailto:${entity._email}`)}>
              Contact SAV
            </Text>
          )}
        </View>
      </View>
      <ReadMoreText text={entity?._history} />
      {youtubeData && (
        <TouchableOpacity onPress={() => Linking.openURL(youtubeData.webUrl)}>
          <Image source={{ uri: youtubeData.thumbnail }} style={styles.videoThumbnail} />
        </TouchableOpacity>
      )}
    </View>
  );
});

const BrandInfo = ({ togglePanel, markInfo, provider }: {
  togglePanel: (panelNumber: number) => void;
  markInfo?: Entity;
  provider?: Entity;
}) => {
  return (
    <ScrollView style={styles.container}>
      {markInfo && <EntitySection entity={markInfo} title="La marque" />}
      {provider && <EntitySection entity={provider} title="L'entreprise" />}
      <TouchableOpacity onPress={() => togglePanel(6)} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Fermer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BrandInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f4f2',
    padding: 16,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c6b66',
    marginBottom: 12,
  },
  entityRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  logoImage: {
    width: '40%',
    height: 80,
    borderRadius: 8,
  },
  logoFallback: {
    width: '40%',
    height: 80,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  noInfo: {
    fontSize: 12,
    color: '#888',
  },
  linksContainer: {
    flex: 1,
    gap: 8,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 6,
  },
  linkText: {
    fontSize: 12,
    color: '#2c6b66',
    textDecorationLine: 'underline',
  },
  readMoreText: {
    fontSize: 14,
    color: '#2c6b66',
  },
  readMoreButton: {
    fontWeight: 'bold',
    color: '#2c6b66',
    textDecorationLine: 'underline',
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
    marginTop: 12,
    borderRadius: 10,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  toggleButtonText: {
    color: '#2c6b66',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
