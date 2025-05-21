import { View, TouchableOpacity, StyleSheet, Image, ImageStyle, Dimensions, ImageSourcePropType, Alert } from 'react-native';
import React, { useContext, memo, useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// Types bien définis
interface TabBarProps {
  state: {
    routes: Array<{
      key: string;
      name: RouteName;
    }>;
    index: number;
  };
  descriptors: any;
}

type RouteName = 'home' | 'helpTico' | 'index' | 'recipes' | 'tips';
const visibleRoutes = ["home", "helpTico", "index", "recipes", "tips"];

// Constantes extraites en dehors du composant
const routePaths = {
  home: '/home',
  helpTico: '/helpTico',
  recipes: '/recipes',
  tips: '/tips',
  index: '/',
} as const;


const getRoutePath = (routeName: RouteName) => {
  return routePaths[routeName];
};
// Préchargement des images en dehors du composant
const IMAGE_SOURCES: Record<RouteName, { active: ImageSourcePropType; inactive: ImageSourcePropType }> = {
  home: {
    active: require('@/assets/icons/accueil_active.png'),
    inactive: require('@/assets/icons/accueil_inactive.png'),
  },
  helpTico: {
    active: require('@/assets/icons/help.png'),
    inactive: require('@/assets/icons/help.png'),
  },
  index: {
    active: require('@/assets/icons/scanner.png'),
    inactive: require('@/assets/icons/scanner.png'),
  },
  recipes: {
    active: require('@/assets/icons/recipes_active.png'),
    inactive: require('@/assets/icons/recipes_inactive.png'),
  },
  tips: {
    active: require('@/assets/icons/tips.png'),
    inactive: require('@/assets/icons/tips_inactive.png'),
  },
};

// Composant d'élément de tab extrait et mémorisé
interface TabBarItemProps {
  route: {
    key: string;
    name: RouteName;
  };
  isFocused: boolean;
  isAuthenticated: boolean;
  iconStyle: ImageStyle;
  standardSize: number;
  onPress: () => void;
}

const TabBarItem = memo(({ route, isFocused, isAuthenticated, iconStyle, onPress }: TabBarItemProps) => {
  const routeName = route.name;
  const shouldBlockAccess = !isAuthenticated && routeName !== 'index';
  
  const imageSource = useMemo(() => {
    if (routeName in IMAGE_SOURCES) {
      return !shouldBlockAccess
        ? IMAGE_SOURCES[routeName].active
        : IMAGE_SOURCES[routeName].inactive;
    }
    return IMAGE_SOURCES.home.active;
  }, [routeName, shouldBlockAccess]);

  return (
    <TouchableOpacity
      key={route.key}
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      style={styles.tabBarItem}
    >
      <Image source={imageSource} style={iconStyle} resizeMode="contain" />
    </TouchableOpacity>
  );
});

// Composant principal optimisé
const TabBar = ({ state }: BottomTabBarProps) => {
  const screenWidth = Dimensions.get('window').width;
  const standardSize = screenWidth * 0.15;
  const insets = useSafeAreaInsets();
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;
  const router = useRouter();

  // Mémoisation des tailles d'icônes
  const iconSizes = useMemo<Record<RouteName, ImageStyle>>(() => ({
    home: { width: standardSize, height: standardSize, maxWidth: 63, maxHeight: 63 },
    helpTico: { width: standardSize, height: standardSize, maxWidth: 63, maxHeight: 63 },
    recipes: { width: standardSize, height: standardSize, maxWidth: 63, maxHeight: 63 },
    tips: { width: standardSize, height: standardSize, maxWidth: 63, maxHeight: 63 },
    index: { width: standardSize * 1.7, height: standardSize, maxWidth: 108, maxHeight: 108 },
  }), [standardSize]);

  const showLoginAlert = useCallback(() => {
    Alert.alert(
      'Connexion requise',
      'Vous devez être connecté pour accéder à cette section.',
      [
        {
          text: 'Se connecter',
          onPress: () => router.push('/login'),
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  }, [router]);

  const getIconStyle = useCallback((routeName: RouteName) => {
    return iconSizes[routeName] || { width: standardSize, height: standardSize };
  }, [iconSizes, standardSize]);

  const handleTabPress = useCallback((routeName: RouteName, shouldBlockAccess: boolean) => {
    if (shouldBlockAccess) {
      showLoginAlert();
    } else {
      router.push(getRoutePath(routeName));
    }
  }, [router, showLoginAlert]);

  const containerStyle = useMemo(() => [
    styles.tabBar, 
    { paddingBottom: insets.bottom ? insets.bottom : 10 }
  ], [insets.bottom]);

  return (
    <View style={[containerStyle,{display:(state.index==4 || state.index==3)?'none':"flex"}]}>
      {state.routes.filter((route) => visibleRoutes.includes(route.name)).map((route, index) => {
        const routeName = route.name as RouteName;
        const isFocused = state.index === index;
        const shouldBlockAccess = !isAuthenticated && routeName !== 'index' && routeName !== 'helpTico';
        const iconStyle = getIconStyle(routeName);

        return (
          <TabBarItem
            key={route.key}
            route={route as { key: string; name: RouteName }}
            isFocused={isFocused}
            isAuthenticated={isAuthenticated}
            iconStyle={iconStyle}
            standardSize={standardSize}
            onPress={() => handleTabPress(routeName, shouldBlockAccess)}
          />
        );
      })}
    </View>
  );
};

// Styles externalisés
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 9,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
});

export default memo(TabBar);