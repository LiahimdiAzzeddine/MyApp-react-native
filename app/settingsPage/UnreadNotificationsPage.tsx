import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  StatusBar,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect, useRouter } from 'expo-router';
import { Bell, Wifi, WifiOff, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Clock, ArrowRight } from 'lucide-react-native';
import Animated, {
  FadeInUp,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useUnreadNotifications, { Notification } from '@/hooks/useUnreadNotifications';
import { Colors } from '@/constants/Colors';
const colors =Colors.page;

export default function NotificationsPage() {
  const router = useRouter();
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const getPushToken = async () => {
      try {
        const pushTokenKey = process.env.EXPO_PUBLIC_PUSH_TOKEN_KEY ?? 'pushToken';
        const storedToken = await AsyncStorage.getItem(pushTokenKey);
        if (storedToken) setPushToken(storedToken);
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
    };
    getPushToken();
  }, []);

  const { notifications,notificationsUnread, loading, error, refetch,markAsOpened } = useUnreadNotifications(pushToken ?? '');

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);
  

  const handleNotificationPress = (notification: Notification) => {
    const data = notification.data;
    const openDirectly = data.openDirectly ?? false;

    try {
        markAsOpened(notification.id);

      if (openDirectly) {
        if (data.pageDeeplink) {
          router.push(data.pageDeeplink as any);
        } else {
          Alert.alert('Notification', 'Impossible de rediriger, lien manquant.');
        }
      } else {
        router.push({
          pathname: '/notification-details' as any,
          params: {
            pageTitre: data.pageTitre ?? '',
            pageParagraphe: data.pageParagraphe ?? '',
            pageDeeplink: data.pageDeeplink ?? '',
          },
        });
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ouvrir cette notification.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
    
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const EmptyState = ({ icon: Icon, title, subtitle, actionText, onAction }: {
    icon: any;
    title: string;
    subtitle: string;
    actionText?: string;
    onAction?: () => void;
  }) => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Icon size={48} color={colors.text.tertiary} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
      {actionText && onAction && (
        <Pressable style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionButtonText}>{actionText}</Text>
        </Pressable>
      )}
    </Animated.View>
  );

  const NotificationCard = ({ notification, index }: { notification: Notification; index: number }) => {
    const scaleValue = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scaleValue.value }],
    }));

    const handlePressIn = () => {
      scaleValue.value = withSpring(0.98);
    };

    const handlePressOut = () => {
      scaleValue.value = withSpring(1);
    };

    return (
      <Animated.View entering={FadeInUp.delay(index * 100).duration(500)}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => handleNotificationPress(notification)}
          style={[styles.notificationCard, animatedStyle]}
        >
          <View style={styles.notificationHeader}>
            <View style={styles.notificationIcon}>
              <Bell size={20} color={colors.primary} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle} numberOfLines={2}>
                {notification.title}
              </Text>
              <Text style={styles.notificationMessage} numberOfLines={3}>
                {notification.message}
              </Text>
            </View>
            <View style={styles.notificationMeta}>
              <ArrowRight size={16} color={colors.text.tertiary} />
            </View>
          </View>
          <View style={styles.notificationFooter}>
            <View style={styles.timeContainer}>
              <Clock size={12} color={colors.text.tertiary} />
              <Text style={styles.notificationDate}>
                {formatDate(notification.created_at)}
              </Text>
            </View>
            {!notification.read && <View style={styles.unreadIndicator} />}
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <EmptyState
          icon={WifiOff}
          title="Connexion perdue"
          subtitle="Vérifiez votre connexion internet et réessayez"
          actionText="Réessayer"
          onAction={onRefresh}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <EmptyState
          icon={AlertCircle}
          title="Erreur de chargement"
          subtitle={error}
          actionText="Réessayer"
          onAction={onRefresh}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Bell size={24} color={colors.primary} />
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{notificationsUnread.length}</Text>
          </View>
        </View>
        <View style={styles.connectionStatus}>
          {isConnected ? (
            <View style={styles.onlineIndicator}>
              <Wifi size={14} color={colors.success} />
              <Text style={styles.onlineText}>En ligne</Text>
            </View>
          ) : (
            <View style={styles.offlineIndicator}>
              <WifiOff size={14} color={colors.warning} />
              <Text style={styles.offlineText}>Hors ligne</Text>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading && !refreshing ? (
          <EmptyState
            icon={Clock}
            title="Chargement..."
            subtitle="Récupération de vos notifications"
          />
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={CheckCircle}
            title="Tout est lu !"
            subtitle="Vous n'avez aucune notification non lue"
            actionText="Actualiser"
            onAction={onRefresh}
          />
        ) : (
          notifications.map((notification, index) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              index={index}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  headerBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerBadgeText: {
    color: colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
  },
  connectionStatus: {
    alignSelf: 'flex-start',
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${colors.success}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
  },
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${colors.warning}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offlineText: {
    fontSize: 12,
    color: colors.warning,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.text.tertiary}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  actionButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
  notificationCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
    lineHeight: 20,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  notificationMeta: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: colors.text.tertiary,
    fontWeight: '500',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});